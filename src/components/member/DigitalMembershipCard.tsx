import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  ShieldCheck, 
  Sparkles, 
  Maximize2, 
  X, 
  Share2, 
  Check, 
  Calendar, 
  Award, 
  Users, 
  Download,
  Info
} from 'lucide-react';
import { MemberSkier } from '@/lib/memberData';

interface DigitalMembershipCardProps {
  skier: MemberSkier;
  guardianName?: string;
  allSkierIds?: { id: string; name: string; group: string }[];
  onSelectSkier?: (id: string) => void;
}

export const DigitalMembershipCard: React.FC<DigitalMembershipCardProps> = ({
  skier,
  guardianName,
  allSkierIds = [],
  onSelectSkier
}) => {
  const [showQrModal, setShowQrModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Generate verification URL for the QR code
  const verificationUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/verifiera?id=${encodeURIComponent(skier.id)}&namn=${encodeURIComponent(`${skier.firstName} ${skier.lastName}`)}&grupp=${encodeURIComponent(skier.groupName)}&season=${encodeURIComponent(skier.season)}`
    : `https://www.lidingofreeskiers.se/verifiera?id=${skier.id}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Medlemskort – ${skier.firstName} ${skier.lastName}`,
        text: `Digitalt medlemskort i IK Lidingö Freeskiers säsongen ${skier.season}`,
        url: verificationUrl
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(verificationUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const getGroupBadgeColor = (level: string) => {
    switch (level) {
      case 'gron': return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40';
      case 'bla': return 'bg-sky-500/20 text-sky-300 border-sky-400/40';
      case 'rod': return 'bg-rose-500/20 text-rose-300 border-rose-400/40';
      case 'tranare': return 'bg-amber-500/20 text-amber-300 border-amber-400/40';
      default: return 'bg-freeskiers-cyan/20 text-freeskiers-lightcyan border-freeskiers-cyan/40';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      
      {/* Sibling / Family Switcher (if multiple children under the account) */}
      {allSkierIds.length > 1 && (
        <div className="mb-4 bg-slate-100 p-1 rounded-2xl flex items-center gap-1.5 border border-slate-200">
          <span className="text-[11px] font-bold text-slate-500 uppercase px-2.5">Åkare:</span>
          {allSkierIds.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelectSkier && onSelectSkier(s.id)}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all truncate text-center ${
                s.id === skier.id
                  ? 'bg-freeskiers-navy text-white shadow-soft'
                  : 'text-slate-700 hover:bg-white/80'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      )}

      {/* The Physical Card Container */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 transform hover:scale-[1.01] border-2 border-slate-700/60 bg-gradient-to-br from-[#0B1728] via-[#132238] to-[#0A1424] text-white">
        
        {/* Holographic metallic sheen overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-freeskiers-cyan/10 via-transparent to-white/10 pointer-events-none" />
        
        {/* Subtle background patterns */}
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-freeskiers-cyan/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />

        {/* Card Header */}
        <div className="p-6 sm:p-7 relative z-10">
          
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/logo/freeskiers-logo-skold.png" 
                alt="IK Lidingö Freeskiers" 
                className="w-12 h-12 object-contain drop-shadow"
              />
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-freeskiers-lightcyan block leading-none">
                  Officiellt Medlemskort
                </span>
                <span className="text-base sm:text-lg font-black tracking-tight text-white leading-tight block mt-1">
                  IK LIDINGÖ FREESKIERS
                </span>
              </div>
            </div>

            {/* Active Membership Pulse Badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold uppercase tracking-wider shrink-0 shadow-xs">
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
              </span>
              <span>Aktiv • Betald</span>
            </div>
          </div>

          {/* Member Name & ID */}
          <div className="space-y-1 mb-6">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Medlemsnamn
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              {skier.firstName} {skier.lastName}
            </div>
            <div className="flex items-center gap-2 pt-0.5">
              <span className="font-mono text-xs font-bold text-freeskiers-lightcyan bg-white/10 px-2 py-0.5 rounded-md">
                {skier.id}
              </span>
              {guardianName && (
                <span className="text-[11px] text-slate-400 truncate">
                  Målsman: {guardianName}
                </span>
              )}
            </div>
          </div>

          {/* Group & Season Badges */}
          <div className="grid grid-cols-2 gap-3 mb-6 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider mb-0.5">
                Verksamhet / Grupp
              </span>
              <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-md border truncate max-w-full ${getGroupBadgeColor(skier.groupLevel)}`}>
                {skier.groupName}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider mb-0.5">
                Giltig Säsong
              </span>
              <span className="text-xs font-black text-white inline-flex items-center gap-1 justify-end">
                <Calendar className="w-3.5 h-3.5 text-freeskiers-cyan" />
                <span>{skier.season}</span>
              </span>
            </div>
          </div>

          {/* QR Code & Scan Section */}
          <div className="pt-4 border-t border-white/15 flex items-center justify-between gap-4">
            
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-1 text-[11px] font-bold text-freeskiers-lightcyan uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Rabatt- & Partnerkod</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                Visas i butik hos <strong>Alpingaraget</strong> & <strong>Ekholmsnäsbacken</strong> för medlemsrabatt.
              </p>
              <button
                onClick={() => setShowQrModal(true)}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-white hover:text-freeskiers-lightcyan underline pt-1 transition-colors"
              >
                <Maximize2 className="w-3 h-3" />
                <span>Förstora QR-kod</span>
              </button>
            </div>

            {/* Clickable QR Code */}
            <div 
              onClick={() => setShowQrModal(true)}
              className="bg-white p-2 rounded-2xl shadow-elevated cursor-pointer hover:scale-105 transition-transform shrink-0 group border-2 border-white/80"
              title="Klicka för att förstora QR-koden"
            >
              <QRCodeSVG 
                value={verificationUrl} 
                size={80}
                level="M"
                includeMargin={false}
              />
              <div className="text-[8px] font-black text-slate-800 text-center uppercase tracking-tighter mt-1 group-hover:text-freeskiers-cyan">
                Klicka för stor
              </div>
            </div>

          </div>

        </div>

        {/* Card Footer Stripe */}
        <div className="bg-slate-950/80 px-6 py-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-freeskiers-cyan" />
            <span>Svenska Skidförbundet & RF</span>
          </span>
          <button
            onClick={handleShare}
            className="text-slate-300 hover:text-white font-semibold flex items-center gap-1 transition-colors"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Kopierat!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-freeskiers-cyan" />
                <span>Dela / Spara</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Helpful Hint on how to use it */}
      <div className="mt-4 p-3.5 rounded-2xl bg-sky-50 border border-sky-100 flex items-start gap-2.5 text-xs text-slate-700">
        <Info className="w-4 h-4 text-freeskiers-cyan shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Tips:</strong> Spara den här sidan som ett bokmärke på hemskärmen i din iPhone eller Android för att alltid ha medlemskortet till hands i backen och butiken!
        </p>
      </div>

      {/* Enlarge QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="fixed inset-0" 
            onClick={() => setShowQrModal(false)}
            aria-hidden="true" 
          />
          <div className="relative z-10 bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Stäng"
            >
              <X className="w-5 h-5" />
            </button>

            <img 
              src="/assets/logo/freeskiers-logo-skold.png" 
              alt="Freeskiers" 
              className="w-14 h-14 mx-auto object-contain mb-3"
            />

            <h3 className="text-xl font-black text-freeskiers-navy">
              {skier.firstName} {skier.lastName}
            </h3>
            <div className="text-xs font-bold text-freeskiers-cyan uppercase mb-4">
              {skier.groupName} • {skier.id}
            </div>

            {/* Big High-Contrast QR Code for scanning */}
            <div className="bg-white p-4 rounded-3xl inline-block border-2 border-slate-200 shadow-md mb-4">
              <QRCodeSVG 
                value={verificationUrl} 
                size={220}
                level="Q"
                includeMargin={true}
              />
            </div>

            <p className="text-xs text-slate-500 leading-relaxed mb-6">
              Rikta mobilkameran eller butiksscannern mot QR-koden för att verifiera medlemskapet.
            </p>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-3 rounded-xl bg-freeskiers-navy hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Stäng fönstret
            </button>

          </div>
        </div>
      )}

    </div>
  );
};
