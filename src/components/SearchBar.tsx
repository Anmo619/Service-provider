import { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import { Search, MapPin, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const popularSearches = ['Fan not working?', 'AC not cooling enough?', 'Home too dusty?', 'Leaking tap or mixer?'];

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const results: { id: string; categoryId: string; label: string; categoryLabel: string; type: 'category' | 'service' }[] = [];
    
    CATEGORIES.forEach(cat => {
      if (cat.label.toLowerCase().includes(query.toLowerCase())) {
        results.push({ id: cat.id, categoryId: cat.id, label: cat.label, categoryLabel: 'Category', type: 'category' });
      }
      cat.services.forEach(service => {
        if (service.label.toLowerCase().includes(query.toLowerCase())) {
          results.push({ id: service.id, categoryId: cat.id, label: service.label, categoryLabel: cat.label, type: 'service' });
        }
      });
    });
    
    return results.slice(0, 6);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (categoryId: string, serviceId?: string) => {
    setShowSuggestions(false);
    setQuery('');
    navigate(`/services/${categoryId}${serviceId ? `?service=${serviceId}` : ''}`);
  };

  return (
    <div className="relative flex-1 max-w-xl group" ref={containerRef}>
      <div className="flex items-center bg-slate-100/50 border border-slate-200/60 rounded-2xl px-4 py-2.5 hover:bg-slate-100 hover:border-brand-200 transition-all duration-300">
        <div className="flex items-center space-x-2 border-r border-slate-200 pr-4 mr-4 hover:cursor-pointer group/loc whitespace-nowrap">
          <MapPin className="w-4 h-4 text-brand-600" />
          <span className="text-sm font-bold text-slate-700">New Delhi</span>
          <ChevronDown className="w-4 h-4 text-slate-400 group-hover/loc:text-brand-500" />
        </div>
        <div className="flex items-center flex-1 space-x-3">
          <Search className="w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search for services..." 
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400 font-bold"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 hover:bg-slate-200 rounded-full">
              <X className="w-3 h-3 text-slate-400" />
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showSuggestions && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-[100] p-2"
          >
            {!query && (
              <div className="p-4 space-y-3">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Popular Searches</p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map(s => (
                    <button 
                      key={s} 
                      onClick={() => setQuery(s)}
                      className="px-3 py-1.5 bg-slate-50 hover:bg-brand-50 hover:text-brand-600 rounded-lg text-xs font-bold text-slate-600 transition-all border border-slate-100"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {query && suggestions.length > 0 && suggestions.map((item, i) => (
              <button
                key={i}
                onClick={() => handleSelect(item.categoryId, item.id !== item.categoryId ? item.id : undefined)}
                className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-brand-50 rounded-xl transition-colors text-left group/item"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-slate-100 p-2 rounded-lg text-slate-400 group-hover/item:bg-white group-hover/item:text-brand-600 transition-colors">
                    {item.type === 'category' ? <ChevronDown className="w-4 h-4" /> : <Search className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 leading-none">{item.label}</p>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1 opacity-70">{item.categoryLabel}</p>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-300 -rotate-90 opacity-0 group-hover/item:opacity-100 transition-opacity" />
              </button>
            ))}

            {query && suggestions.length === 0 && (
              <div className="p-10 text-center space-y-2">
                <p className="text-sm font-bold text-slate-400">No results found for "{query}"</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
