import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Twitter, ArrowUpRight } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { brand, navLinks } from '../data/content';

const socials = [
  { icon: Mail,     href: `mailto:${brand.email}`,   label: 'Email',    id: 'footer-email' },
  { icon: Github,   href: '#',                        label: 'GitHub',   id: 'footer-github' },
  { icon: Linkedin, href: '#',                        label: 'LinkedIn', id: 'footer-linkedin' },
  { icon: Twitter,  href: '#',                        label: 'Twitter',  id: 'footer-twitter' },
];

export default function Footer() {
  return (
    <footer
      className="relative mt-20 overflow-hidden"
      style={{
        borderTop: '1px solid rgba(52,232,161,0.1)',
        background: 'linear-gradient(145deg, #031810 0%, #030f09 100%)',
      }}
    >
      {/* Glow top border */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(52,232,161,0.35), transparent)' }}
      />

      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 100%, rgba(52,232,161,0.06), transparent 60%)' }}
      />

      <div className="container-shell relative py-14">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">

          {/* Brand col */}
          <div>
            <Link to="/" className="group flex items-center gap-3">
              <BrandLogo
                variant="full"
                className="h-12 w-12 rounded-2xl overflow-hidden"
                style={{ border: '1px solid rgba(52,232,161,0.25)' }}
              />
              <div>
                <p className="font-display text-lg font-bold text-text">{brand.name}</p>
                <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-muted">{brand.tagline}</p>
              </div>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              Premium software agency delivering MVPs, AI apps, and digital products that scale — fast.
            </p>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label, id }) => (
                <a
                  key={label}
                  id={id}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200"
                  style={{
                    background: 'rgba(52,232,161,0.07)',
                    border: '1px solid rgba(52,232,161,0.15)',
                    color: '#7db89a',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(52,232,161,0.15)';
                    e.currentTarget.style.borderColor = 'rgba(52,232,161,0.38)';
                    e.currentTarget.style.color = '#34e8a1';
                    e.currentTarget.style.boxShadow = '0 0 16px rgba(52,232,161,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(52,232,161,0.07)';
                    e.currentTarget.style.borderColor = 'rgba(52,232,161,0.15)';
                    e.currentTarget.style.color = '#7db89a';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="mb-4 text-2xs font-bold uppercase tracking-[0.25em] text-mint">Navigation</p>
            <ul className="space-y-2.5">
              {navLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm text-muted transition-colors duration-200 hover:text-mint"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="mb-4 text-2xs font-bold uppercase tracking-[0.25em] text-mint">Services</p>
            <ul className="space-y-2.5">
              {['MVP Development', 'Business Websites', 'AI Web Apps', 'Admin Dashboards', 'SaaS Platforms'].map((s) => (
                <li key={s}>
                  <Link to="/services" className="text-sm text-muted transition-colors duration-200 hover:text-mint">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-4 text-2xs font-bold uppercase tracking-[0.25em] text-mint">Contact</p>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${brand.email}`} className="text-sm text-muted transition-colors hover:text-mint">
                  {brand.email}
                </a>
              </li>
              <li>
                <a href={`tel:${brand.phone}`} className="text-sm text-muted transition-colors hover:text-mint">
                  {brand.phone}
                </a>
              </li>
              <li className="text-sm text-muted">{brand.location}</li>
            </ul>

            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-mint hover:text-glow transition-colors"
            >
              Start a Project <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t pt-7 text-xs text-muted"
          style={{ borderColor: 'rgba(52,232,161,0.08)' }}
        >
          <p>© {new Date().getFullYear()} Nowic Studio. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with{' '}
            <span className="text-mint">♥</span>
            {' '}in India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}
