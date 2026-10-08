import React, { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ShieldCheck, CheckCircle2, Calendar, MapPin, Sparkles, ArrowRight, Heart } from 'lucide-react';

export const VerifieraMedlemPage: React.FC = () => {
  const [searchParams, setSearchParams] = useState(() => new URLSearchParams());
  useEffect(() => { setSearchParams(new URLSearchParams(window.location.search)); }, []);

  const memberId = searchParams.get('id') || 'FS-2026-1042';
  const memberName = searchParams.get('namn') || 'Liam Aaröe';
  const memberGroup = searchParams.get('grupp') || 'Freeskiers Skidklubb';
  const season = searchParams.get('season') || '2026/2027';

  const [scanTime, setScanTime] = useState<string>('');

  useEffect(() => {
    const now = new Date();
    setScanTime(now.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ', ' + now.toLocaleDateString('sv-SE'));
  }, []);

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-slate-50 via-white to-sky-50 py-16 px-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-2xl text-center relative overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        {/* Top green glow banner */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-400" />
        
        {/* Verification Icon with pulse */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full bg-emerald-400 opacity-20 animate-ping" />
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-soft relative z-10">
            <ShieldCheck className="w-12 h-12" />
          </div>
        </div>

        {/* Verification Title */}
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-black uppercase tracking-wider mb-2">
          <Sparkles className="w-3 h-3 text-emerald-600" />
          <span>Auktoriserat Medlemskap</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-freeskiers-navy tracking-tight mb-1">
          Verifierad Freeskier
        </h1>
        <p className="text-xs text-slate-500 font-semibold mb-6">
          IK Lidingö Freeskiers • Säsongen {season}
        </p>

        {/* Member Details Card */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/90 text-left space-y-3 mb-6">
          
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Åkare / Medlem
            </div>
            <div className="text-xl font-black text-freeskiers-navy uppercase tracking-tight">
              {memberName}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Medlems-ID
              </div>
              <div className="font-mono text-xs font-bold text-freeskiers-cyan">
                {memberId}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Status
              </div>
              <div className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Aktiv & Försäkrad</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Aktivitet / Träningsgrupp
            </div>
            <div className="text-xs font-bold text-freeskiers-navy">
              {memberGroup}
            </div>
          </div>

        </div>

        {/* Partner Discount Approval Notice */}
        <div className="p-4 rounded-xl bg-sky-50 border border-sky-100 text-left text-xs text-slate-700 leading-relaxed mb-6 space-y-1">
          <div className="font-extrabold text-freeskiers-navy flex items-center gap-1.5">
            <span>⭐️ Berättigad till medlemsrabatter</span>
          </div>
          <p className="text-[11px] text-slate-600">
            Gäller <strong>15% hos Alpingaraget</strong>, säsongskortspriser i <strong>Ekholmsnäsbacken</strong> samt klubbrabatter hos officiella samarbetspartners.
          </p>
        </div>

        {/* Real-time verification stamp */}
        {scanTime && (
          <div className="text-[10px] text-slate-400 mb-6 font-mono">
            Scannat: {scanTime}
          </div>
        )}

        {/* Return Button */}
        <Link
          to="/"
          className="w-full inline-flex items-center justify-center gap-2 bg-freeskiers-navy hover:bg-slate-800 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-soft transition-all"
        >
          <span>Till Lidingö Freeskiers startsida</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

      </div>
    </div>
  );
};
