import {
  Bot,
  Building2,
  LayoutDashboard,
  Rocket,
  Gauge,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';

export const brand = {
  name: 'Nowic Studio',
  tagline: 'Vision to Version',
  logoPrimary: '/image.png',
  logoFallback: '/nowic-logo.svg'
};

export const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' }
];

export const services = [
  {
    icon: Rocket,
    title: 'MVP Development',
    headline: 'Turn Ideas Into Products',
    description: 'Validate, launch, and scale - fast.'
  },
  {
    icon: Building2,
    title: 'Business Websites',
    headline: 'Your Digital Home',
    description: 'Professional websites that drive growth.'
  },
  {
    icon: Bot,
    title: 'AI Web Apps',
    headline: 'Intelligence Built-In',
    description: 'Chatbots, smart dashboards, AI assistants.'
  },
  {
    icon: LayoutDashboard,
    title: 'Admin Dashboards',
    headline: 'Complete Control',
    description: 'CRM, analytics, management systems.'
  }
];

export const stats = [
  { icon: Gauge, label: 'Fast Deployment', value: '7-21 Days' },
  { icon: Sparkles, label: 'Premium UI', value: 'Startup-Grade' },
  { icon: Cpu, label: 'AI-Powered Development', value: 'Automation-First' },
  { icon: Layers, label: 'Scalable Architecture', value: 'Future-Ready' },
  { icon: ShieldCheck, label: 'Zero Fluff Execution', value: 'Outcome Focused' }
];

export const portfolioItems = [
  {
    title: 'Event Ticket Booking System',
    description:
      'A complete booking platform with event discovery, dynamic seat management, and payment workflows.',
    tags: ['React', 'Node', 'Payments']
  },
  {
    title: 'Catering Services Website',
    description:
      'A conversion-focused business site with quote requests, menu showcases, and admin content control.',
    tags: ['Business Site', 'SEO', 'CMS']
  },
  {
    title: 'Siya AI',
    description:
      'An AI assistant platform with custom workflows, internal knowledge search, and role-based access.',
    tags: ['LLM', 'Dashboards', 'Automation']
  }
];
