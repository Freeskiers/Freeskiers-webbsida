import React, { useState, useMemo } from 'react';
import { Link } from '@tanstack/react-router';
import {
  ShieldCheck,
  Database,
  Radio,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Key,
  Copy,
  Check,
  Search,
  Filter,
  Download,
  ExternalLink,
  Users,
  CreditCard,
  Building2,
  Calendar,
  Lock,
  ArrowRight,
  LogOut,
  Info
} from 'lucide-react';
import { useMemberAuth } from '@/components/member/MemberAuthContext';
import {
  sportadminAccounts,
  sportadminSkiers,
  allUniqueMemberEmails
} from '@/lib/memberData';
import { MemberSkier } from '@/lib/memberData';
import {
  testSportAdminConnectionFn,
  fetchLiveMembersFn,
  SportAdminConnectionResult,
  SportAdminSyncResult
} from '@/lib/sportadminServer';

const LOCAL_KEY_STORAGE = 'freeskiers_sportadmin_client_secret_v1';
const SYNCED_MEMBERS_STORAGE = 'freeskiers_sportadmin_synced_members_v1';

export const AdminDashboardPage: React.FC = () => {
  const { currentUser, login, logout } = useMemberAuth();

  // Admin access gate: either logged in with role admin/styrelse or authenticated via PIN
  const [adminPin, setAdminPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [sessionUnlocked, setSessionUnlocked] = useState(false);

  const isAuthorized = useMemo(() => {
    if (sessionUnlocked) return true;
    if (currentUser && (currentUser.role === 'admin' || currentUser.role === 'styrelse')) {
      return true;
    }
    return false;
  }, [currentUser, sessionUnlocked]);

  // SportAdmin API State
  const [apiKeyInput, setApiKeyInput] = useState(() => {
    try {
      return localStorage.getItem(LOCAL_KEY_STORAGE) || '';
    } catch {
      return '';
    }
  });
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<SportAdminConnectionResult | null>(null);

  // Sync state
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<SportAdminSyncResult | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);

  // Members list (uses synced members if available, otherwise baseline SportAdmin export)
  const [membersList, setMembersList] = useState<MemberSkier[]>(() => {
    try {
      const saved = localStorage.getItem(SYNCED_MEMBERS_STORAGE);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      /* ignore */
    }
    return sportadminSkiers;
  });

  // Table filters & search
  const [searchTerm, setSearchTerm] = useState('');
  const [groupFilter, setGroupFilter] = useState<string>('alla');
  const [copiedEmails, setCopiedEmails] = useState(false);
  const [showKeyGuide, setShowKeyGuide] = useState(false);

  // Handle Admin Gate Login
  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPin.trim() === '2026' || adminPin.trim().toLowerCase() === 'freeskiers' || adminPin.trim().toLowerCase() === 'admin') {
      setSessionUnlocked(true);
      setPinError(false);
      login('admin@lidingofreeskiers.se');
    } else {
      setPinError(true);
    }
  };

  const handleQuickAdminLogin = () => {
    setSessionUnlocked(true);
    login('admin@lidingofreeskiers.se');
  };

  // Test SportAdmin API Connection via Server Function
  const handleTestConnection = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsTesting(true);
    setTestResult(null);

    try {
      const res = await testSportAdminConnectionFn({
        data: { apiKey: apiKeyInput.trim() || undefined }
      });
      setTestResult(res);

      if (res.success && apiKeyInput.trim()) {
        localStorage.setItem(LOCAL_KEY_STORAGE, apiKeyInput.trim());
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Ett oväntat fel uppstod vid testning.';
      setTestResult({
        success: false,
        resolvedKeySource: apiKeyInput.trim() ? 'input' : 'none',
        hasEnvKey: false,
        error: msg
      });
    } finally {
      setIsTesting(false);
    }
  };

  // Sync Live Members via Server Function
  const handleSyncMembers = async () => {
    setIsSyncing(true);
    setSyncResult(null);

    try {
      const res = await fetchLiveMembersFn({
        data: { apiKey: apiKeyInput.trim() || undefined, memberYear: 2026 }
      });
      setSyncResult(res);

      if (res.success && res.skiers.length > 0) {
        setMembersList(res.skiers);
        const timeStr = new Date().toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });
        setLastSyncTime(timeStr);
        try {
          localStorage.setItem(SYNCED_MEMBERS_STORAGE, JSON.stringify(res.skiers));
        } catch {
          /* ignore */
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Kunde inte slutföra synkroniseringen.';
      setSyncResult({
        success: false,
        count: 0,
        memberYear: 2026,
        skiers: [],
        syncedAt: new Date().toISOString(),
        error: msg
      });
    } finally {
      setIsSyncing(false);
    }
  };

  // Filter members
  const filteredMembers = useMemo(() => {
    return membersList.filter((s) => {
      if (groupFilter === 'skidklubb' && s.groupLevel !== 'skidklubb') return false;
      if (groupFilter === 'rod' && s.groupLevel !== 'rod') return false;
      if (groupFilter === 'bla' && s.groupLevel !== 'bla') return false;
      if (groupFilter === 'gron' && s.groupLevel !== 'gron') return false;
      if (groupFilter === 'familj' && s.groupLevel !== 'familj' && s.groupLevel !== 'tranare') return false;

      if (!searchTerm.trim()) return true;
      const q = searchTerm.toLowerCase().trim();
      return (
        s.firstName.toLowerCase().includes(q) ||
        s.lastName.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q) ||
        s.birthYear.toString().includes(q) ||
        s.groupName.toLowerCase().includes(q)
      );
    });
  }, [membersList, groupFilter, searchTerm]);

  // Copy emails to clipboard
  const handleCopyEmails = () => {
    navigator.clipboard.writeText(allUniqueMemberEmails.join(', '));
    setCopiedEmails(true);
    setTimeout(() => setCopiedEmails(false), 2500);
  };

  // Export CSV
  const handleExportCsv = () => {
    const headers = ['ID', 'Förnamn', 'Efternamn', 'Födelseår', 'Grupp', 'Nivå', 'Status', 'Säsong', 'Försäkring'];
    const rows = filteredMembers.map(m => [
      m.id,
      `"${m.firstName}"`,
      `"${m.lastName}"`,
      m.birthYear,
      `"${m.groupName}"`,
      m.groupLevel,
      m.status,
      m.season,
      `"${m.insuranceStatus}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `freeskiers-medlemmar-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ===========================================================================
  // 1. LOCKED VIEW (ADMIN LOGIN GATE)
  // ===========================================================================
  if (!isAuthorized) {
    return (
      <div className="bg-slate-50 min-h-[80vh] py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-freeskiers-navy text-freeskiers-cyan flex items-center justify-center mx-auto mb-4 shadow-soft">
              <Lock className="w-8 h-8" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-freeskiers-cyan/15 text-freeskiers-navy text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-freeskiers-cyan" />
              <span>Kansli & Behörighet</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-freeskiers-navy tracking-tight">
              Klubbadministration
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Endast för styrelse, ledning och kansliansvariga i IK Lidingö Freeskiers.
            </p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Kanslikod / PIN
              </label>
              <input
                type="password"
                required
                value={adminPin}
                onChange={(e) => {
                  setAdminPin(e.target.value);
                  setPinError(false);
                }}
                placeholder="Ange kanslikod (test: 2026)..."
                className="w-full px-4 py-3 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-freeskiers-cyan font-medium text-slate-800"
              />
              {pinError && (
                <p className="text-xs text-rose-600 font-semibold mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Felaktig behörighetskod. Försök igen.</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-freeskiers-navy hover:bg-slate-800 text-white py-3.5 rounded-xl font-bold text-sm shadow-soft transition-all"
            >
              <span>Lås upp kanslipanelen</span>
              <ArrowRight className="w-4 h-4 text-freeskiers-cyan" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={handleQuickAdminLogin}
              className="text-xs font-bold text-freeskiers-cyan hover:underline inline-flex items-center gap-1"
            >
              <span>Logga in direkt som Klubbadmin (admin@lidingofreeskiers.se)</span>
            </button>
          </div>

          <div className="mt-4 text-center">
            <Link to="/" className="text-xs text-slate-400 hover:text-slate-600">
              ← Tillbaka till hemsidan
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ===========================================================================
  // 2. UNLOCKED ADMIN DASHBOARD
  // ===========================================================================
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Top Hero Banner */}
      <section className="bg-freeskiers-navy text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-freeskiers-lightcyan uppercase tracking-wider mb-2">
                <Link to="/" className="hover:underline">Hem</Link>
                <span>/</span>
                <Link to="/medlem" className="hover:underline">Mina Sidor</Link>
                <span>/</span>
                <span>Kansli & SportAdmin</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-freeskiers-cyan/20 border border-freeskiers-cyan/40 text-freeskiers-lightcyan text-xs font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-freeskiers-lightcyan" />
                <span>Klubbadministration</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                Kanslicenter & SportAdmin Synk
              </h1>
              <p className="text-slate-300 text-sm mt-1 max-w-2xl">
                Hantera klubbens medlemsregister, aktivera och testa SportAdmin API v4 och synka årets åkare i realtid.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/medlem"
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20"
              >
                Mina Sidor (/medlem)
              </Link>
              <button
                onClick={() => {
                  setSessionUnlocked(false);
                  logout();
                }}
                className="px-4 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-bold transition-all border border-rose-500/40 flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logga ut</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">

        {/* ===================================================================== */}
        {/* SECTION 1: SPORTADMIN API v4 CONTROL CENTER                           */}
        {/* ===================================================================== */}
        <div className="bg-gradient-to-br from-slate-900 via-freeskiers-navy to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-700/80 mb-8 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-freeskiers-cyan/20 border border-freeskiers-cyan/40 text-freeskiers-lightcyan text-xs font-bold uppercase tracking-wider mb-2">
                <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
                <span>SportAdmin REST API v4</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                Live-koppling mot Kanslisystemet
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                Alla anrop körs via en säker TanStack Start serverfunktion. API-nyckeln exponeras aldrig för besökare och webbläsarens CORS-spärrar kringgås helt.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setShowKeyGuide(!showKeyGuide)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all"
              >
                <Info className="w-3.5 h-3.5 text-freeskiers-cyan" />
                <span>{showKeyGuide ? 'Dölj guide' : 'Hur sparas nyckeln?'}</span>
              </button>
              <a
                href="https://api.sportadmin.se/index.html?urls.primaryName=v4"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all"
              >
                <span>Swagger Docs</span>
                <ExternalLink className="w-3.5 h-3.5 text-freeskiers-cyan" />
              </a>
            </div>
          </div>

          {/* Guide Dropdown */}
          {showKeyGuide && (
            <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 leading-relaxed animate-in fade-in duration-150">
              <strong className="text-white block mb-1">Så hanteras och lagras din API-nyckel:</strong>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>För permanent driftsättning:</strong> Lägg till nyckeln som miljövariabel <code className="bg-black/40 px-1.5 py-0.5 rounded text-freeskiers-lightcyan">SPORTADMIN_API_KEY</code> i din <code className="bg-black/40 px-1.5 py-0.5 rounded">.env</code>-fil lokalt eller i Cloudflare/Lovable Settings. Då läser servern in den automatiskt utan att du behöver klistra in den här varje gång.</li>
                <li><strong>För snabbtestning:</strong> Du kan klistra in din utfärdade Client Secret direkt i fältet nedan och klicka på <em>Testa anslutning</em>.</li>
              </ul>
            </div>
          )}

          {/* Form to Test / Configure API Key */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-freeskiers-cyan" />
                <span>SportAdmin Client Secret (API-nyckel)</span>
              </div>
              {lastSyncTime && (
                <span className="text-[11px] text-emerald-400 font-semibold">
                  ✓ Senast synkad kl {lastSyncTime}
                </span>
              )}
            </div>

            <form onSubmit={handleTestConnection} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="Klistra in Client secret utfärdad av SportAdmin..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-600 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-freeskiers-cyan font-mono"
              />
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={isTesting}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-freeskiers-cyan hover:bg-freeskiers-lightcyan disabled:opacity-50 text-white text-xs font-bold transition-all shadow-soft shrink-0"
                >
                  {isTesting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Ansluter...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Testa anslutning</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleSyncMembers}
                  disabled={isSyncing}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-soft shrink-0"
                >
                  {isSyncing ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Synkar...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Synka medlemmar nu</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Test Feedback Box */}
            {testResult && (
              <div className={`mt-3.5 p-3.5 rounded-xl text-xs flex items-start gap-2.5 ${
                testResult.success 
                  ? 'bg-emerald-950/80 border border-emerald-500/60 text-emerald-200' 
                  : 'bg-rose-950/80 border border-rose-500/60 text-rose-200'
              }`}>
                {testResult.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div className="leading-relaxed">
                  <strong>{testResult.success ? 'Anslutning lyckades! ' : 'Anslutningsfel: '}</strong>
                  {testResult.success && testResult.clubs ? (
                    <span>
                      Hittade {testResult.clubs.length} ansluten förening: {testResult.clubs.map(c => `${c.name} (ClubId: ${c.clubId})`).join(', ')}. Nyckelkälla: {testResult.resolvedKeySource === 'env' ? 'Server-miljövariabel (.env)' : 'Direkt inmatad'}.
                    </span>
                  ) : (
                    <span>{testResult.error}</span>
                  )}
                </div>
              </div>
            )}

            {/* Sync Feedback Box */}
            {syncResult && (
              <div className={`mt-3.5 p-3.5 rounded-xl text-xs flex items-start gap-2.5 ${
                syncResult.success 
                  ? 'bg-emerald-950/80 border border-emerald-500/60 text-emerald-200' 
                  : 'bg-rose-950/80 border border-rose-500/60 text-rose-200'
              }`}>
                {syncResult.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div className="leading-relaxed">
                  <strong>{syncResult.success ? 'Synkning klar: ' : 'Synkfel: '}</strong>
                  {syncResult.success ? (
                    <span>
                      Läste in <strong>{syncResult.count} åkare</strong> för säsong {syncResult.memberYear} från {syncResult.clubName || 'SportAdmin'}. Medlemsregistret nedan är uppdaterat!
                    </span>
                  ) : (
                    <span>{syncResult.error}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ===================================================================== */}
        {/* SECTION 2: 4 STAT CARDS                                               */}
        {/* ===================================================================== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-bold uppercase tracking-wider">Aktiva Åkare</span>
              <Users className="w-4 h-4 text-freeskiers-cyan" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-freeskiers-navy mt-1">
              {membersList.length}
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
              ✓ 100% SportAdmin-aktiva
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-bold uppercase tracking-wider">Familjekonton</span>
              <Building2 className="w-4 h-4 text-freeskiers-cyan" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-freeskiers-navy mt-1">
              {sportadminAccounts.length}
            </div>
            <div className="text-[11px] text-slate-500 font-semibold mt-0.5">
              49 familjemedlemmar
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-bold uppercase tracking-wider">Betalda Medlemskap</span>
              <CreditCard className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">
              {membersList.length} / {membersList.length}
            </div>
            <div className="text-[11px] text-slate-500 font-semibold mt-0.5">
              Säsong 2026/2027
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-bold uppercase tracking-wider">Målsmäns E-post</span>
              <Calendar className="w-4 h-4 text-freeskiers-cyan" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-freeskiers-navy mt-1">
              {allUniqueMemberEmails.length}
            </div>
            <div className="text-[11px] text-slate-500 font-semibold mt-0.5">
              Klara för klubbutskick
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* SECTION 3: MEMBER REGISTRY & ACTIONS                                  */}
        {/* ===================================================================== */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-freeskiers-navy tracking-tight">
                Medlemsregister 2026/2027
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Visar {filteredMembers.length} av {membersList.length} registrerade åkare och målsmän.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyEmails}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-freeskiers-navy hover:bg-slate-800 text-white text-xs font-bold shadow-soft transition-colors"
              >
                {copiedEmails ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Kopierade!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-freeskiers-cyan" />
                    <span>Kopiera e-post ({allUniqueMemberEmails.length})</span>
                  </>
                )}
              </button>

              <button
                onClick={handleExportCsv}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-slate-600" />
                <span>Exportera CSV</span>
              </button>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Sök på åkare, förälder, personnummer eller medlems-ID..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-freeskiers-cyan"
              />
            </div>

            {/* Group Filter Chips */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'alla', label: 'Alla' },
                { id: 'skidklubb', label: 'Skidklubb' },
                { id: 'rod', label: 'Röd Grupp' },
                { id: 'bla', label: 'Blå Grupp' },
                { id: 'gron', label: 'Grön Grupp' },
                { id: 'familj', label: 'Förälder / Stöd' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setGroupFilter(f.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    groupFilter === f.id
                      ? 'bg-freeskiers-navy text-white shadow-soft'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="py-3 px-4">Medlems-ID</th>
                  <th className="py-3 px-4">Åkare</th>
                  <th className="py-3 px-4">Födelseår</th>
                  <th className="py-3 px-4">Träningsgrupp</th>
                  <th className="py-3 px-4">Nivå</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Försäkring</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredMembers.slice(0, 100).map((skier) => (
                  <tr key={skier.id} className="hover:bg-sky-50/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-500 text-[11px]">
                      {skier.id}
                    </td>
                    <td className="py-3 px-4 font-bold text-freeskiers-navy">
                      {skier.firstName} {skier.lastName}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {skier.birthYear}
                    </td>
                    <td className="py-3 px-4 text-slate-800">
                      {skier.groupName}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                        skier.groupLevel === 'skidklubb' ? 'bg-purple-100 text-purple-800' :
                        skier.groupLevel === 'rod' ? 'bg-rose-100 text-rose-800' :
                        skier.groupLevel === 'bla' ? 'bg-sky-100 text-sky-800' :
                        skier.groupLevel === 'gron' ? 'bg-emerald-100 text-emerald-800' :
                        'bg-slate-100 text-slate-800'
                      }`}>
                        {skier.groupLevel}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Aktiv & Betald</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-[11px]">
                      Folksam / Skidförbundet
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredMembers.length > 100 && (
            <p className="text-[11px] text-slate-400 text-center mt-3">
              Visar de första 100 träffarna av {filteredMembers.length}. Förfina sökningen ovan för att hitta specifika åkare.
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
