import { Link } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import * as LucideIcons from 'lucide-react';
import { motion } from 'motion/react';
import { ShieldCheck, Zap, Heart, Star, Navigation, Clock, UserCheck, TrendingUp } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center space-x-2 bg-brand-50 text-brand-700 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
            >
              <Zap className="w-4 h-4 fill-brand-700/20" />
              <span>Hyperlocal & Instant Matching</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-display font-black text-slate-900 leading-[1] tracking-tighter"
            >
              Book Trusted <span className="text-brand-600">Home Services</span> at the Right Price.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 text-xl font-medium max-w-lg leading-relaxed"
            >
              Choose your service, set your own price, and get matched with local pros in under 15 minutes.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link 
                to="/auth" 
                className="bg-brand-600 text-white px-8 py-5 rounded-2xl font-bold text-lg hover:bg-brand-700 transition-all shadow-xl shadow-brand-200 active:scale-95 text-center"
              >
                Book a Service
              </Link>
              <div className="flex items-center space-x-3 px-2">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <img 
                      key={i} 
                      className="w-10 h-10 rounded-full border-2 border-white shadow-sm" 
                      src={`https://i.pravatar.cc/100?u=${i}`} 
                      alt="User" 
                    />
                  ))}
                </div>
                <div className="text-xs font-bold text-slate-500">
                  <div className="flex items-center text-orange-400">
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                  </div>
                  <span>4.9/5 from 12k+ users</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden md:block relative"
          >
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50"></div>
            <img 
              src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=1000" 
              className="rounded-[3rem] w-full h-[600px] object-cover shadow-2xl relative z-10"
              alt="Service in action"
            />
            {/* Urgency Floating Badge */}
            <div className="absolute top-10 left-0 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center space-x-3 border border-slate-50 animate-bounce cursor-default">
              <div className="bg-green-100 p-2 rounded-full">
                <Navigation className="w-5 h-5 text-green-600 fill-current" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-900 leading-none">5 Pros Nearby</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Ready to join!</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 tracking-tight">Our Services</h2>
            <p className="text-slate-500 font-medium">Choose from our wide range of expert home services.</p>
          </div>
          <Link to="/auth" className="text-brand-600 font-bold hover:underline flex items-center space-x-1">
            <span>View all services</span>
            <TrendingUp className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {CATEGORIES.map((cat, idx) => {
            const Icon = (LucideIcons as any)[cat.icon];
            return (
              <motion.div
                key={cat.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link 
                  to={`/book/${cat.id}`}
                  className="group block relative bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img src={cat.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={cat.label} />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                    {cat.popular && (
                      <span className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="p-6 md:p-8 flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="text-xl font-display font-black text-slate-900">{cat.label}</h3>
                      <p className="text-sm font-bold text-slate-400">Starts at ₹{cat.basePrice}</p>
                    </div>
                    <div className="bg-slate-50 w-12 h-12 rounded-xl flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-all transform group-hover:rotate-12">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-slate-900 rounded-[3rem] p-12 md:p-24 text-white relative overflow-hidden mx-4">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
           <div className="absolute top-0 left-0 w-64 h-64 bg-brand-500 rounded-full blur-[100px]"></div>
           <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-500 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="relative z-10 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight">How it works</h2>
            <p className="text-slate-400 font-medium max-w-xl mx-auto">Booking a pro is simpler than ordering coffee. No calls, no waiting, just help.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: 'Search', title: 'Select Service', desc: 'Choose what you need help with from our expert list.' },
              { icon: 'Coins', title: 'Set Your Price', desc: 'Use our smart slider to pick a price that fits your budget.' },
              { icon: 'UserCheck', title: 'Get Matched', desc: 'Connect with a verified pro in your area instantly.' }
            ].map((step, i) => {
              const StepIcon = (LucideIcons as any)[step.icon];
              return (
                <div key={i} className="space-y-6 text-center group">
                  <div className="w-20 h-20 bg-white/10 border border-white/20 rounded-3xl flex items-center justify-center mx-auto text-brand-400 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all transform group-hover:-rotate-6">
                    <StepIcon className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Trust Section */}
      <section className="container mx-auto px-4 max-w-5xl">
        <div className="bg-brand-50 rounded-[2.5rem] p-10 md:p-16 border border-brand-100 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-brand-100 p-3 w-fit rounded-2xl text-brand-700">
              <TrendingUp className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-display font-black text-slate-900 leading-tight">Fair Pricing, <br/><span className="text-brand-600">Always.</span></h2>
            <p className="text-slate-600 font-medium leading-relaxed">
              We use real-time market data to suggest fair prices. Most customers paid <span className="font-black text-slate-900">₹400–₹700</span> for electrical fixes last month.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-green-600 font-bold bg-green-100 px-3 py-1 rounded-full text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>Price Protection</span>
              </div>
              <div className="flex items-center space-x-1 text-orange-600 font-bold bg-orange-100 px-3 py-1 rounded-full text-xs">
                <Clock className="w-4 h-4" />
                <span>Price Lock</span>
              </div>
            </div>
          </div>
          <div className="relative h-64 bg-white rounded-[2rem] border border-brand-100 shadow-xl shadow-brand-900/5 overflow-hidden p-8">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div className="h-20 w-8 bg-brand-100 rounded-t-lg"></div>
                <div className="h-32 w-8 bg-brand-200 rounded-t-lg"></div>
                <div className="h-44 w-8 bg-brand-600 rounded-t-lg"></div>
                <div className="h-28 w-8 bg-brand-300 rounded-t-lg"></div>
                <div className="h-16 w-8 bg-brand-100 rounded-t-lg"></div>
              </div>
              <div className="border-t border-slate-100 pt-4 flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span>Week 4</span>
              </div>
              <p className="text-xs text-center font-bold text-brand-600 mt-4 italic">FixItNow Pricing Advantage: -22% vs Market</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center bg-white rounded-[3rem] p-12 shadow-sm border border-slate-50">
          {[
            { icon: UserCheck, val: '150+', label: 'Verified Pros', color: 'text-brand-600' },
            { icon: Heart, val: '12k+', label: 'Happy Users', color: 'text-red-500' },
            { icon: Star, val: '4.9/5', label: 'Top Rating', color: 'text-orange-500' }
          ].map((stat, i) => (
            <div key={i} className="space-y-4">
              <div className={`mx-auto w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-50 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-5xl font-display font-black text-slate-900 tracking-tighter">{stat.val}</h4>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 text-center space-y-12">
        <div className="space-y-3">
          <h2 className="text-4xl font-display font-black text-slate-900">What our users say</h2>
          <p className="text-slate-500 font-medium">Real reviews from your neighbors.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { name: 'Amit Sharma', role: 'Homeowner', text: 'Amazing experience! Set my price at ₹500 and an electrician arrived in 10 minutes. FixItNow is a lifesaver.', rating: 5 },
            { name: 'Priya Verma', role: 'Business Owner', text: 'I love transparency. No more bargaining with workers. The price you set is the price you pay.', rating: 5 }
          ].map((rev, i) => (
            <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 text-left space-y-6 hover:shadow-2xl transition-all">
              <div className="flex items-center space-x-1 text-orange-400">
                {Array(rev.rating).fill(0).map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-lg font-medium text-slate-700 italic">"{rev.text}"</p>
              <div className="flex items-center space-x-4">
                <img className="w-14 h-14 rounded-full border-2 border-slate-100" src={`https://i.pravatar.cc/100?img=${i+10}`} alt={rev.name} />
                <div>
                  <p className="font-bold text-slate-900 leading-tight">{rev.name}</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 pb-12">
        <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-[3.5rem] p-12 md:p-24 text-center text-white space-y-10 relative overflow-hidden shadow-2xl">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
           <div className="relative z-10 max-w-2xl mx-auto space-y-8">
             <h2 className="text-4xl md:text-7xl font-display font-black leading-tight tracking-tighter">Ready to fix your home issues?</h2>
             <p className="text-brand-100 text-xl font-medium">Join thousands of happy users and get your house in order today.</p>
             <Link 
               to="/auth" 
               className="inline-block bg-white text-brand-600 px-12 py-6 rounded-3xl font-black text-xl hover:bg-brand-50 transition-all shadow-2xl active:scale-95 uppercase tracking-widest"
             >
               Get Started Now
             </Link>
           </div>
        </div>
      </section>
    </div>
  );
}
