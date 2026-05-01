import { useState, useMemo } from 'react';
import { CATEGORIES } from '../constants';
import { useNavigate } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function PriceEstimatorPage() {
  const [selectedCatId, setSelectedCatId] = useState<string | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const navigate = useNavigate();

  const selectedCategory = useMemo(() => CATEGORIES.find(c => c.id === selectedCatId), [selectedCatId]);
  const selectedService = useMemo(() => 
    selectedCategory?.services.find(s => s.id === selectedServiceId), 
    [selectedCategory, selectedServiceId]
  );

  const reset = () => {
    setSelectedCatId(null);
    setSelectedServiceId(null);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-12">
      <header className="text-center space-y-4">
        <div className="bg-brand-50 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto text-brand-600 mb-6">
          <LucideIcons.Calculator className="w-10 h-10" />
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-black text-slate-900 tracking-tight">Price Estimator</h1>
        <p className="text-slate-500 font-medium text-lg max-w-xl mx-auto">Get instant budget estimates for your home repairs based on market data.</p>
      </header>

      <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100 border-b-8 border-b-brand-600">
        <div className="space-y-10">
          {/* Step 1: Category */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <span className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xs">1</span>
              <h2 className="text-xl font-display font-black text-slate-900">Choose Category</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {CATEGORIES.map(cat => {
                const Icon = (LucideIcons as any)[cat.icon];
                const active = selectedCatId === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => { setSelectedCatId(cat.id); setSelectedServiceId(null); }}
                    className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all space-y-2 ${
                      active ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-slate-50 bg-slate-50/50 hover:border-brand-200 text-slate-500'
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${active ? 'text-brand-600' : ''}`} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence>
            {selectedCategory && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-6 overflow-hidden"
              >
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xs">2</span>
                  <h2 className="text-xl font-display font-black text-slate-900">Select Specific Problem</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedCategory.services.map(service => {
                    const active = selectedServiceId === service.id;
                    return (
                      <button
                        key={service.id}
                        onClick={() => setSelectedServiceId(service.id)}
                        className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all text-left ${
                          active ? 'border-brand-600 bg-brand-50' : 'border-slate-50 bg-slate-50/50 hover:border-brand-200'
                        }`}
                      >
                        <div className="space-y-1">
                          <p className="font-bold text-slate-900">{service.label}</p>
                          <p className="text-xs text-slate-500 line-clamp-1">{service.description}</p>
                        </div>
                        <LucideIcons.CheckCircle2 className={`w-5 h-5 transition-opacity ${active ? 'opacity-100 text-brand-600' : 'opacity-20'}`} />
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result */}
          <AnimatePresence>
            {selectedService && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-brand-600 rounded-[3rem] p-10 md:p-14 text-white space-y-10 relative overflow-hidden shadow-2xl shadow-brand-200"
              >
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-400/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
                  <div className="space-y-6 text-center md:text-left flex-1">
                    <div className="space-y-1">
                      <div className="flex items-center justify-center md:justify-start space-x-2 text-brand-100 mb-2">
                        <LucideIcons.ShieldCheck className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Verified Market Estimate</span>
                      </div>
                      <h3 className="text-6xl md:text-8xl font-display font-black tracking-tighter leading-none">
                        ₹{selectedService.estimatedPrice}
                      </h3>
                      <p className="text-xl md:text-2xl font-bold text-brand-100 opacity-80">
                        Typical range: ₹{Math.floor(selectedService.estimatedPrice * 0.8)} – ₹{Math.ceil(selectedService.estimatedPrice * 1.2)}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                      <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl flex items-center space-x-2 border border-white/10">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                        <span className="text-xs font-black uppercase tracking-widest leading-none">High Accuracy</span>
                      </div>
                      <div className="flex items-center space-x-1 text-brand-100 text-xs font-bold">
                        <LucideIcons.Users className="w-4 h-4" />
                        <span>Based on 1.2k recent hires</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 w-full md:w-auto shrink-0">
                    <button 
                      onClick={() => navigate(`/book/${selectedCatId}?service=${selectedServiceId}`)}
                      className="w-full bg-white text-brand-600 px-12 py-6 rounded-3xl font-black text-lg uppercase tracking-widest shadow-2xl hover:bg-brand-50 transition-all active:scale-95 flex items-center justify-center space-x-3 group"
                    >
                      <span>Book Now</span>
                      <LucideIcons.ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button onClick={reset} className="w-full text-brand-100 font-black text-xs uppercase tracking-[0.3em] hover:text-white transition-colors">
                      Recalculate
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 pt-10 border-t border-white/10">
                  {[
                    { label: 'Transparent', icon: 'Eye', desc: 'No hidden fees' },
                    { label: 'Locked', icon: 'Lock', desc: 'Price guarantee' },
                    { label: 'Fast Match', icon: 'Zap', desc: 'Pros in 15m' }
                  ].map((item, i) => {
                    const Icon = (LucideIcons as any)[item.icon];
                    return (
                      <div key={i} className="flex items-center space-x-3 text-brand-100">
                        <div className="bg-white/10 p-2 rounded-lg">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest">{item.label}</p>
                          <p className="text-[10px] opacity-60 font-medium">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
