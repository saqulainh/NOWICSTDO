import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BrandLogo from './BrandLogo';
import { brand, navLinks } from '../data/content';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [location]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b backdrop-blur-2xl'
          : 'border-b border-transparent'
      }`}
      style={{
        borderColor: scrolled ? 'rgba(52,232,161,0.12)' : 'transparent',
        background: scrolled
          ? 'linear-gradient(145deg, rgba(3,15,9,0.88) 0%, rgba(8,31,18,0.82) 100%)'
          : 'transparent',
      }}
    >
      <div className="container-shell flex h-18 items-center justify-between">

        {/* ── Brand ── */}
        <Link to="/" className="group flex items-center gap-3">
          <div className="relative">
            <BrandLogo
              variant="icon"
              className="h-10 w-10 rounded-xl overflow-hidden ring-mint transition-all duration-300 group-hover:shadow-glow-mint"
              style={{ border: '1px solid rgba(52,232,161,0.25)' }}
            />
            <span
              className="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'rgba(52,232,161,0.08)', filter: 'blur(4px)' }}
            />
          </div>
          <div className="leading-none">
            <p className="font-display text-base font-bold tracking-tight text-text transition-colors group-hover:text-gradient">
              {brand.name}
            </p>
            <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.26em] text-muted">
              {brand.tagline}
            </p>
          </div>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active text-mint' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* ── CTA + Hamburger ── */}
        <div className="flex items-center gap-3">
          <Link to="/contact" className="cta-btn hidden md:inline-flex">
            <span>Start a Project</span>
          </Link>

          <button
            type="button"
            id="mobile-menu-toggle"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 md:hidden"
            style={{
              borderColor: 'rgba(52,232,161,0.22)',
              background: 'rgba(13,46,28,0.5)',
              color: '#34e8a1',
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? 'x' : 'menu'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden md:hidden"
            style={{
              borderTop: '1px solid rgba(52,232,161,0.1)',
              background: 'linear-gradient(145deg, rgba(8,31,18,0.97) 0%, rgba(3,15,9,0.95) 100%)',
              backdropFilter: 'blur(24px)',
            }}
          >
            <div className="container-shell flex flex-col gap-1 py-5">
              {navLinks.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'text-mint bg-mint/8'
                          : 'text-muted hover:text-mint hover:bg-mint/5'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.04, duration: 0.2 }}
                className="mt-3"
              >
                <Link to="/contact" className="cta-btn w-full">
                  <span>Start a Project</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
