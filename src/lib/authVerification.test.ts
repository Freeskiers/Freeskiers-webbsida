import { describe, it, expect, beforeEach } from 'vitest';
import {
  createAndSendVerificationCode,
  verifySubmittedCode,
  verificationStore
} from './authVerification';

describe('Passwordless Email Verification (OTP)', () => {
  beforeEach(() => {
    verificationStore.clear();
  });

  it('generates a 6-digit code for a valid email', async () => {
    const res = await createAndSendVerificationCode('stefan@lidingofreeskiers.se', 'admin');
    expect(res.success).toBe(true);
    expect(res.emailSent).toBe(true);
    expect(res.token).toBeDefined();

    const stored = verificationStore.get('stefan@lidingofreeskiers.se');
    expect(stored).toBeDefined();
    expect(stored?.code).toMatch(/^\d{6}$/);
  });

  it('verifies successfully with the correct code', async () => {
    await createAndSendVerificationCode('klara.tengstrand@gmail.com', 'admin');
    const stored = verificationStore.get('klara.tengstrand@gmail.com');
    const code = stored!.code;

    const verifyRes = await verifySubmittedCode('klara.tengstrand@gmail.com', code);
    expect(verifyRes.success).toBe(true);
    expect(verifyRes.verifiedEmail).toBe('klara.tengstrand@gmail.com');

    // Code is single-use and consumed in store
    expect(verificationStore.has('klara.tengstrand@gmail.com')).toBe(false);
  });

  it('verifies statelessly using cryptographic HMAC token even across worker restarts', async () => {
    const res = await createAndSendVerificationCode('stefan.aaroe@me.com', 'admin');
    const stored = verificationStore.get('stefan.aaroe@me.com');
    const code = stored!.code;
    const token = res.token;

    // Simulate switching Cloudflare worker isolates / zero shared memory
    verificationStore.clear();
    expect(verificationStore.has('stefan.aaroe@me.com')).toBe(false);

    // Stateless verification succeeds with the HMAC token
    const verifyRes = await verifySubmittedCode('stefan.aaroe@me.com', code, token);
    expect(verifyRes.success).toBe(true);
    expect(verifyRes.verifiedEmail).toBe('stefan.aaroe@me.com');
  });

  it('normalizes email and ignores spaces in code', async () => {
    await createAndSendVerificationCode('  Stefan.Aaroe@Me.Com  ', 'admin');
    const stored = verificationStore.get('stefan.aaroe@me.com');
    const code = stored!.code;

    // Code entered with space e.g. "123 456"
    const spacedCode = `${code.slice(0, 3)} ${code.slice(3)}`;
    const verifyRes = await verifySubmittedCode('stefan.aaroe@me.com', spacedCode);
    expect(verifyRes.success).toBe(true);
  });

  it('rejects incorrect code and counts attempts', async () => {
    await createAndSendVerificationCode('test@example.com', 'medlem');

    const verifyRes = await verifySubmittedCode('test@example.com', '000000');
    expect(verifyRes.success).toBe(false);
    expect(verifyRes.error).toContain('Felaktig kod');

    const stored = verificationStore.get('test@example.com');
    expect(stored?.attempts).toBe(1);
  });

  it('locks out after 5 invalid attempts in memory store', async () => {
    await createAndSendVerificationCode('test@example.com', 'medlem');

    for (let i = 0; i < 4; i++) {
      await verifySubmittedCode('test@example.com', '000000');
    }

    const fifth = await verifySubmittedCode('test@example.com', '000000');
    expect(fifth.success).toBe(false);

    // Sixth attempt triggers security lockout
    const sixth = await verifySubmittedCode('test@example.com', '000000');
    expect(sixth.success).toBe(false);
    expect(sixth.error).toContain('För många felaktiga försök');

    // Seventh attempt: store was cleared
    const seventh = await verifySubmittedCode('test@example.com', '000000');
    expect(seventh.success).toBe(false);
    expect(seventh.error).toContain('Ingen aktiv verifieringskod');
  });

  it('rejects expired code', async () => {
    await createAndSendVerificationCode('expired@example.com', 'admin');
    const entry = verificationStore.get('expired@example.com')!;
    entry.expiresAt = Date.now() - 1000; // expired in past

    const res = await verifySubmittedCode('expired@example.com', entry.code);
    expect(res.success).toBe(false);
    expect(res.error).toContain('gått ut');
  });
});
