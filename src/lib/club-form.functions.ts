import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const submissionSchema = z.object({
  formName: z.string().trim().min(1).max(120),
  recipient: z.string().trim().max(320).optional(),
  fields: z
    .array(
      z.object({
        name: z.string().trim().min(1).max(80),
        label: z.string().trim().min(1).max(200),
        value: z.string().trim().max(5000),
      }),
    )
    .max(40),
});

/** Sparar en inkommen anmälan från något av klubbens formulär. */
export const submitClubForm = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const parsed = submissionSchema.safeParse(input);
    if (!parsed.success) {
      throw new Error("Ogiltig inmatning");
    }
    return parsed.data;
  })
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("club_form_submissions").insert({
      form_name: data.formName,
      recipient: data.recipient ?? null,
      payload: data.fields,
    });
    if (error) {
      throw new Error("Kunde inte spara anmälan");
    }
    return { ok: true as const };
  });
