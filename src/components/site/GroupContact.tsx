import { Mail, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { openEkisChat } from "@/lib/ekis-chat";

type GroupContactProps = {
  /** Det ämne frågorna gäller, t.ex. "Helgskidskolan". */
  topic: string;
  /** Klubbens mejladress för den delen. */
  email: string;
  className?: string;
};

export function GroupContact({ topic, email, className = "" }: GroupContactProps) {
  return (
    <div className={`rounded-2xl border border-border bg-secondary/40 p-6 sm:p-8 ${className}`}>
      <h2 className="text-xl">Frågor om {topic}?</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed">
        Prata först med Ekis i chatten – den finns på alla sidor och svarar direkt.
        Kan Ekis inte hjälpa mejlar du till oss.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Button type="button" variant="cta" size="lg" className="rounded-full" onClick={openEkisChat}>
          <MessageCircle className="size-4" aria-hidden="true" />
          Fråga Ekis
        </Button>
        <Button variant="outline" size="lg" className="rounded-full" asChild>
          <a href={`mailto:${email}`}>
            <Mail className="size-4" aria-hidden="true" />
            Mejla {email}
          </a>
        </Button>
      </div>
    </div>
  );
}
