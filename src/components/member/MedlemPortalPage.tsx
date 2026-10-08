import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { 
  ShieldCheck, 
  User, 
  Mail, 
  KeyRound, 
  LogOut, 
  Check, 
  Copy, 
  Sparkles, 
  Calendar, 
  Clock, 
  MapPin, 
  Tag, 
  FileText, 
  ArrowRight,
  Users,
  ChevronRight,
  Shield,
  ExternalLink,
  Award,
  Smartphone
} from 'lucide-react';
import { useMemberAuth } from './MemberAuthContext';
import { DigitalMembershipCard } from './DigitalMembershipCard';
import { memberOffers, MemberOffer } from '@/lib/memberOffers';

export const MedlemPortalPage: React.FC = () => {
  const { 
    currentUser, 
    activeSkier, 
    isLoggedIn, 
    login, 
    logout, 
    switchActiveSkier, 
    demoAccounts 
  } = useMemberAuth();

  const [emailInput, setEmailInput] = useState('');
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [codeInput, setCodeInput] = useState('');
  const [activeTab, setActiveTab] = useState<'kort' | 'erbjudanden' | 'schema' | 'info'>('kort');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // Handle email submit
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setStep('code');
    setCodeInput('2026'); // Pre-fill sample verification code for seamless UX
  };

  // Handle login completion
  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(emailInput);
    setStep('email');
    setEmailInput('');
    setCodeInput('');
  };

  // Direct login via demo buttons
  const handleDemoLogin = (email: string) => {
    login(email);
  };

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2500);
  };

  return (
    <div className="bg-white min-h-[85vh]">

      {/* Subpage Photo Hero Banner */}
      <section className="relative min-h-[340px] sm:min-h-[400px] flex items-center bg-freeskiers-navy overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/assets/images/freestyle-jump.jpg" 
            alt="Mina Sidor IK Lidingö Freeskiers" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-freeskiers-navy/95 via-freeskiers-navy/85 to-freeskiers-navy/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-freeskiers-navy/90 via-transparent to-black/30" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 w-full text-white">
          <div className="flex items-center gap-2 text-xs font-semibold text-freeskiers-lightcyan uppercase tracking-wider mb-3">
            <Link to="/" className="hover:underline">Hem</Link>
            <span>/</span>
            <span>Mina Sidor</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-freeskiers-cyan/30 text-white text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-sm border border-freeskiers-lightcyan/40 shadow-soft">
            <ShieldCheck className="w-3.5 h-3.5 text-freeskiers-lightcyan" />
            <span>Medlemsportal & Förmåner</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight max-w-3xl text-primary-foreground">
            Mina Sidor <span className="text-freeskiers-lightcyan">& Medlemskort</span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl font-normal">
            Ditt digitala medlemskort med QR-kod, säsongens träningstider och exklusiva klubbrabatter hos Alpingaraget, Ekholmsnäsbacken och våra samarbetspartners.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ========================================================================= */}
          {/* NOT LOGGED IN: LOGIN VIEW                                                 */}
          {/* ========================================================================= */}
          {!isLoggedIn ? (
            <div className="max-w-xl mx-auto">
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-2xl">
                
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-sky-50 border border-freeskiers-cyan/30 flex items-center justify-center text-freeskiers-cyan mx-auto mb-4 shadow-soft">
                    <User className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-freeskiers-navy tracking-tight">
                    Logga in på Mina Sidor
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-2">
                    Lösenordsfri inloggning kopplat till din e-postadress.
                  </p>
                </div>

                {step === 'email' ? (
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        E-postadress
                      </label>
                      <div className="relative">
                        <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="email"
                          required
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          placeholder="namn@epost.se (samma som vid anmälan)"
                          className="w-full pl-11 pr-4 py-3 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-freeskiers-cyan font-medium text-slate-800"
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1.5">
                        Skriv in den e-postadress som användes vid klubbanmälan.
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 bg-freeskiers-cyan hover:bg-freeskiers-lightcyan text-white py-3.5 rounded-xl font-bold text-sm shadow-soft transition-all"
                    >
                      <span>Fortsätt med e-post</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleCodeSubmit} className="space-y-4 animate-in fade-in duration-200">
                    <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-100 text-xs text-sky-900 flex items-center justify-between">
                      <div>
                        <span>Engångskod skickad till: </span>
                        <strong>{emailInput}</strong>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep('email')}
                        className="text-freeskiers-cyan font-bold underline"
                      >
                        Ändra
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        4-siffrig engångskod
                      </label>
                      <div className="relative">
                        <KeyRound className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          required
                          maxLength={6}
                          value={codeInput}
                          onChange={(e) => setCodeInput(e.target.value)}
                          placeholder="2026"
                          className="w-full pl-11 pr-4 py-3 text-center tracking-widest text-lg font-mono font-bold bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-freeskiers-cyan"
                        />
                      </div>
                      <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                        ✓ Testkod i demo: 2026 (fylls i automatiskt)
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 bg-freeskiers-navy hover:bg-slate-800 text-white py-3.5 rounded-xl font-bold text-sm shadow-soft transition-all"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Logga in & Visa mitt kort</span>
                    </button>
                  </form>
                )}

                {/* Instant Demo Accounts for fast testing */}
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-3 text-center">
                    Eller testa direkt med ett klick:
                  </span>
                  <div className="space-y-2">
                    {demoAccounts.map((demo) => (
                      <button
                        key={demo.email}
                        onClick={() => handleDemoLogin(demo.email)}
                        className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-freeskiers-cyan/50 hover:bg-sky-50/50 transition-all flex items-center justify-between text-xs group"
                      >
                        <div>
                          <div className="font-extrabold text-freeskiers-navy group-hover:text-freeskiers-cyan">
                            {demo.guardianName}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {demo.email} • {demo.skiers.map(s => s.firstName).join(', ')} ({demo.skiers[0]?.groupName})
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-freeskiers-cyan bg-white px-2 py-1 rounded-md border border-slate-200 shrink-0">
                          Logga in →
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ) : (
            /* ========================================================================= */
            /* LOGGED IN: MEMBER PORTAL DASHBOARD                                        */
            /* ========================================================================= */
            currentUser && activeSkier && (
              <div>
                
                {/* Logged in Top Welcome Banner */}
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-freeskiers-navy text-white flex items-center justify-center font-black text-xl shadow-soft shrink-0">
                      {currentUser.guardianName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-xl sm:text-2xl text-freeskiers-navy">
                          Hej {currentUser.guardianName}!
                        </span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-freeskiers-cyan/15 text-freeskiers-cyan uppercase">
                          {currentUser.role}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Inloggad som: <strong>{currentUser.email}</strong> • {currentUser.skiers.length} {currentUser.skiers.length === 1 ? 'registrerad åkare' : 'registrerade åkare'}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={logout}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition-colors self-start md:self-auto"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logga ut</span>
                  </button>
                </div>

                {/* Subnavigation Tabs */}
                <div className="flex items-center gap-2 border-b border-slate-200 pb-4 mb-8 overflow-x-auto">
                  <button
                    onClick={() => setActiveTab('kort')}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
                      activeTab === 'kort'
                        ? 'bg-freeskiers-navy text-white shadow-soft'
                        : 'text-slate-600 hover:text-freeskiers-navy hover:bg-slate-100'
                    }`}
                  >
                    <Award className="w-4 h-4" />
                    <span>Mitt Medlemskort</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('erbjudanden')}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
                      activeTab === 'erbjudanden'
                        ? 'bg-freeskiers-navy text-white shadow-soft'
                        : 'text-slate-600 hover:text-freeskiers-navy hover:bg-slate-100'
                    }`}
                  >
                    <Tag className="w-4 h-4 text-freeskiers-cyan" />
                    <span>Medlemsförmåner & Rabatter</span>
                    <span className="text-[10px] bg-freeskiers-cyan text-white px-1.5 py-0.5 rounded-full font-black">
                      {memberOffers.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab('schema')}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
                      activeTab === 'schema'
                        ? 'bg-freeskiers-navy text-white shadow-soft'
                        : 'text-slate-600 hover:text-freeskiers-navy hover:bg-slate-100'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    <span>Mina Träningar</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('info')}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
                      activeTab === 'info'
                        ? 'bg-freeskiers-navy text-white shadow-soft'
                        : 'text-slate-600 hover:text-freeskiers-navy hover:bg-slate-100'
                    }`}
                  >
                    <Shield className="w-4 h-4" />
                    <span>Försäkring & Info</span>
                  </button>
                </div>

                {/* TAB 1: MITT MEDLEMSKORT */}
                {activeTab === 'kort' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    
                    {/* The Digital Card Component */}
                    <div className="lg:col-span-6">
                      <DigitalMembershipCard 
                        skier={activeSkier}
                        guardianName={currentUser.guardianName}
                        allSkierIds={currentUser.skiers.map(s => ({ id: s.id, name: s.firstName, group: s.groupName }))}
                        onSelectSkier={switchActiveSkier}
                      />
                    </div>

                    {/* Explanatory Info & Partner Quick Action */}
                    <div className="lg:col-span-6 space-y-6">
                      <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200">
                        <span className="text-xs font-bold text-freeskiers-cyan uppercase tracking-wider">
                          Hur kortet fungerar
                        </span>
                        <h3 className="text-xl font-extrabold text-freeskiers-navy tracking-tight mt-1 mb-4">
                          Visa upp kortet i butik eller backe
                        </h3>

                        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                          <div className="flex items-start gap-3">
                            <div className="w-7 h-7 rounded-lg bg-freeskiers-cyan/15 text-freeskiers-cyan flex items-center justify-center shrink-0 font-bold">1</div>
                            <p>
                              <strong>I butiken hos Alpingaraget:</strong> Visa QR-koden i kassan vid betalning så dras din 15% klubbrabatt direkt.
                            </p>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="w-7 h-7 rounded-lg bg-freeskiers-cyan/15 text-freeskiers-cyan flex items-center justify-center shrink-0 font-bold">2</div>
                            <p>
                              <strong>I Ekholmsnäsbacken:</strong> Visa kortet vid köp av säsongskort eller vid inlämning i skidverkstaden för klubbpris.
                            </p>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="w-7 h-7 rounded-lg bg-freeskiers-cyan/15 text-freeskiers-cyan flex items-center justify-center shrink-0 font-bold">3</div>
                            <p>
                              <strong>Spara på hemskärmen:</strong> Klicka på Dela-knappen i din webbläsare (Safari/Chrome) och välj <em>"Lägg till på hemskärmen"</em> så har du alltid kortet till hands som en app.
                            </p>
                          </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-slate-200 flex flex-wrap gap-3">
                          <button
                            onClick={() => setActiveTab('erbjudanden')}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-freeskiers-cyan hover:underline"
                          >
                            <span>Se alla medlemsrabatter & koder</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Quick Details of Active Skier */}
                      <div className="p-6 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs text-slate-700 space-y-2">
                        <div className="font-extrabold text-freeskiers-navy text-sm">
                          Medlemsuppgifter för {activeSkier.firstName}:
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div>Grupp: <strong>{activeSkier.groupName}</strong></div>
                          <div>Medlem sedan: <strong>{activeSkier.memberSince}</strong></div>
                          <div>Försäkring: <strong>Folksam (Aktiv)</strong></div>
                          <div>Säsong: <strong>{activeSkier.season}</strong></div>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {/* TAB 2: MEDLEMSFÖRMÅNER & RABATTER */}
                {activeTab === 'erbjudanden' && (
                  <div>
                    <div className="max-w-2xl mb-8">
                      <span className="text-xs font-bold text-freeskiers-cyan uppercase tracking-wider">
                        Klubbens Samarbetsavtal
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-freeskiers-navy tracking-tight mt-1">
                        Exklusiva Rabatter för Freeskiers-familjer
                      </h3>
                      <p className="text-slate-600 text-sm mt-1">
                        Tack vare klubbens sponsorer och partners har du som medlem tillgång till följande förmåner under säsongen 2026/2027.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {memberOffers.map((offer) => (
                        <div 
                          key={offer.id}
                          className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between"
                        >
                          <div>
                            {/* Partner Header */}
                            <div className="flex items-center justify-between gap-3 mb-4">
                              <div className="h-12 w-28 bg-slate-50 rounded-xl p-2 border border-slate-100 flex items-center justify-center">
                                <img 
                                  src={offer.logo} 
                                  alt={offer.partnerName} 
                                  className="max-h-8 max-w-full object-contain"
                                />
                              </div>
                              <span className="px-2.5 py-1 rounded-full text-xs font-black bg-freeskiers-cyan/15 text-freeskiers-navy border border-freeskiers-cyan/30">
                                {offer.discountBadge}
                              </span>
                            </div>

                            <h4 className="font-extrabold text-base text-freeskiers-navy mb-2 leading-snug">
                              {offer.title}
                            </h4>
                            
                            <p className="text-xs text-slate-600 leading-relaxed mb-4">
                              {offer.shortDesc}
                            </p>

                            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-700 space-y-1 mb-4">
                              <div className="font-bold text-slate-800">Hur du tar del av rabatten:</div>
                              <div>{offer.howToRedeem}</div>
                            </div>
                          </div>

                          {/* Footer with online code or QR instructions */}
                          <div className="pt-4 border-t border-slate-100">
                            {offer.onlineCode ? (
                              <div className="flex items-center justify-between gap-2 bg-sky-50 p-2 rounded-xl border border-sky-200">
                                <div className="text-[11px] font-mono font-bold text-freeskiers-navy px-2">
                                  Kod: <strong>{offer.onlineCode}</strong>
                                </div>
                                <button
                                  onClick={() => handleCopyCode(offer.id, offer.onlineCode!)}
                                  className="inline-flex items-center gap-1 bg-freeskiers-cyan hover:bg-freeskiers-lightcyan text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors shrink-0"
                                >
                                  {copiedCodeId === offer.id ? (
                                    <>
                                      <Check className="w-3 h-3" />
                                      <span>Kopierad!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3" />
                                      <span>Kopiera</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            ) : (
                              <div className="text-[11px] font-semibold text-freeskiers-cyan flex items-center gap-1.5">
                                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                <span>Visa QR-koden på medlemskortet</span>
                              </div>
                            )}
                          </div>

                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 3: MINA TRÄNINGAR & SCHEMA */}
                {activeTab === 'schema' && (
                  <div className="max-w-3xl">
                    <div className="mb-8">
                      <span className="text-xs font-bold text-freeskiers-cyan uppercase tracking-wider">
                        Träningstider & Backen
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-freeskiers-navy tracking-tight mt-1">
                        Schema för {activeSkier.firstName} {activeSkier.lastName}
                      </h3>
                      <p className="text-slate-600 text-sm mt-1">
                        Information om träningsdagar, samlingsplats och tider i Ekholmsnäsbacken under vintern.
                      </p>
                    </div>

                    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
                      
                      <div className="flex items-start gap-4 pb-6 border-b border-slate-100">
                        <div className="w-12 h-12 rounded-2xl bg-sky-50 text-freeskiers-cyan flex items-center justify-center shrink-0">
                          <Clock className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-400 uppercase">Ordinarie Träningstid</div>
                          <div className="text-xl font-black text-freeskiers-navy mt-0.5">
                            {activeSkier.trainingTime || 'Se SportAdmin för exakta tider'}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            Grupp: <strong>{activeSkier.groupName}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 pb-6 border-b border-slate-100">
                        <div className="w-12 h-12 rounded-2xl bg-sky-50 text-freeskiers-cyan flex items-center justify-center shrink-0">
                          <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-400 uppercase">Samlingsplats</div>
                          <div className="text-lg font-bold text-freeskiers-navy mt-0.5">
                            {activeSkier.location || 'Ekholmsnäsbacken, Lidingö'}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            Samling vid klubbflaggan vid knappliften 10 minuter innan passets start.
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
                        <div className="font-bold text-freeskiers-navy flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-freeskiers-cyan" />
                          <span>Obligatorisk Utrustning</span>
                        </div>
                        <p>
                          Godkänd skidhjälm och ryggskydd är ett krav för samtliga åkare. Glöm inte liftkort till Ekholmsnäsbacken (köps via backens kassa/webb).
                        </p>
                      </div>

                    </div>
                  </div>
                )}

                {/* TAB 4: FÖRENINGSINFO & FÖRSÄKRING */}
                {activeTab === 'info' && (
                  <div className="max-w-3xl space-y-8">
                    <div>
                      <span className="text-xs font-bold text-freeskiers-cyan uppercase tracking-wider">
                        Trygghet & Rättigheter
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-freeskiers-navy tracking-tight mt-1">
                        Medlemskap, Försäkring & Fritidskortet
                      </h3>
                      <p className="text-slate-600 text-sm mt-1">
                        Viktig information om ert medlemskap i IK Lidingö Freeskiers.
                      </p>
                    </div>

                    <div className="space-y-4">
                      
                      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card">
                        <div className="flex items-center gap-3 mb-2">
                          <ShieldCheck className="w-6 h-6 text-emerald-600" />
                          <h4 className="font-black text-lg text-freeskiers-navy">
                            Olycksfallsförsäkring via Svenska Skidförbundet & Folksam
                          </h4>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          Som aktiv medlem i IK Lidingö Freeskiers omfattas åkaren av Svenska Skidförbundets gemensamma medlemsförsäkring hos Folksam. Försäkringen gäller under alla organiserade träningar, klubbresor och tävlingar i Sverige.
                        </p>
                      </div>

                      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card">
                        <div className="flex items-center gap-3 mb-2">
                          <Sparkles className="w-6 h-6 text-freeskiers-cyan" />
                          <h4 className="font-black text-lg text-freeskiers-navy">
                            Statliga Fritidskortet
                          </h4>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          Klubben är godkänd förening för Fritidskortet. Du kan tillgodoräkna ditt barns saldo mot medlems- och deltagaravgiften. Kontakta admin@lidingofreeskiers.se om du vill ha hjälp med administrationen.
                        </p>
                      </div>

                      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card">
                        <div className="flex items-center gap-3 mb-2">
                          <FileText className="w-6 h-6 text-slate-600" />
                          <h4 className="font-black text-lg text-freeskiers-navy">
                            Kontakt vid frågor
                          </h4>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          Har du frågor om fakturering, intyg eller medlemsstatus? Skicka ett mejl till <strong>admin@lidingofreeskiers.se</strong> så hjälper styrelsen er.
                        </p>
                      </div>

                    </div>
                  </div>
                )}

              </div>
            )
          )}

        </div>
      </div>

    </div>
  );
};
