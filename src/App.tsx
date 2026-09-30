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
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/helgskidskola" element={<HelgskidskolaPage />} />
            <Route path="/skidklubb" element={<SkidklubbPage />} />
            <Route path="/hostsasong" element={<HosasongPage />} />
            <Route path="/privatlektion" element={<PrivatlektionPage />} />
            <Route path="/om-oss" element={<OmOssPage />} />
            <Route path="/kontakt" element={<KontaktPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
        <EkisYetiChat />
      </div>
    </Router>
  );
};

export default App;
