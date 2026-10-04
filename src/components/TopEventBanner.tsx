import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ChevronLeft, ChevronRight, ArrowRight, Calendar, Bell, X } from 'lucide-react';
import { clubEvents, ClubEvent } from '../data/clubEvents';

export const TopEventBanner: React.FC = () => {
  const pushedEvents: ClubEvent[] = clubEvents.filter(e => e.isPushedTop);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Auto rotate pushed events every 7 seconds if not paused
  useEffect(() => {
    if (pushedEvents.length <= 1 || isPaused || isDismissed) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % pushedEvents.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [pushedEvents.length, isPaused, isDismissed]);

  if (pushedEvents.length === 0 || isDismissed) {
    return null;
  }

  const currentEvent = pushedEvents[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev === 0 ? pushedEvents.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev + 1) % pushedEvents.length);
  };

  return (
    <div 
      className="bg-gradient-to-r from-freeskiers-navy via-slate-900 to-freeskiers-navy text-white text-xs py-2 px-3 sm:px-6 border-b border-white/10 relative transition-all duration-300"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Klubbens aktuella event och meddelanden"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Left: Badge / Ticker Label */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-freeskiers-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-freeskiers-cyan"></span>
          </span>
          <span className="inline-flex items-center gap-1 bg-freeskiers-cyan/20 border border-freeskiers-cyan/40 text-freeskiers-lightcyan font-black px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-freeskiers-lightcyan shrink-0" />
            <span className="hidden sm:inline">Aktuellt Event</span>
            <span className="sm:hidden">Aktuellt</span>
          </span>
          {pushedEvents.length > 1 && (
            <span className="text-[10px] text-slate-400 font-semibold hidden md:inline">
              ({currentIndex + 1} av {pushedEvents.length})
            </span>
          )}
        </div>

        {/* Center: Current Event Information */}
        <div className="flex-1 flex items-center justify-center gap-2 sm:gap-3 text-center truncate">
          <span className="hidden lg:inline-block px-2 py-0.5 rounded bg-white/10 text-slate-300 font-bold text-[11px]">
            {currentEvent.shortDate}
          </span>
          <span className="font-extrabold text-white text-xs sm:text-sm tracking-tight truncate">
            {currentEvent.title}
          </span>
          <span className="text-slate-300 hidden xl:inline text-xs truncate font-normal">
            – {currentEvent.tagline}
          </span>

          {currentEvent.actionUrl && (
            <Link
              to={currentEvent.actionUrl}
              className="inline-flex items-center gap-1 font-bold text-freeskiers-lightcyan hover:text-white underline underline-offset-2 shrink-0 ml-1 text-xs transition-colors"
            >
              <span>{currentEvent.actionLabel || 'Läs mer'}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>

        {/* Right: Controls & Calendar link */}
        <div className="flex items-center gap-2 shrink-0">
          {pushedEvents.length > 1 && (
            <div className="flex items-center gap-1 bg-white/5 rounded-full p-0.5 border border-white/10">
              <button
                onClick={handlePrev}
                className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
                title="Föregående event"
                aria-label="Föregående event"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleNext}
                className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
                title="Nästa event"
                aria-label="Nästa event"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <Link
            to="/kalender"
            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-slate-300 hover:text-white hover:bg-white/10 px-2.5 py-1 rounded-full border border-white/15 transition-all"
            title="Se hela säsongskalendern"
          >
            <Calendar className="w-3 h-3 text-freeskiers-cyan" />
            <span>Kalender</span>
          </Link>

          <button
            onClick={() => setIsDismissed(true)}
            className="text-slate-400 hover:text-white p-1 rounded transition-colors"
            title="Dölj meddelande"
            aria-label="Dölj toppmeddelande"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
