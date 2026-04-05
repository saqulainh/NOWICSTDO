import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MainLayout() {
  return (
    <div className="relative overflow-x-clip">
      <div className="pointer-events-none absolute -left-36 top-32 h-72 w-72 rounded-full bg-mint/20 blur-[130px]" />
      <div className="pointer-events-none absolute -right-28 top-10 h-72 w-72 rounded-full bg-cyan/20 blur-[130px]" />

      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
