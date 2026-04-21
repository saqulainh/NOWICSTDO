import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import SmoothScroll from './components/common/SmoothScroll';
import CustomCursor from './components/ui/CustomCursor';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Contact from './pages/Contact';

/* Admin */
import AdminLayout from './layouts/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import BrandEditor from './pages/admin/BrandEditor';
import ServicesEditor from './pages/admin/ServicesEditor';
import PortfolioEditor from './pages/admin/PortfolioEditor';
import StatsEditor from './pages/admin/StatsEditor';
import AboutEditor from './pages/admin/AboutEditor';
import FAQEditor from './pages/admin/FAQEditor';

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <SmoothScroll />}
      {!isAdmin && <CustomCursor />}
      <Routes>
        {/* Public site */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Admin CMS */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="brand" element={<BrandEditor />} />
          <Route path="services" element={<ServicesEditor />} />
          <Route path="portfolio" element={<PortfolioEditor />} />
          <Route path="stats" element={<StatsEditor />} />
          <Route path="about" element={<AboutEditor />} />
          <Route path="faqs" element={<FAQEditor />} />
        </Route>
      </Routes>
    </>
  );
}
