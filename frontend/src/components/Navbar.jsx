import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BrandLogo from './BrandLogo';
import { brand, navLinks } from '../data/content';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#051517]/70 backdrop-blur-xl">
      <div className="container-shell flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <BrandLogo
            variant="icon"
            className="h-10 w-10 rounded-xl border border-mint/30 bg-[#07292d]"
          />
          <div className="leading-none">
            <p className="font-display text-lg font-bold tracking-wide text-text">{brand.name}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-text/60">{brand.tagline}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'text-mint' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link to="/contact" className="cta-btn">
            Launch Your Project
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg border border-white/15 p-2 text-text md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="border-t border-white/10 bg-[#081c1f] md:hidden"
          >
            <div className="container-shell flex flex-col gap-3 py-4">
              {navLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className="nav-link py-2"
                >
                  {item.label}
                </NavLink>
              ))}
              <Link to="/contact" onClick={() => setOpen(false)} className="cta-btn mt-2">
                Launch Your Project
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
