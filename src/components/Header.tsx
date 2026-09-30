import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar, ChevronRight } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Hem', path: '/' },
    { name: 'Helgskidskola', path: '/helgskidskola' },
    { name: 'Skidklubb', path: '/skidklubb' },
    { name: 'Höstsäsong', path: '/hostsasong' },
    { name: 'Privatlektion', path: '/privatlektion' },
    { name: 'Om oss', path: '/om-oss' },
    { name: 'Kontakt & FAQ', path: '/kontakt' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/assets/logo/freeskiers-logo-skold.png" 
              alt="IK Lidingö Freeskiers" 
              className="h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-freeskiers-navy leading-none">
                LIDINGÖ FREESKIERS
              </span>
              <span className="text-[11px] font-semibold text-freeskiers-cyan tracking-wider uppercase mt-1">
                Ekholmsnäsbacken • Etabl. 2001
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? 'text-freeskiers-cyan bg-freeskiers-cyan/10 font-semibold'
                    : 'text-slate-700 hover:text-freeskiers-cyan hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Header Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/helgskidskola"
              className="inline-flex items-center gap-2 bg-freeskiers-cyan hover:bg-freeskiers-lightcyan text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-soft hover:shadow-elevated transition-all transform hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Anmäl & Boka</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-freeskiers-cyan hover:bg-slate-100 transition-colors"
            aria-label="Öppna meny"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-2 pb-6 space-y-1 animate-in fade-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                isActive(link.path)
                  ? 'text-freeskiers-cyan bg-freeskiers-cyan/10 font-semibold'
                  : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              <span>{link.name}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          ))}
          <div className="pt-3">
            <Link
              to="/helgskidskola"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-freeskiers-cyan hover:bg-freeskiers-lightcyan text-white py-3 rounded-xl font-semibold shadow-soft transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Anmäl & Boka Träning</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
