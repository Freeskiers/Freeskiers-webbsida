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
  Smartphone,
  Search,
  Database,
  Filter,
  Radio,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Key
} from 'lucide-react';
import { useMemberAuth } from './MemberAuthContext';
import { DigitalMembershipCard } from './DigitalMembershipCard';
import { memberOffers, MemberOffer } from '@/lib/memberOffers';
import { 
  sportadminAccounts, 
  sportadminSkiers, 
  allUniqueMemberEmails 
} from '@/lib/memberData';
import { 
  testSportAdminConnection, 
  SPORTADMIN_BASE_URL 
} from '@/lib/sportadminApi';

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
  const [activeTab, setActiveTab] = useState<'kort' | 'erbjudanden' | 'schema' | 'info' | 'admin'>('kort');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [memberSearch, setMemberSearch] = useState('');
  const [showMemberBrowser, setShowMemberBrowser] = useState(false);
  const [adminGroupFilter, setAdminGroupFilter] = useState<string>('alla');
  const [adminSearchTerm, setAdminSearchTerm] = useState<string>('');
  const [copiedEmails, setCopiedEmails] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [apiTesting, setApiTesting] = useState(false);
  const [apiTestResult, setApiTestResult] = useState<{
    success: boolean;
    message: string;
    clubs?: { clubId: number; name: string }[];
  } | null>(null);

  const handleTestApi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKeyInput.trim()) return;
    setApiTesting(true);
    setApiTestResult(null);

    const res = await testSportAdminConnection(apiKeyInput);
    setApiTesting(false);

    if (res.success && res.clubs) {
      setApiTestResult({
        success: true,
        message: `Anslutning lyckades! Hittade ${res.clubs.length} ansluten förening: ${res.clubs.map(c => `${c.name} (ClubId: ${c.clubId})`).join(', ')}`,
        clubs: res.clubs
      });
    } else {
      setApiTestResult({
        success: false,
        message: res.error || 'Kunde inte ansluta till SportAdmin API v4.'
      });
    }
  };

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

  const handleCopyAllEmails = () => {
    navigator.clipboard.writeText(allUniqueMemberEmails.join(', '));
    setCopiedEmails(true);
    setTimeout(() => setCopiedEmails(false), 2500);
  };

  const handleInspectMember = (email: string) => {
    login(email);
    setActiveTab('kort');
  };

  const filteredAdminSkiers = React.useMemo(() => {
    return sportadminSkiers.filter((s) => {
      // Group filter
      if (adminGroupFilter === 'skidklubb' && s.groupLevel !== 'skidklubb') return false;
      if (adminGroupFilter === 'rod' && s.groupLevel !== 'rod') return false;
      if (adminGroupFilter === 'bla' && s.groupLevel !== 'bla') return false;
      if (adminGroupFilter === 'gron' && s.groupLevel !== 'gron') return false;
      if (adminGroupFilter === 'familj' && s.groupLevel !== 'familj' && s.groupLevel !== 'tranare') return false;

      // Search term
      if (!adminSearchTerm.trim()) return true;
      const q = adminSearchTerm.toLowerCase().trim();
      return (
        s.firstName.toLowerCase().includes(q) ||
        s.lastName.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q) ||
        s.guardianName.toLowerCase().includes(q) ||
        s.guardianEmail.toLowerCase().includes(q) ||
        s.guardianPhone.toLowerCase().includes(q)
      );
    });
  }, [adminGroupFilter, adminSearchTerm]);

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

                {/* SportAdmin Real Data Status Banner */}
                <div className="mb-6 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-start gap-3 text-xs text-emerald-950">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0 animate-pulse" />
                  <div className="leading-snug">
                    <span className="font-bold text-emerald-900 block">
                      164 aktiva SportAdmin-medlemmar inlästa (2026/2027)
                    </span>
                    <span className="text-slate-600 text-[11px]">
                      Ange den e-postadress du använde vid klubbanmälan för att logga in direkt, eller välj ett snabbval nedan.
                    </span>
                  </div>
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
                          list="sportadmin-email-list"
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          placeholder="namn@epost.se (samma som i SportAdmin)"
                          className="w-full pl-11 pr-4 py-3 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-freeskiers-cyan font-medium text-slate-800"
                        />
                        <datalist id="sportadmin-email-list">
                          {sportadminAccounts.map((a) => (
                            <option key={a.email} value={a.email}>
                              {a.guardianName} ({a.skiers.map(s => s.firstName).join(', ')})
                            </option>
                          ))}
                        </datalist>
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
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Snabbval för att testa:
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowMemberBrowser(!showMemberBrowser)}
                      className="text-[11px] font-bold text-freeskiers-cyan hover:underline inline-flex items-center gap-1"
                    >
                      <Search className="w-3 h-3" />
                      <span>{showMemberBrowser ? 'Dölj sök' : 'Sök bland alla 164'}</span>
                    </button>
                  </div>

                  {/* Search Browser for all 164 SportAdmin members */}
                  {showMemberBrowser && (
                    <div className="mb-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 animate-in fade-in duration-150">
                      <div className="relative mb-2.5">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          value={memberSearch}
                          onChange={(e) => setMemberSearch(e.target.value)}
                          placeholder="Sök på efternamn, förnamn eller e-post..."
                          className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-freeskiers-cyan"
                        />
                      </div>
                      <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                        {sportadminAccounts
                          .filter((acc) => {
                            if (!memberSearch.trim()) return true;
                            const q = memberSearch.toLowerCase().trim();
                            return (
                              acc.guardianName.toLowerCase().includes(q) ||
                              acc.email.toLowerCase().includes(q) ||
                              acc.skiers.some((s) => `${s.firstName} ${s.lastName}`.toLowerCase().includes(q))
                            );
                          })
                          .slice(0, 12)
                          .map((acc) => (
                            <button
                              key={acc.email}
                              type="button"
                              onClick={() => handleDemoLogin(acc.email)}
                              className="w-full text-left p-2 rounded-lg bg-white border border-slate-200 hover:border-freeskiers-cyan hover:bg-sky-50/50 flex items-center justify-between text-xs transition-colors"
                            >
                              <div className="truncate pr-2">
                                <span className="font-bold text-slate-800">{acc.guardianName}</span>
                                <span className="text-[10px] text-slate-500 block truncate">
                                  {acc.skiers.map((s) => s.firstName).join(', ')} ({acc.skiers.length} åkare) • {acc.email}
                                </span>
                              </div>
                              <span className="text-[10px] font-bold text-freeskiers-cyan shrink-0">
                                Välj →
                              </span>
                            </button>
                          ))}
                      </div>
                    </div>
                  )}

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

                  {(currentUser.role === 'admin' || currentUser.role === 'styrelse') && (
                    <button
                      onClick={() => setActiveTab('admin')}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
                        activeTab === 'admin'
                          ? 'bg-rose-700 text-white shadow-soft'
                          : 'text-rose-700 hover:bg-rose-50 border border-rose-200'
                      }`}
                    >
                      <Database className="w-4 h-4 text-rose-500" />
                      <span>Kansli & Medlemsregister</span>
                      <span className="text-[10px] bg-rose-600 text-white px-1.5 py-0.5 rounded-full font-black">
                        164
                      </span>
                    </button>
                  )}
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
                      <div className="p-6 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs text-slate-700 space-y-3">
                        <div className="font-extrabold text-freeskiers-navy text-sm flex items-center justify-between">
                          <span>Medlemsuppgifter för {activeSkier.firstName}:</span>
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-300/60 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                            <span>SportAdmin Bekräftad</span>
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div>Grupp: <strong>{activeSkier.groupName}</strong></div>
                          <div>Födelseår: <strong>{activeSkier.birthYear}</strong></div>
                          <div>Medlem sedan: <strong>{activeSkier.memberSince}</strong></div>
                          <div>Medlemsavgift: <strong className="text-emerald-700">✓ Betald ({activeSkier.paymentDate || '2026/2027'})</strong></div>
                          <div>Försäkring: <strong>Folksam (Aktiv)</strong></div>
                          <div>Säsong: <strong>{activeSkier.season}</strong></div>
                          {activeSkier.allergy && (
                            <div className="col-span-2 text-amber-900 bg-amber-50/90 p-2 rounded-xl border border-amber-200">
                              Allergi / Specialkost: <strong>{activeSkier.allergy}</strong>
                            </div>
                          )}
                          {currentUser.alternateEmails && currentUser.alternateEmails.length > 0 && (
                            <div className="col-span-2 text-slate-500 pt-1 text-[10px]">
                              Kopplade familjekonton: {currentUser.alternateEmails.join(', ')}
                            </div>
                          )}
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

                {/* TAB 5: KANSLI & MEDLEMSREGISTER (ADMIN / STYRELSE) */}
                {activeTab === 'admin' && (
                  <div className="space-y-8 animate-in fade-in duration-200">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold uppercase tracking-wider mb-2">
                          <Database className="w-3.5 h-3.5" />
                          <span>Kansli & Styrelsevy</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-black text-freeskiers-navy tracking-tight">
                          Medlemsregister 2026/2027
                        </h3>
                        <p className="text-slate-600 text-xs sm:text-sm mt-1">
                          Fullständig översikt över klubbens 164 aktiva åkare, föräldrakontakter, grupper och betalstatus från SportAdmin.
                        </p>
                      </div>

                      <div className="flex items-center gap-2 self-start md:self-auto">
                        <button
                          onClick={handleCopyAllEmails}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-freeskiers-navy hover:bg-slate-800 text-white text-xs font-bold shadow-soft transition-colors"
                        >
                          {copiedEmails ? (
                            <>
                              <Check className="w-4 h-4 text-emerald-400" />
                              <span>{allUniqueMemberEmails.length} e-poster kopierade!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 text-freeskiers-cyan" />
                              <span>Kopiera e-postlista ({allUniqueMemberEmails.length})</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* 4 Stat Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Aktiva Åkare</div>
                        <div className="text-2xl sm:text-3xl font-black text-freeskiers-navy mt-1">164</div>
                        <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">✓ 100% SportAdmin-aktiva</div>
                      </div>
                      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Familjekonton</div>
                        <div className="text-2xl sm:text-3xl font-black text-freeskiers-navy mt-1">13</div>
                        <div className="text-[11px] text-slate-500 font-semibold mt-0.5">49 familjemedlemmar</div>
                      </div>
                      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Betalda Medlemskap</div>
                        <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">164 / 164</div>
                        <div className="text-[11px] text-slate-500 font-semibold mt-0.5">Bekräftade 4–8 okt 2026</div>
                      </div>
                      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Kontaktpersoner</div>
                        <div className="text-2xl sm:text-3xl font-black text-freeskiers-navy mt-1">{allUniqueMemberEmails.length}</div>
                        <div className="text-[11px] text-sky-600 font-semibold mt-0.5">Unika e-postadresser</div>
                      </div>
                    </div>

                    {/* SportAdmin API v4 Live Integration Panel */}
                    <div className="bg-gradient-to-br from-slate-900 to-freeskiers-navy text-white p-6 sm:p-8 rounded-3xl shadow-card border border-slate-700">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-freeskiers-cyan/20 text-freeskiers-lightcyan text-[11px] font-bold border border-freeskiers-cyan/30">
                              <Radio className="w-3 h-3 animate-pulse text-emerald-400" />
                              <span>SportAdmin API v4</span>
                            </span>
                            <span className="text-xs text-slate-400">Officiell OpenAPI 3.0-specifikation</span>
                          </div>
                          <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                            Direktkoppling & Live-synkronisering
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                            Webbplatsen läser just nu in klubbens medlemsregister via den exporterade SportAdmin-databasen (164 aktiva åkare). Du kan även ansluta live via SportAdmins v4 REST API för automatisk realtidssynk.
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <a
                            href="https://api.sportadmin.se/index.html?urls.primaryName=v4"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all backdrop-blur-sm shadow-soft"
                          >
                            <span>Swagger API v4 Docs</span>
                            <ExternalLink className="w-3.5 h-3.5 text-freeskiers-cyan" />
                          </a>
                        </div>
                      </div>

                      {/* API Key Tester */}
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm mb-6">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                          <Key className="w-3.5 h-3.5 text-freeskiers-cyan" />
                          <span>Testa SportAdmin Client Secret (API-nyckel)</span>
                        </div>
                        <form onSubmit={handleTestApi} className="flex flex-col sm:flex-row gap-3">
                          <input
                            type="text"
                            value={apiKeyInput}
                            onChange={(e) => setApiKeyInput(e.target.value)}
                            placeholder="Klistra in Client secret utfärdad av SportAdmin..."
                            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-600 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-freeskiers-cyan font-mono"
                          />
                          <button
                            type="submit"
                            disabled={apiTesting || !apiKeyInput.trim()}
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-freeskiers-cyan hover:bg-freeskiers-lightcyan disabled:opacity-50 text-white text-xs font-bold transition-all shadow-soft shrink-0"
                          >
                            {apiTesting ? (
                              <>
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                <span>Ansluter...</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Testa koppling</span>
                              </>
                            )}
                          </button>
                        </form>

                        {apiTestResult && (
                          <div className={`mt-3 p-3.5 rounded-xl text-xs flex items-start gap-2.5 ${
                            apiTestResult.success 
                              ? 'bg-emerald-950/80 border border-emerald-500/60 text-emerald-200' 
                              : 'bg-rose-950/80 border border-rose-500/60 text-rose-200'
                          }`}>
                            {apiTestResult.success ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                            )}
                            <div className="leading-relaxed">
                              <strong>{apiTestResult.success ? 'Succé: ' : 'Anslutningsfel: '}</strong>
                              {apiTestResult.message}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 3 Core Endpoints Explanation */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                          <div className="font-mono text-freeskiers-lightcyan font-bold text-[11px] mb-1">
                            GET /v4/Membership
                          </div>
                          <div className="font-extrabold text-white mb-1">Medlemskort & Verifiering</div>
                          <p className="text-slate-300 text-[11px] leading-relaxed">
                            Slår upp medlemmar direkt på e-post, returnerar giltighetstid, åkare och partnererbjudanden vid inloggning.
                          </p>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                          <div className="font-mono text-freeskiers-lightcyan font-bold text-[11px] mb-1">
                            GET /v4/Persons
                          </div>
                          <div className="font-extrabold text-white mb-1">Fullständigt Register</div>
                          <p className="text-slate-300 text-[11px] leading-relaxed">
                            Hämtar alla klubbens åkare, målsmän, kontaktuppgifter, grupper och bekräftade betalningsdatum (<span className="font-mono">paidMembershipAtUtc</span>).
                          </p>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                          <div className="font-mono text-freeskiers-lightcyan font-bold text-[11px] mb-1">
                            GET /v4/Activities
                          </div>
                          <div className="font-extrabold text-white mb-1">Träningar & Kalender</div>
                          <p className="text-slate-300 text-[11px] leading-relaxed">
                            Hämtar gruppers schemalagda träningstider och klubbaktiviteter direkt in i klubbkalendern och på "Mina sidor".
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-400 gap-2">
                        <span>Beställ Client Secret från SportAdmin: Kontakta kanslisupport via <strong>support@sportadmin.se</strong>.</span>
                        <span className="text-emerald-400 font-bold">Autentisering: Authorization-header</span>
                      </div>
                    </div>

                    {/* Filters & Search */}
                    <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-card space-y-4">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                          <input
                            type="text"
                            value={adminSearchTerm}
                            onChange={(e) => setAdminSearchTerm(e.target.value)}
                            placeholder="Sök på åkare, förälder, e-post, telefon eller ID..."
                            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-freeskiers-cyan font-medium"
                          />
                        </div>
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                          {[
                            { id: 'alla', label: 'Alla (164)' },
                            { id: 'skidklubb', label: 'Skidklubb' },
                            { id: 'rod', label: 'Skidskola Röd' },
                            { id: 'bla', label: 'Skidskola Blå' },
                            { id: 'gron', label: 'Skidskola Grön' },
                            { id: 'familj', label: 'Vuxna' }
                          ].map(f => (
                            <button
                              key={f.id}
                              onClick={() => setAdminGroupFilter(f.id)}
                              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                                adminGroupFilter === f.id
                                  ? 'bg-freeskiers-navy text-white shadow-soft'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              {f.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Skier Count summary */}
                      <div className="text-xs text-slate-500 font-medium flex items-center justify-between border-t border-slate-100 pt-3">
                        <span>Visar {filteredAdminSkiers.length} av 164 medlemmar</span>
                        <span className="text-[11px] text-slate-400">Sorterat efter SportAdmin-ordning</span>
                      </div>

                      {/* Skier table */}
                      <div className="overflow-x-auto rounded-2xl border border-slate-200">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                            <tr>
                              <th className="py-3 px-4">Åkare</th>
                              <th className="py-3 px-4">Född</th>
                              <th className="py-3 px-4">Grupp</th>
                              <th className="py-3 px-4">Målsman & Kontakt</th>
                              <th className="py-3 px-4">Avgift</th>
                              <th className="py-3 px-4">Allergi</th>
                              <th className="py-3 px-4 text-right">Kort</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {filteredAdminSkiers.map((s) => (
                              <tr key={s.id} className="hover:bg-sky-50/40 transition-colors">
                                <td className="py-3 px-4">
                                  <div className="font-extrabold text-freeskiers-navy">{s.firstName} {s.lastName}</div>
                                  <div className="font-mono text-[10px] text-slate-400">{s.id}</div>
                                </td>
                                <td className="py-3 px-4 font-semibold text-slate-600">{s.birthYear}</td>
                                <td className="py-3 px-4">
                                  <span className="font-bold text-slate-700">{s.groupName}</span>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="font-bold text-slate-800">{s.guardianName}</div>
                                  <div className="text-[11px] text-slate-500">{s.guardianPhone} • {s.guardianEmail}</div>
                                </td>
                                <td className="py-3 px-4">
                                  <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 text-[10px]">
                                    <Check className="w-3 h-3" />
                                    <span>Betald</span>
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  {s.allergy ? (
                                    <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 text-[10px]">
                                      {s.allergy}
                                    </span>
                                  ) : (
                                    <span className="text-slate-300">-</span>
                                  )}
                                </td>
                                <td className="py-3 px-4 text-right">
                                  <button
                                    onClick={() => handleInspectMember(s.guardianEmail)}
                                    className="text-freeskiers-cyan hover:underline font-bold text-[11px] whitespace-nowrap"
                                  >
                                    Visa kort →
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
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
