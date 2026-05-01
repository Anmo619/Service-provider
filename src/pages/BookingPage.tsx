import { useState, useMemo, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CATEGORIES, PRICE_LEVELS } from '../constants';
import { useAuth } from '../AuthProvider';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Clock, Info, ShieldCheck, MapPin } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { PriceLevel } from '../types';

export default function BookingPage() {
  const { categoryId } = useParams();
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const category = useMemo(() => CATEGORIES.find(c => c.id === categoryId), [categoryId]);
  
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [priceLevel, setPriceLevel] = useState<PriceLevel>('fair');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!category) return <div className="text-center py-20 text-slate-500">Category not found</div>;

  const currentPrice = useMemo(() => {
    const level = PRICE_LEVELS[priceLevel];
    return Math.round(category.basePrice * level.multiplier);
  }, [category, priceLevel]);

  const handleBooking = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !profile) return;
    
    setIsSubmitting(true);
    const path = 'jobs';
    try {
      await addDoc(collection(db, path), {
        customerId: user.uid,
        customerName: profile.displayName,
        category: category.label,
        description,
        location,
        offeredPrice: currentPrice,
        priceLevel,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      setShowSuccess(true);
      setTimeout(() => navigate('/dashboard'), 3000);
    } catch (error) {
      console.error("Booking error", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const CategoryIcon = (LucideIcons as any)[category.icon];

  return (
    <div className="max-w-2xl mx-auto pb-12">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center space-x-2 text-slate-500 hover:text-blue-600 mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 space-y-10">
        <header className="flex items-center space-x-6 border-b border-slate-50 pb-8">
          <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center text-blue-600">
            <CategoryIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{category.label} Service</h1>
            <p className="text-slate-500">Requesting specialized {category.label.toLowerCase()} assistance</p>
          </div>
        </header>

        <form onSubmit={handleBooking} className="space-y-8">
          {/* Issue Description */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Describe the issue</label>
            <textarea 
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Example: My kitchen sink is leaking and causing a small flood..."
              className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 rounded-2xl p-4 min-h-[120px] outline-none transition-all resize-none"
            />
          </div>

          {/* Location */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Your Location</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                required
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Sector 44, Gurgaon"
                className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 rounded-2xl p-4 pl-12 outline-none transition-all"
              />
            </div>
          </div>

          {/* Smart Pricing System */}
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Smart Pricing</label>
              <div className="flex items-center text-blue-600 text-xs font-bold bg-blue-50 px-3 py-1 rounded-full space-x-1">
                <Info className="w-3 h-3" />
                <span>Most people paid ₹{category.basePrice}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl space-y-6">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <span className={`text-sm font-bold ${PRICE_LEVELS[priceLevel].color}`}>
                    {PRICE_LEVELS[priceLevel].label} Service
                  </span>
                  <div className="flex items-center text-slate-500 text-xs space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{PRICE_LEVELS[priceLevel].response}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-extrabold text-slate-900">₹{currentPrice}</span>
                </div>
              </div>

              {/* Custom Slider */}
              <div className="relative py-2">
                <input 
                  type="range" 
                  min="0" 
                  max="2" 
                  step="1"
                  value={priceLevel === 'low' ? 0 : priceLevel === 'fair' ? 1 : 2}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setPriceLevel(val === 0 ? 'low' : val === 1 ? 'fair' : 'high');
                  }}
                  className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
                  <span>Slow</span>
                  <span>Normal</span>
                  <span>Urgent</span>
                </div>
              </div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-[0.98] disabled:opacity-50"
          >
            {isSubmitting ? 'Posting Request...' : 'Confirm Request'}
          </button>
        </form>

        <div className="flex items-center justify-center space-x-2 text-slate-400 text-xs">
          <ShieldCheck className="w-4 h-4" />
          <span>Pay after service is completed</span>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center px-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-3xl p-10 max-w-sm w-full text-center space-y-6"
            >
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-green-600">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 10 }}
                >
                  <ShieldCheck className="w-10 h-10" />
                </motion.div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900">Finding available workers...</h3>
                <p className="text-slate-500">We're matching you with the best pros in your area.</p>
              </div>
              <div className="flex justify-center space-x-1">
                {[0, 1, 2].map(i => (
                  <motion.div 
                    key={i}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                    className="w-2 h-2 bg-blue-600 rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
