import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { EkisYetiChat } from './components/EkisYetiChat';
import { HomePage } from './pages/HomePage';
import { HelgskidskolaPage } from './pages/HelgskidskolaPage';
import { SkidklubbPage } from './pages/SkidklubbPage';
import { HosasongPage } from './pages/HosasongPage';
import { PrivatlektionPage } from './pages/PrivatlektionPage';
import { OmOssPage } from './pages/OmOssPage';
import { KontaktPage } from './pages/KontaktPage';

import { LevelFinderProvider } from './context/LevelFinderContext';
import { MemberAuthProvider } from './context/MemberAuthContext';
import { RookieSeriesPage } from './pages/RookieSeriesPage';
import { SponsorPage } from './pages/SponsorPage';
import { KalenderPage } from './pages/KalenderPage';
import { MedlemPortalPage } from './pages/MedlemPortalPage';
import { VerifieraMedlemPage } from './pages/VerifieraMedlemPage';

// Scroll to top on page navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <MemberAuthProvider>
        <LevelFinderProvider>
          <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/helgskidskola" element={<HelgskidskolaPage />} />
                <Route path="/skidklubb" element={<SkidklubbPage />} />
                <Route path="/kalender" element={<KalenderPage />} />
                <Route path="/medlem" element={<MedlemPortalPage />} />
                <Route path="/verifiera" element={<VerifieraMedlemPage />} />
                <Route path="/hostsasong" element={<HosasongPage />} />
                <Route path="/privatlektion" element={<PrivatlektionPage />} />
                <Route path="/rookie-series" element={<RookieSeriesPage />} />
                <Route path="/sponsor" element={<SponsorPage />} />
                <Route path="/om-oss" element={<OmOssPage />} />
                <Route path="/kontakt" element={<KontaktPage />} />
                <Route path="*" element={<HomePage />} />
              </Routes>
            </main>
            <Footer />
            <EkisYetiChat />
          </div>
        </LevelFinderProvider>
      </MemberAuthProvider>
    </Router>
  );
};

export default App;
