import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { Hammer, Chrome } from 'lucide-react';
import { motion } from 'motion/react';

export default function AuthPage() {
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Auth error", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 md:mt-24 px-4 text-center">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100"
      >
        <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 text-blue-600">
          <Hammer className="w-10 h-10" />
        </div>
        
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome to FixItNow</h1>
        <p className="text-slate-500 mb-10 leading-relaxed">
          Your neighborhood's expert handymen, just a tap away.
        </p>

        <button 
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-slate-200 py-4 rounded-2xl font-semibold text-slate-700 hover:border-blue-500 hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
        >
          <Chrome className="w-6 h-6 text-blue-500" />
          <span>Continue with Google</span>
        </button>

        <p className="mt-8 text-xs text-slate-400">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
}
