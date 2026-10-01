import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Sparkles } from 'lucide-react';
import { LevelFinder } from '../components/LevelFinder';

interface LevelFinderContextType {
  isOpen: boolean;
  openLevelFinder: () => void;
  closeLevelFinder: () => void;
}

const LevelFinderContext = createContext<LevelFinderContextType | undefined>(undefined);

export const LevelFinderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openLevelFinder = () => setIsOpen(true);
  const closeLevelFinder = () => setIsOpen(false);

  return (
    <LevelFinderContext.Provider value={{ isOpen, openLevelFinder, closeLevelFinder }}>
      {children}

      {/* Floating Skidtest Trigger Button (Accessible across all pages) */}
      <button
        onClick={openLevelFinder}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 bg-freeskiers-navy hover:bg-slate-800 text-white px-4 py-2.5 rounded-full shadow-card border border-white/20 hover:border-freeskiers-lightcyan hover:shadow-elevated transition-all duration-300 font-bold text-xs group"
        title="Gör 1 min skidtest för att hitta rätt nivå"
      >
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-freeskiers-lightcyan opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-freeskiers-lightcyan"></span>
        </span>
        <Sparkles className="w-4 h-4 text-freeskiers-lightcyan group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline">Hitta rätt nivå (skidtest)</span>
        <span className="sm:hidden">Skidtest</span>
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="fixed inset-0" 
            onClick={closeLevelFinder}
            aria-hidden="true" 
          />
          <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl animate-in zoom-in-95 duration-200">
            <LevelFinder isModal={true} onClose={closeLevelFinder} />
          </div>
        </div>
      )}
    </LevelFinderContext.Provider>
  );
};

export const useLevelFinder = (): LevelFinderContextType => {
  const context = useContext(LevelFinderContext);
  if (!context) {
    throw new Error('useLevelFinder must be used within a LevelFinderProvider');
  }
  return context;
};
