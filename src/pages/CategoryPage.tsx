import { useMemo, useEffect } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import * as LucideIcons from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function CategoryPage() {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const selectedServiceId = searchParams.get('service');

  const category = useMemo(() => CATEGORIES.find(c => c.id === categoryId), [categoryId]);

  useEffect(() => {
    if (selectedServiceId) {
      const element = document.getElementById(selectedServiceId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedServiceId]);

  if (!category) return <div className="text-center py-20 font-display font-black text-slate-400">Category not found</div>;

  const CatIcon = (LucideIcons as any)[category.icon];

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <header className="relative py-16 md:py-24 rounded-[3rem] overflow-hidden text-white flex flex-col items-center text-center">
        <img src={category.image} className="absolute inset-0 w-full h-full object-cover" alt={category.label} />
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"></div>
        
        <div className="relative z-10 space-y-4 px-6">
          <Link to="/services" className="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-colors mb-4">
             <LucideIcons.ArrowLeft className="w-4 h-4" />
             <span className="text-sm font-bold">Back to all services</span>
          </Link>
          <div className="bg-white/20 backdrop-blur-xl w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
            <CatIcon className="w-12 h-12" />
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter">{category.label}</h1>
          <p className="text-white/80 text-xl font-medium max-w-lg">Expert {category.label.toLowerCase()} solutions starting at ₹{category.basePrice}</p>
        </div>
      </header>

      <section className="px-4">
        <h2 className="text-2xl font-display font-black text-slate-900 mb-8 px-2 flex items-center space-x-3">
          <LucideIcons.LayoutGrid className="w-6 h-6 text-brand-600" />
          <span>Select Specific Service</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {category.services.map((service) => {
            const ServiceIcon = (LucideIcons as any)[service.icon || 'Wrench'];
            const isSelected = service.id === selectedServiceId;
            
            return (
              <motion.div 
                key={service.id}
                id={service.id}
                whileHover={{ scale: 1.02 }}
                className={`p-8 rounded-[2rem] border-2 transition-all cursor-pointer flex flex-col justify-between space-y-6 ${
                  isSelected ? 'border-brand-600 bg-brand-50 shadow-xl shadow-brand-100 ring-4 ring-brand-600/5' : 'border-slate-100 bg-white hover:border-brand-200'
                }`}
                onClick={() => navigate(`/book/${category.id}?service=${service.id}`)}
              >
                <div className="flex justify-between items-start">
                  <div className={`p-4 rounded-2xl ${isSelected ? 'bg-brand-600 text-white' : 'bg-slate-50 text-brand-600 font-bold'}`}>
                    <ServiceIcon className="w-8 h-8" />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Estimated</p>
                    <p className={`text-2xl font-black ${isSelected ? 'text-brand-700' : 'text-slate-900'}`}>₹{service.estimatedPrice}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-display font-black text-slate-900">{service.label}</h3>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed">{service.description}</p>
                </div>

                <div className={`flex items-center space-x-2 font-black text-xs uppercase tracking-widest ${isSelected ? 'text-brand-700' : 'text-brand-600'}`}>
                  <span>Continue to Booking</span>
                  <LucideIcons.ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
