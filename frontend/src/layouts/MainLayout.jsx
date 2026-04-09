import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticleHero from '../components/ParticleHero';

export default function MainLayout() {
  return (
    <div className="relative overflow-x-clip min-h-screen">
      {/* Global Particle Background */}
      <ParticleHero />
      
      {/* Remove previous static blobs that don't match theme */}
      <Navbar />
      <main className="relative z-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
