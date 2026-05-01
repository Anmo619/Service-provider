import { useState, useMemo, FormEvent } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { CATEGORIES, PRICE_LEVELS } from '../constants';
import { useAuth } from '../AuthProvider';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Clock, Info, ShieldCheck, MapPin, Home, Navigation, ChevronDown } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { PriceLevel } from '../types';

export default function BookingPage() {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const selectedServiceId = searchParams.get('service');
  const category = useMemo(() => CATEGORIES.find(c => c.id === categoryId), [categoryId]);
  const subService = useMemo(() => 
    category?.services.find(s => s.id === selectedServiceId), 
    [category, selectedServiceId]
  );
  
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(profile?.location || '');
  const [detailedAddress, setDetailedAddress] = useState({
    houseNo: '',
    landmark: '',
    area: ''
  });
  const [priceLevel, setPriceLevel] = useState<PriceLevel>('fair');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!category) return <div className="text-center py-20 text-slate-500 font-display font-black">Category not found</div>;

  const basePrice = subService ? subService.estimatedPrice : category.basePrice;

  const currentPrice = useMemo(() => {
    const level = PRICE_LEVELS[priceLevel];
    return Math.round(basePrice * level.multiplier);
  }, [basePrice, priceLevel]);

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
        serviceName: subService?.label || 'General',
        description,
        location,
        detailedAddress,
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
    <div className="max-w-3xl mx-auto pb-12 px-4">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-slate-500 hover:text-brand-600 mb-8 transition-colors font-bold"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <header className="bg-slate-900 p-8 md:p-12 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500 rounded-full blur-[100px] opacity-20"></div>
           <div className="relative z-10 flex items-center space-x-6">
              <div className="bg-white/10 backdrop-blur-xl w-20 h-20 rounded-3xl flex items-center justify-center text-brand-400">
                <CategoryIcon className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h1 className="text-3xl md:text-4xl font-display font-black tracking-tight">
                  {subService ? subService.label : `${category.label} Service`}
                </h1>
                <p className="text-slate-400 font-medium">Booking expert help for your home</p>
              </div>
           </div>
        </header>

        <form onSubmit={handleBooking} className="p-8 md:p-12 space-y-10">
          {/* Issue Description */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Describe the issue</label>
              {subService && (
                <span className="text-[10px] font-black bg-brand-50 text-brand-600 px-2 py-1 rounded-md uppercase">Targeted Service</span>
              )}
            </div>
            <textarea 
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Example: My kitchen sink is leaking and causing a small flood..."
              className="w-full bg-slate-50 border-2 border-transparent focus:border-brand-500 focus:bg-white rounded-2xl p-5 min-h-[140px] outline-none transition-all resize-none font-medium placeholder:text-slate-300"
            />
          </div>

          {/* Location & Address */}
          <div className="space-y-6">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Service Location</label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-600 w-5 h-5" />
                <input 
                  required
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City / Area"
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-brand-500 focus:bg-white rounded-2xl p-4 pl-12 outline-none transition-all font-bold text-sm"
                />
              </div>
              <div className="relative">
                <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-600 w-5 h-5" />
                <input 
                  required
                  type="text"
                  value={detailedAddress.area}
                  onChange={(e) => setDetailedAddress({...detailedAddress, area: e.target.value})}
                  placeholder="Street / Colony Name"
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-brand-500 focus:bg-white rounded-2xl p-4 pl-12 outline-none transition-all font-bold text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-600 w-5 h-5" />
                <input 
                  required
                  type="text"
                  value={detailedAddress.houseNo}
                  onChange={(e) => setDetailedAddress({...detailedAddress, houseNo: e.target.value})}
                  placeholder="House / Flat No."
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-brand-500 focus:bg-white rounded-2xl p-4 pl-12 outline-none transition-all font-bold text-sm"
                />
              </div>
              <div className="relative">
                <LucideIcons.Map className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-600 w-5 h-5" />
                <input 
                  type="text"
                  value={detailedAddress.landmark}
                  onChange={(e) => setDetailedAddress({...detailedAddress, landmark: e.target.value})}
                  placeholder="Landmark (Optional)"
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-brand-500 focus:bg-white rounded-2xl p-4 pl-12 outline-none transition-all font-bold text-sm"
                />
              </div>
            </div>
          </div>

          {/* Smart Pricing System */}
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Smart Pricing</label>
              <div className="flex items-center text-brand-600 text-[10px] font-black bg-brand-50 px-3 py-1 rounded-full space-x-1 uppercase tracking-widest">
                <Info className="w-3 h-3" />
                <span>Market Average: ₹{basePrice}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-8 md:p-10 rounded-[2rem] space-y-8 border border-slate-100">
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${PRICE_LEVELS[priceLevel].color} bg-white shadow-sm`}>
                    {PRICE_LEVELS[priceLevel].label}
                  </span>
                  <div className="flex items-center text-slate-500 text-xs font-medium space-x-2">
                    <Clock className="w-3 h-3 text-brand-600" />
                    <span>{PRICE_LEVELS[priceLevel].response}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-4xl font-display font-black text-slate-900 tracking-tighter">₹{currentPrice}</span>
                </div>
              </div>

              {/* Custom Slider */}
              <div className="relative pt-4">
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
                  className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-brand-600"
                />
                <div className="flex justify-between mt-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">
                  <span>Economic</span>
                  <span>Standard</span>
                  <span>Premium</span>
                </div>
              </div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-600 text-white py-6 rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-brand-700 transition-all shadow-xl shadow-brand-100 active:scale-[0.98] disabled:opacity-50"
          >
            {isSubmitting ? 'Posting Request...' : 'Confirm Request'}
          </button>
        </form>

        <div className="pb-10 flex items-center justify-center space-x-2 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
          <ShieldCheck className="w-4 h-4 text-brand-600" />
          <span>Pay after service is completed</span>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center px-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[3rem] p-12 max-w-md w-full text-center space-y-8 shadow-2xl"
            >
              <div className="bg-green-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-green-600 border border-green-100">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 12 }}
                >
                  <ShieldCheck className="w-12 h-12" />
                </motion.div>
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl font-display font-black text-slate-900 tracking-tight">Request Broadcasted!</h3>
                <p className="text-slate-500 font-medium">We're finding verified {category.label.toLowerCase()} pros near your location.</p>
              </div>
              <div className="flex justify-center space-x-2">
                {[0, 1, 2].map(i => (
                  <motion.div 
                    key={i}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.3 }}
                    className="w-3 h-3 bg-brand-600 rounded-full"
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
