import { createStart, createCsrfMiddleware, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";

const safeSupabaseAuthMiddleware = createMiddleware({ type: "function" }).client(
  async ({ next }) => {
    try {
      const hasSupabaseEnv =
        Boolean(import.meta.env?.["VITE_SUPABASE_URL"]) &&
        Boolean(import.meta.env?.["VITE_SUPABASE_PUBLISHABLE_KEY"]);
      if (!hasSupabaseEnv) {
        return next();
      }
      const { supabase } = await import("@/integrations/supabase/client");
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      return next({
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
    } catch {
      return next();
    }
  },
);

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

// Start installs this automatically when src/start.ts is absent; defining the
// file opts out, so re-add it explicitly to keep server functions protected
// from cross-site requests.
const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

export const startInstance = createStart(() => ({
  functionMiddleware: [safeSupabaseAuthMiddleware],
  requestMiddleware: [errorMiddleware, csrfMiddleware],
}));
