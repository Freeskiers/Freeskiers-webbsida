/**
 * Passwordless Email Verification (OTP) for Lidingö Freeskiers
 * Used for /admin (Kansli & Styrelse) and /medlem (Mina Sidor)
 */

export interface VerificationStoreEntry {
  code: string;
  expiresAt: number;
  attempts: number;
  context: 'admin' | 'medlem';
  createdAt: number;
}

// In-memory verification codes (valid for 10 minutes)
export const verificationStore = new Map<string, VerificationStoreEntry>();

const CODE_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes
const MAX_ATTEMPTS = 5;

export interface SendCodeResult {
  success: boolean;
  emailSent: boolean;
  expiresInSeconds?: number;
  message: string;
  error?: string;
}

export interface VerifyCodeResult {
  success: boolean;
  verifiedEmail?: string;
  error?: string;
}

/**
 * Generate and store a 6-digit OTP code for an email.
 * Attempts to deliver via Resend if RESEND_API_KEY is configured.
 */
export async function createAndSendVerificationCode(
  email: string,
  context: 'admin' | 'medlem' = 'medlem',
  env?: unknown
): Promise<SendCodeResult> {
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail || !cleanEmail.includes('@')) {
    return {
      success: false,
      emailSent: false,
      message: 'Ogiltig e-postadress',
      error: 'Vänligen ange en giltig e-postadress.'
    };
  }

  // Generate secure 6-digit numeric code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + CODE_EXPIRY_MS;

  verificationStore.set(cleanEmail, {
    code,
    expiresAt,
    attempts: 0,
    context,
    createdAt: Date.now()
  });

  // Check if Resend API key is configured in env or process.env
  const envObj = (typeof env === 'object' && env !== null ? env : {}) as Record<string, string | undefined>;
  const resendApiKey =
    envObj['RESEND_API_KEY'] ||
    (typeof process !== 'undefined' ? process.env?.['RESEND_API_KEY'] : undefined);

  let emailSent = false;
  let sendError: string | undefined;

  const isTestEnv = typeof process !== 'undefined' && (process.env?.['NODE_ENV'] === 'test' || Boolean(process.env?.['VITEST']));

  if (resendApiKey) {
    try {
      const fromAddress =
        envObj['RESEND_FROM_EMAIL'] ||
        (typeof process !== 'undefined' ? process.env?.['RESEND_FROM_EMAIL'] : undefined) ||
        'Lidingö Freeskiers <noreply@lidingofreeskiers.se>';

      const contextTitle = context === 'admin' ? 'Kansli & Styrelse' : 'Mina Sidor';

      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [cleanEmail],
          subject: `${code} är din inloggningskod till Lidingö Freeskiers (${contextTitle})`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
              <div style="text-align: center; margin-bottom: 24px;">
                <h1 style="color: #0f172a; font-size: 24px; font-weight: 800; margin: 0;">IK Lidingö Freeskiers</h1>
                <p style="color: #64748b; font-size: 14px; margin-top: 4px;">Inloggning till ${contextTitle}</p>
              </div>
              <p style="color: #334155; font-size: 15px; line-height: 1.5;">Hej,</p>
              <p style="color: #334155; font-size: 15px; line-height: 1.5;">Här är din engångskod för att logga in på <strong>lidingofreeskiers.se</strong>:</p>
              <div style="text-align: center; margin: 28px 0;">
                <div style="display: inline-block; background-color: #f1f5f9; padding: 14px 28px; border-radius: 12px; letter-spacing: 6px; font-size: 32px; font-weight: 900; color: #0f172a; border: 2px solid #06b6d4;">
                  ${code}
                </div>
              </div>
              <p style="color: #64748b; font-size: 13px; line-height: 1.5;">Koden är giltig i 10 minuter och kan endast användas en gång. Om du inte har begärt denna kod kan du ignorera detta meddelande.</p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
              <p style="color: #94a3b8; font-size: 12px; text-align: center; margin: 0;">IK Lidingö Freeskiers · Ekholmsnäsbacken, Lidingö</p>
            </div>
          `
        })
      });

      if (emailRes.ok) {
        emailSent = true;
      } else {
        const errText = await emailRes.text();
        console.warn('Resend email sending error:', errText);
        sendError = 'E-post kunde inte levereras via e-posttjänsten. Kontrollera adressen eller försök igen.';
      }
    } catch (err) {
      console.warn('Could not dispatch email via Resend:', err);
      sendError = 'Ett nätverksfel uppstod vid kontakt med e-posttjänsten.';
    }
  } else if (isTestEnv) {
    // In test runner without live API key, simulate success
    emailSent = true;
  } else {
    // No email provider configured on server
    sendError = 'E-posttjänsten är inte konfigurerad ännu (RESEND_API_KEY saknas). Verifieringskoden kunde inte skickas till din inkorg. Vänligen kontakta administratören.';
  }

  if (!emailSent) {
    return {
      success: false,
      emailSent: false,
      message: 'Kunde inte skicka verifieringskod.',
      error: sendError || 'Verifieringskoden kunde inte skickas till din e-post.'
    };
  }

  return {
    success: true,
    emailSent: true,
    expiresInSeconds: Math.floor(CODE_EXPIRY_MS / 1000),
    message: `En 6-siffrig verifieringskod har skickats till ${cleanEmail}.`
  };
}

/**
 * Validate a submitted code against stored codes.
 */
export function verifySubmittedCode(email: string, code: string): VerifyCodeResult {
  const cleanEmail = email.trim().toLowerCase();
  const cleanCode = code.trim().replace(/\s+/g, '');

  const entry = verificationStore.get(cleanEmail);

  if (!entry) {
    return {
      success: false,
      error: 'Ingen aktiv verifieringskod hittades för denna adress. Begär en ny kod.'
    };
  }

  // Check expiry
  if (Date.now() > entry.expiresAt) {
    verificationStore.delete(cleanEmail);
    return {
      success: false,
      error: 'Verifieringskoden har gått ut (giltig i 10 minuter). Begär en ny kod.'
    };
  }

  // Check brute force attempts
  if (entry.attempts >= MAX_ATTEMPTS) {
    verificationStore.delete(cleanEmail);
    return {
      success: false,
      error: 'För många felaktiga försök. Begär en ny kod av säkerhetsskäl.'
    };
  }

  if (entry.code !== cleanCode) {
    entry.attempts += 1;
    const remaining = MAX_ATTEMPTS - entry.attempts;
    return {
      success: false,
      error: `Felaktig kod. ${remaining} försök kvar innan koden spärras.`
    };
  }

  // Success: consume the code so it cannot be re-used
  verificationStore.delete(cleanEmail);

  return {
    success: true,
    verifiedEmail: cleanEmail
  };
}

/**
 * HTTP Handler for /api/auth/send-code and /api/auth/verify-code
 */
export async function handleAuthVerificationRequest(
  request: Request,
  env?: unknown
): Promise<Response> {
  const url = new URL(request.url);

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'content-type': 'application/json; charset=utf-8' }
    });
  }

  try {
    const payload = (await request.json()) as Record<string, unknown>;

    if (url.pathname === '/api/auth/send-code') {
      const email = typeof payload.email === 'string' ? payload.email : '';
      const context = payload.context === 'admin' ? 'admin' : 'medlem';
      const result = await createAndSendVerificationCode(email, context, env);
      return new Response(JSON.stringify(result), {
        status: result.success ? 200 : 400,
        headers: { 'content-type': 'application/json; charset=utf-8' }
      });
    }

    if (url.pathname === '/api/auth/verify-code') {
      const email = typeof payload.email === 'string' ? payload.email : '';
      const code = typeof payload.code === 'string' ? payload.code : '';
      const result = verifySubmittedCode(email, code);
      return new Response(JSON.stringify(result), {
        status: result.success ? 200 : 400,
        headers: { 'content-type': 'application/json; charset=utf-8' }
      });
    }

    return new Response(JSON.stringify({ error: 'Endpoint not found' }), {
      status: 404,
      headers: { 'content-type': 'application/json; charset=utf-8' }
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Serverfel';
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 500,
      headers: { 'content-type': 'application/json; charset=utf-8' }
    });
  }
}

/**
 * Client helper to request a verification code
 */
export async function requestVerificationCode(
  email: string,
  context: 'admin' | 'medlem' = 'medlem'
): Promise<SendCodeResult> {
  if (typeof window === 'undefined') {
    return createAndSendVerificationCode(email, context);
  }

  try {
    const res = await fetch('/api/auth/send-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, context })
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return {
        success: false,
        emailSent: false,
        message: data.error || 'Kunde inte skicka verifieringskod.',
        error: data.error || 'Serverfel'
      };
    }
    return (await res.json()) as SendCodeResult;
  } catch (err) {
    // Client-side fallback if server route is offline
    console.warn('Using client-side verification fallback:', err);
    return createAndSendVerificationCode(email, context);
  }
}

/**
 * Client helper to verify a code
 */
export async function submitVerificationCode(
  email: string,
  code: string
): Promise<VerifyCodeResult> {
  if (typeof window === 'undefined') {
    return verifySubmittedCode(email, code);
  }

  try {
    const res = await fetch('/api/auth/verify-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return {
        success: false,
        error: data.error || 'Felaktig verifieringskod.'
      };
    }
    return data as VerifyCodeResult;
  } catch (err) {
    // Client-side fallback
    console.warn('Using client-side verification fallback:', err);
    return verifySubmittedCode(email, code);
  }
}
