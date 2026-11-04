import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitClubForm } from "@/lib/club-form.functions";

export type FormField = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea";
  placeholder?: string;
  required?: boolean;
};

type Props = {
  title: string;
  description: string;
  fields: FormField[];
  submitLabel: string;
  consent?: string;
  recipients?: { value: string; label: string }[];
};

export function ClubForm({ title, description, fields, submitLabel, consent, recipients }: Props) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [to, setTo] = useState(recipients?.[0]?.value ?? "");
  const submitForm = useServerFn(submitClubForm);

  return (
    <div className="surface-card p-6 sm:p-8">
      <h3 className="text-xl">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>

      {sent ? (
        <div className="mt-6 flex items-start gap-3 rounded-xl bg-secondary p-4">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" />
          <div className="text-sm">
            <p className="font-semibold text-primary">Tack, vi har tagit emot din anmälan!</p>
            <p className="mt-1 text-muted-foreground">
              Anmälan är sparad och ledningen hör av sig inom några dagar.
            </p>
          </div>
        </div>
      ) : (
        <form
          className="mt-6 grid gap-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const values = new FormData(form);
            const submittedFields = fields.map((f) => ({
              name: f.name,
              label: f.label,
              value: String(values.get(f.name) ?? ""),
            }));
            setSending(true);
            try {
              await submitForm({
                data: {
                  formName: title,
                  recipient: recipients ? to : undefined,
                  fields: submittedFields,
                },
              });
              setSent(true);
              toast.success("Tack! Din anmälan är mottagen.");
            } catch {
              toast.error("Något gick fel. Försök igen eller mejla oss direkt.");
            } finally {
              setSending(false);
            }
          }}
        >
          {recipients ? (
            <div className="grid gap-2">
              <Label htmlFor="recipient">Vem vill du kontakta? *</Label>
              <select
                id="recipient"
                name="recipient"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                {recipients.map((r) => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
              <p className="text-xs text-muted-foreground">Mottagare: <strong className="text-primary">{to}</strong></p>
            </div>
          ) : null}
          {fields.map((f) => (
            <div key={f.name} className="grid gap-2">
              <Label htmlFor={f.name}>{f.label}</Label>
              {f.type === "textarea" ? (
                <Textarea
                  id={f.name}
                  name={f.name}
                  placeholder={f.placeholder}
                  required={f.required}
                  rows={4}
                />
              ) : (
                <Input
                  id={f.name}
                  name={f.name}
                  type={f.type ?? "text"}
                  placeholder={f.placeholder}
                  required={f.required}
                />
              )}
            </div>
          ))}
          {consent ? (
            <label className="flex items-start gap-2 text-xs text-muted-foreground">
              <input type="checkbox" required className="mt-0.5 size-4 accent-primary" />
              <span>{consent}</span>
            </label>
          ) : null}
          <Button type="submit" variant="cta" size="lg" className="mt-2 justify-self-start">
            {submitLabel}
          </Button>
        </form>
      )}
    </div>
  );
}
