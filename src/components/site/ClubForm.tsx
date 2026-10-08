import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
  const [to, setTo] = useState(recipients?.[0]?.value ?? "");

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
              Vi hör av oss inom några dagar. (Just nu sparas inte svaren – säg till om du vill
              kunna se inkomna anmälningar i en lista.)
            </p>
          </div>
        </div>
      ) : (
        <form
          className="mt-6 grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            toast.success("Tack! Din anmälan är skickad.");
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
