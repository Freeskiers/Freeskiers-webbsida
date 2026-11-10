import React from "react";
import { FileText, Calendar, AlertCircle, Coins, ShieldAlert, Info } from "lucide-react";
import type { SiteContent, CmsCancellationRules } from "@/types/cms";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export interface CancellationRulesFormProps {
  draft: SiteContent;
  onChange: (updated: SiteContent) => void;
  className?: string;
}

export const CancellationRulesForm: React.FC<CancellationRulesFormProps> = ({
  draft,
  onChange,
  className = "",
}) => {
  const rules: CmsCancellationRules = draft.cancellationRules || {
    fullRefundUntil: "",
    skidklubbDeduction: "",
    helgskidskolaDeduction: "",
    cancelledSeasonFee: "",
    deductionPeriod: "",
    noRefundFrom: "",
    policyText: "",
  };

  const updateRules = (partial: Partial<CmsCancellationRules>) => {
    onChange({
      ...draft,
      cancellationRules: {
        ...rules,
        ...partial,
      },
    });
  };

  return (
    <Card className={`border-border bg-card shadow-sm ${className}`}>
      <CardHeader className="space-y-1 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <FileText className="size-5" />
          </span>
          <div>
            <CardTitle className="text-lg font-bold text-foreground">
              Avbokningsregler & Återbetalning
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Tidsfrister och administrationsavdrag vid avbokning av träningsgrupper.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Visual Phase Summary */}
        <div className="rounded-xl border border-border bg-muted/20 p-4">
          <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Info className="size-3.5 text-primary" />
            Översikt av avbokningsperioder
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/20 p-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Fas 1: Full återbetalning
              </span>
              <p className="mt-1 text-xs font-semibold text-foreground">
                T.o.m. {rules.fullRefundUntil || "ej satt"}
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                100% av anmälningsavgiften återbetalas.
              </p>
            </div>

            <div className="rounded-lg border border-amber-500/20 bg-amber-50/50 dark:bg-amber-950/20 p-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Fas 2: Avdrag tillämpas
              </span>
              <p className="mt-1 text-xs font-semibold text-foreground">
                {rules.deductionPeriod || "ej satt"}
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                Skidklubb: -{rules.skidklubbDeduction || "0 kr"} | Skidskola: -
                {rules.helgskidskolaDeduction || "0 kr"}
              </p>
            </div>

            <div className="rounded-lg border border-rose-500/20 bg-rose-50/50 dark:bg-rose-950/20 p-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                Fas 3: Ingen återbetalning
              </span>
              <p className="mt-1 text-xs font-semibold text-foreground">
                Fr.o.m. {rules.noRefundFrom || "ej satt"}
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                Ingen återbetalning vid skada/sjukdom/förhinder.
              </p>
            </div>
          </div>
        </div>

        {/* Date fields */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Calendar className="size-3.5 text-primary" />
            Datum & Tidsfrister
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label
                htmlFor="rules-fullRefundUntil"
                className="text-xs font-semibold text-foreground"
              >
                Full återbetalning t.o.m.
              </Label>
              <Input
                id="rules-fullRefundUntil"
                type="text"
                value={rules.fullRefundUntil}
                onChange={(e) => updateRules({ fullRefundUntil: e.target.value })}
                placeholder="T.ex. 30 november"
                className="h-9 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="rules-deductionPeriod"
                className="text-xs font-semibold text-foreground"
              >
                Avdragsperiod
              </Label>
              <Input
                id="rules-deductionPeriod"
                type="text"
                value={rules.deductionPeriod}
                onChange={(e) => updateRules({ deductionPeriod: e.target.value })}
                placeholder="T.ex. 1–20 december"
                className="h-9 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="rules-noRefundFrom" className="text-xs font-semibold text-foreground">
                Ingen återbetalning fr.o.m.
              </Label>
              <Input
                id="rules-noRefundFrom"
                type="text"
                value={rules.noRefundFrom}
                onChange={(e) => updateRules({ noRefundFrom: e.target.value })}
                placeholder="T.ex. 21 december"
                className="h-9 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Deductions fields */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Coins className="size-3.5 text-primary" />
            Avdragsbelopp vid avbokning
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label
                htmlFor="rules-skidklubbDeduction"
                className="text-xs font-semibold text-foreground"
              >
                Avdrag Skidklubb
              </Label>
              <Input
                id="rules-skidklubbDeduction"
                type="text"
                value={rules.skidklubbDeduction}
                onChange={(e) => updateRules({ skidklubbDeduction: e.target.value })}
                placeholder="T.ex. 1 000 kr"
                className="h-9 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="rules-helgskidskolaDeduction"
                className="text-xs font-semibold text-foreground"
              >
                Avdrag Helgskidskola
              </Label>
              <Input
                id="rules-helgskidskolaDeduction"
                type="text"
                value={rules.helgskidskolaDeduction}
                onChange={(e) => updateRules({ helgskidskolaDeduction: e.target.value })}
                placeholder="T.ex. 600 kr"
                className="h-9 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="rules-cancelledSeasonFee"
                className="text-xs font-semibold text-foreground"
              >
                Avdrag vid ej öppnad backe
              </Label>
              <Input
                id="rules-cancelledSeasonFee"
                type="text"
                value={rules.cancelledSeasonFee}
                onChange={(e) => updateRules({ cancelledSeasonFee: e.target.value })}
                placeholder="T.ex. 400 kr"
                className="h-9 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Policy text multiline */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="rules-policyText"
              className="text-xs font-semibold text-foreground flex items-center gap-1.5"
            >
              <ShieldAlert className="size-3.5 text-primary" />
              Fullständig policytext
            </Label>
            <span className="text-[11px] text-muted-foreground">
              Visas på webbplatsen i villkoren
            </span>
          </div>
          <Textarea
            id="rules-policyText"
            rows={5}
            value={rules.policyText}
            onChange={(e) => updateRules({ policyText: e.target.value })}
            placeholder="Policytext som förklarar reglerna och skälet till bindande anmälan..."
            className="text-xs leading-relaxed"
          />
        </div>
      </CardContent>
    </Card>
  );
};
