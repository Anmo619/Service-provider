import { motion } from 'motion/react';
import { CATEGORIES } from '../constants';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';

export default function ServicesPage() {
  return (
    <div className="space-y-16 py-8">
      <header className="text-center space-y-4 max-w-2xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight">Expert Services</h1>
        <p className="text-slate-500 font-medium text-lg">Detailed sub-services provided by verified local professionals.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {CATEGORIES.map((cat, idx) => {
          const Icon = (LucideIcons as any)[cat.icon];
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl transition-all group"
            >
              <div className="aspect-video overflow-hidden relative">
                <img src={cat.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={cat.label} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 flex items-center space-x-3">
                   <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl text-white">
                      <Icon className="w-6 h-6" />
                   </div>
                   <h2 className="text-2xl font-display font-black text-white">{cat.label}</h2>
                </div>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 gap-3">
                  {cat.services.slice(0, 4).map(service => (
                    <Link 
                      key={service.id}
                      to={`/services/${cat.id}?service=${service.id}`}
                      className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-brand-50 hover:text-brand-700 transition-all font-bold text-sm text-slate-700 active:scale-[0.98]"
                    >
                      <span>{service.label}</span>
                      <LucideIcons.ArrowRight className="w-4 h-4" />
                    </Link>
                  ))}
                </div>
                <Link 
                  to={`/services/${cat.id}`}
                  className="w-full block text-center py-4 rounded-xl border-2 border-slate-100 hover:border-brand-600 hover:text-brand-600 transition-all font-black text-xs uppercase tracking-widest"
                >
                  View All {cat.label} Services
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
