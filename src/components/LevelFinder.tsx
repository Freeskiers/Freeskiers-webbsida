import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, RotateCcw, Sparkles, X, ShieldAlert } from 'lucide-react';

interface LevelFinderProps {
  isModal?: boolean;
  onClose?: () => void;
}

interface Question {
  id: number;
  title: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    value: string;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    title: 'Hur gammal är åkaren?',
    subtitle: 'Välj åldersgrupp för att se vilka verksamheter som passar.',
    options: [
      { label: '5–7 år', description: 'Yngre barn som vill börja åka eller nyss börjat', value: 'young' },
      { label: '8–11 år', description: 'Mellanstadieålder – nybörjare eller erfarna', value: 'mid' },
      { label: '12–15 år', description: 'Äldre ungdomar som vill träna friåkning eller lära sig grunder', value: 'teen' },
      { label: '15+ år (åk 9 eller äldre)', description: 'Ungdom/senior – åkare eller intresserad av att bli tränare', value: 'senior' },
    ]
  },
  {
    id: 2,
    title: 'Hur van är åkaren i backen & liften?',
    subtitle: 'Var ärlig – rätt nivå ger absolut mest skidglädje och trygghet!',
    options: [
      { 
        label: 'Nybörjare', 
        description: 'Har aldrig åkt skidor tidigare eller behöver hjälp i knappliften och barnbacken.', 
        value: 'beginner' 
      },
      { 
        label: 'Fortsättning', 
        description: 'Kan åka knapplift själv, bromsa kontrollerat och svänga i barnbacken/lätta backar.', 
        value: 'intermediate' 
      },
      { 
        label: 'Säker åkare', 
        description: 'Åker obehindrat i alla backar och stora liften med parallella skidor och god fartkontroll.', 
        value: 'advanced' 
      },
      { 
        label: 'Park & Friåkning', 
        description: 'Hoppar gärna på kickers, provar rails/boxar och vill utveckla freestyle och trick.', 
        value: 'freestyle' 
      },
    ]
  },
  {
    id: 3,
    title: 'Vad vill åkaren framför allt göra?',
    subtitle: 'Välj det som lockar mest inför kommande säsong.',
    options: [
      { 
        label: 'Helgskidskola (januari–februari)', 
        description: '5 intensiva och roliga lördagar eller söndagar i Ekholmsnäsbacken.', 
        value: 'weekend' 
      },
      { 
        label: 'Regelbunden vardagsträning', 
        description: 'Träna 1–2 vardagskvällar i veckan hela vintern med klubbkompisar.', 
        value: 'club' 
      },
      { 
        label: 'Fokusera på hopp, rails & trick', 
        description: 'Utvecklas i snowparken och lära sig rotationer, boxar och stil.', 
        value: 'park' 
      },
      { 
        label: 'Bli tränare & ledare (efter åk 9)', 
        description: 'Utbilda dig och börja coacha klubbens barn och unga i backen.', 
        value: 'coach' 
      },
    ]
  }
];

export const LevelFinder: React.FC<LevelFinderProps> = ({ isModal = false, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleSelect = (val: string) => {
    const newAnswers = { ...answers, [currentStep]: val };
    setAnswers(newAnswers);
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(questions.length); // Result screen
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
  };

  // Determine recommendation
  const calculateResult = () => {
    const age = answers[0];
    const skill = answers[1];
    const goal = answers[2];

    if (goal === 'coach' || (age === 'senior' && skill === 'advanced')) {
      return {
        badge: 'Tränarutbildning & Ledarskap',
        badgeColor: 'bg-freeskiers-navy text-white',
        title: 'Bli Tränare & Ungdomsledare (åk 9+)',
        desc: 'För dig som har god skidvana, älskar skidglädje och vill inspirera nästa generations unga åkare. Klubben samordnar instruktörskurser med externa utbildare.',
        link: '/om-oss#bli-tranare',
        linkText: 'Läs om att bli tränare & ansök',
        details: ['Efter avslutad åk 9', 'Skidkunskap & ledarintresse', 'Självbekostad instruktörskurs via utbildare']
      };
    }

    if (skill === 'beginner' || (age === 'young' && skill === 'intermediate' && goal === 'weekend')) {
      return {
        badge: 'Helgskidskola • Grön Grupp (Nybörjare)',
        badgeColor: 'bg-emerald-600 text-white',
        title: 'Helgskidskola – Grön Grupp',
        desc: 'Perfekt för barn som tar sina första svängar eller behöver bygga självförtroende i barnbacken och liften. Trygga instruktörer och massor av lek och skidglädje!',
        link: '/helgskidskola',
        linkText: 'Se Helgskidskolan & Anmäl',
        details: ['Från ca 5 år', '5 helgtillfällen i jan–feb', 'Inga förkunskaper krävs', 'Hjälm & ryggskydd krävs']
      };
    }

    if (goal === 'club' || goal === 'park' || (skill === 'freestyle' && age !== 'young')) {
      return {
        badge: 'Skidklubb • Vardagar',
        badgeColor: 'bg-freeskiers-cyan text-white',
        title: 'Freeskiers Skidklubb',
        desc: 'För åkare som vill träna regelbunden friåkning, carving, hopp, rails och park under vardagskvällar i Ekholmsnäsbacken. Stark gemenskap och inspirerande coacher!',
        link: '/skidklubb',
        linkText: 'Se Skidklubben & Träningstider',
        details: ['Vardagskvällar jan–mars', 'Park, hopp, rails & carving', 'Krav: åka lift själv och parallellsvänga']
      };
    }

    if (skill === 'intermediate') {
      return {
        badge: 'Helgskidskola • Blå Grupp (Fortsättning)',
        badgeColor: 'bg-sky-600 text-white',
        title: 'Helgskidskola – Blå Grupp',
        desc: 'För barn som kan bromsa, svänga och åka lift på egen hand och vill ta steget till parallella skidor, högre fart och små terrängvågor i stora backen.',
        link: '/helgskidskola',
        linkText: 'Se Helgskidskolan & Anmäl',
        details: ['Från ca 6–9 år', '5 helger i jan–feb', 'Krav: åka knapplift själv & bromsa kontrollerat']
      };
    }

    return {
      badge: 'Helgskidskola • Röd Grupp (Freeski Intro)',
      badgeColor: 'bg-rose-600 text-white',
      title: 'Helgskidskola – Röd Grupp',
      desc: 'För säkra åkare som åker obehindrat i hela backen och vill introduceras till hoppteknik, landning, boxar och lekfull friåkning under helgerna.',
      link: '/helgskidskola',
      linkText: 'Se Helgskidskolan & Anmäl',
      details: ['Från ca 8–13 år', '5 helger i jan–feb', 'Krav: god fartkontroll & parallella skidor']
    };
  };

  const isCompleted = currentStep >= questions.length;
  const result = isCompleted ? calculateResult() : null;

  return (
    <div className={`bg-white rounded-3xl ${isModal ? 'p-6 sm:p-8' : 'p-6 sm:p-10 border border-slate-200/90 shadow-card'}`}>
      
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-freeskiers-cyan/15 text-freeskiers-cyan text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nivåväljaren • 1 min skidtest</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-freeskiers-navy tracking-tight">
            {isCompleted ? 'Ditt resultat & Rekommenderad grupp' : questions[currentStep].title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isCompleted ? 'Här är den verksamhet som passar åkarens ålder och erfarenhet bäst.' : questions[currentStep].subtitle}
          </p>
        </div>

        {isModal && onClose && (
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
            aria-label="Stäng test"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Step Indicators */}
      {!isCompleted && (
        <div className="flex items-center gap-2 mb-6">
          {questions.map((q, idx) => (
            <div 
              key={q.id}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                idx === currentStep 
                  ? 'bg-freeskiers-cyan' 
                  : idx < currentStep 
                    ? 'bg-freeskiers-navy' 
                    : 'bg-slate-200'
              }`}
            />
          ))}
          <span className="text-xs font-bold text-slate-400 ml-2">
            {currentStep + 1} / {questions.length}
          </span>
        </div>
      )}

      {/* Question Options */}
      {!isCompleted && (
        <div className="space-y-3">
          {questions[currentStep].options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className="w-full text-left p-4 sm:p-5 rounded-2xl border border-slate-200 hover:border-freeskiers-cyan hover:bg-sky-50/50 transition-all duration-200 group flex items-start justify-between gap-4"
            >
              <div>
                <div className="font-extrabold text-sm sm:text-base text-freeskiers-navy group-hover:text-freeskiers-cyan transition-colors">
                  {opt.label}
                </div>
                <div className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-relaxed">
                  {opt.description}
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-freeskiers-cyan group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white" />
              </div>
            </button>
          ))}

          {currentStep > 0 && (
            <div className="pt-2">
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="text-xs font-bold text-slate-500 hover:text-freeskiers-navy transition-colors"
              >
                ← Gå tillbaka till föregående fråga
              </button>
            </div>
          )}
        </div>
      )}

      {/* Completed Result Card */}
      {isCompleted && result && (
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-sky-50 via-white to-sky-50 border-2 border-freeskiers-cyan/30 shadow-soft">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${result.badgeColor}`}>
                {result.badge}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                100% Skidglädje & Utveckling
              </span>
            </div>

            <h4 className="text-2xl sm:text-3xl font-black text-freeskiers-navy">
              {result.title}
            </h4>

            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              {result.desc}
            </p>

            {/* Bullet points */}
            <div className="mt-5 pt-5 border-t border-slate-200/80 space-y-2">
              {result.details.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-freeskiers-cyan shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to={result.link}
                onClick={onClose}
                className="inline-flex items-center gap-2 bg-freeskiers-cyan hover:bg-freeskiers-lightcyan text-white px-6 py-3.5 rounded-full font-bold text-sm shadow-soft transition-all"
              >
                <span>{result.linkText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-3 rounded-full font-bold text-xs sm:text-sm transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Gör om testet</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
