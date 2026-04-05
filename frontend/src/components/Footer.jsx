import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { brand } from '../data/content';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#041214]">
      <div className="container-shell py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex items-start gap-3">
            <BrandLogo
              variant="full"
              className="mt-0.5 h-14 w-14 rounded-2xl border border-mint/25 bg-[#07292d] p-1.5"
            />
            <div>
              <p className="font-display text-xl font-bold text-text">{brand.name}</p>
              <p className="mt-2 text-sm uppercase tracking-[0.16em] text-text/65">{brand.tagline}.</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-text/70">Quick Links</p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-text/80">
              <Link to="/">Home</Link>
              <Link to="/services">Services</Link>
              <Link to="/portfolio">Portfolio</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-text/70">Connect</p>
            <div className="mt-3 flex items-center gap-4 text-text/85">
              <a href="mailto:hello@nowicstudio.com" aria-label="email">
                <Mail size={18} />
              </a>
              <a href="#" aria-label="github">
                <Github size={18} />
              </a>
              <a href="#" aria-label="linkedin">
                <Linkedin size={18} />
              </a>
            </div>
            <p className="mt-3 text-sm text-text/65">hello@nowicstudio.com</p>
          </div>
        </div>

        <p className="mt-10 text-xs text-text/45">
          © {new Date().getFullYear()} Nowic Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
