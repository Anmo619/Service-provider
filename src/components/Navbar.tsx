import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Menu, X, Hammer, MapPin, Search, ChevronDown } from 'lucide-react';
import { useAuth } from '../AuthProvider';
import { auth } from '../lib/firebase';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState('New Delhi');

  const handleSignOut = async () => {
    await auth.signOut();
    navigate('/');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center h-20 gap-4">
          <Link to="/" className="flex items-center space-x-2 text-brand-600 font-display font-black text-2xl shrink-0">
            <Hammer className="w-9 h-9 fill-brand-600/10" />
            <span className="tracking-tighter hidden sm:block">FixItNow</span>
          </Link>

          {/* Search & Location Bar - Desktop */}
          <div className="hidden lg:flex items-center flex-1 max-w-xl bg-slate-100/50 border border-slate-200/60 rounded-2xl px-4 py-2.5 hover:bg-slate-100 hover:border-brand-200 transition-all duration-300">
            <div className="flex items-center space-x-2 border-r border-slate-200 pr-4 mr-4 hover:cursor-pointer group">
              <MapPin className="w-4 h-4 text-brand-600" />
              <span className="text-sm font-bold text-slate-700 whitespace-nowrap">{location}</span>
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-brand-500" />
            </div>
            <div className="flex items-center flex-1 space-x-2">
              <Search className="w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search for electrician, plumber..." 
                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400 font-bold"
              />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="px-4 py-2 text-slate-600 hover:text-brand-600 transition-colors font-bold text-sm tracking-tight"
                >
                  Dashboard
                </Link>
                <div className="flex items-center space-x-3 border-l pl-5 border-slate-200">
                  <div className="flex flex-col items-end leading-none">
                    <span className="text-sm font-black text-slate-900">{profile?.displayName || 'User'}</span>
                    <span className="text-[10px] font-black text-brand-600 uppercase tracking-widest mt-1">
                      {profile?.role === 'provider' ? 'PRO' : 'MEMBER'}
                    </span>
                  </div>
                  <button 
                    onClick={handleSignOut}
                    className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/auth" 
                  className="text-slate-700 font-bold text-sm px-4 py-2 hover:text-brand-600 transition-colors"
                >
                  Log In
                </Link>
                <Link 
                  to="/auth" 
                  className="bg-brand-600 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-brand-700 transition-all shadow-lg shadow-brand-200 active:scale-95"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden items-center space-x-2">
             <button className="p-2 text-slate-600">
               <Search className="w-6 h-6" />
             </button>
             <button className="p-2 text-slate-600" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4">
              {user ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="block font-medium py-2 text-slate-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => { handleSignOut(); setIsOpen(false); }}
                    className="w-full text-left font-medium py-2 text-red-500"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link 
                  to="/auth" 
                  className="block font-medium py-2 text-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
