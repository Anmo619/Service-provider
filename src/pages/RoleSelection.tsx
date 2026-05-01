import { useAuth } from '../AuthProvider';
import { User, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function RoleSelection() {
  const { setRole } = useAuth();

  return (
    <div className="max-w-4xl mx-auto py-12 md:py-20 text-center">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">How will you use FixItNow?</h1>
      <p className="text-slate-500 text-lg mb-12">Choose your account type to get started</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        {/* Customer Choice */}
        <motion.button 
          whileHover={{ y: -8 }}
          onClick={() => setRole('customer')}
          className="group relative bg-white p-10 rounded-3xl shadow-lg border-2 border-transparent hover:border-blue-500 transition-all text-left"
        >
          <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">I'm a Customer</h2>
          <p className="text-slate-600 leading-relaxed">
            I need help with electrical, plumbing, or appliance repairs at my home.
          </p>
          <div className="mt-6 flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
            Get Started →
          </div>
        </motion.button>

        {/* Provider Choice */}
        <motion.button 
          whileHover={{ y: -8 }}
          onClick={() => setRole('provider')}
          className="group relative bg-white p-10 rounded-3xl shadow-lg border-2 border-transparent hover:border-orange-500 transition-all text-left"
        >
          <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">I'm a Service Provider</h2>
          <p className="text-slate-600 leading-relaxed">
            I want to find local jobs, grow my business, and earn more.
          </p>
          <div className="mt-6 flex items-center text-orange-600 font-semibold group-hover:translate-x-2 transition-transform">
            Start Earning →
          </div>
        </motion.button>
      </div>
    </div>
  );
}
