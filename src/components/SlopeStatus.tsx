import React from 'react';
import { Video, Snowflake, Thermometer, ExternalLink, Mountain } from 'lucide-react';

export const SlopeStatus: React.FC = () => {
  return (
    <div className="bg-white border-y border-slate-200/80 shadow-xs py-3 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
        
        {/* Left: Slope status badge */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Ekholmsnäsbacken</span>
          </div>
          <span className="hidden md:inline text-slate-400">•</span>
          <span className="text-slate-600 font-medium hidden md:inline">
            Lidingös skidbacke & klubbens hemmaarena
          </span>
        </div>

        {/* Center: Live weather indicator */}
        <div className="flex items-center gap-4 text-slate-700 font-medium">
          <div className="flex items-center gap-1.5">
            <Thermometer className="w-4 h-4 text-freeskiers-cyan" />
            <span>-2°C</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Snowflake className="w-4 h-4 text-freeskiers-cyan" />
            <span>Snöläge: Bra förhållanden</span>
          </div>
        </div>

        {/* Right: Webcam link */}
        <div className="flex items-center gap-3">
          <a
            href="https://www.lidingofreeskiers.se" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-freeskiers-cyan hover:text-freeskiers-lightcyan font-semibold transition-colors"
          >
            <Video className="w-4 h-4" />
            <span>Live Webbkamera & Pistinfo</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

      </div>
    </div>
  );
};
