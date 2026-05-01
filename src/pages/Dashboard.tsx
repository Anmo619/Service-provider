import { useEffect, useState } from 'react';
import { useAuth } from '../AuthProvider';
import { db } from '../lib/firebase';
import { collection, query, where, onSnapshot, updateDoc, doc, orderBy } from 'firebase/firestore';
import { Job } from '../types';
import JobCard from '../components/JobCard';
import { motion, AnimatePresence } from 'motion/react';
import { Wallet, Briefcase, History, Clock } from 'lucide-react';

export default function Dashboard() {
  const { user, profile } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

  useEffect(() => {
    if (!user || !profile) return;

    let q;
    if (profile.role === 'customer') {
      q = query(
        collection(db, 'jobs'),
        where('customerId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
    } else {
      // Provider sees all pending jobs NEARBY (simplified: all pending) OR their accepted/completed jobs
      q = query(
        collection(db, 'jobs'),
        orderBy('createdAt', 'desc')
      );
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const jobData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Job));
      
      if (profile.role === 'provider') {
        // Filter jobs for provider: 
        // 1. Pending (open for anyone) 
        // 2. Their accepted/completed jobs
        const filtered = jobData.filter(j => j.status === 'pending' || j.providerId === user.uid);
        setJobs(filtered);
      } else {
        setJobs(jobData);
      }
      setLoading(false);
    }, (error) => {
      console.error("Dashboard listen error", error);
      setLoading(false);
    });

    return unsubscribe;
  }, [user, profile]);

  const handleAction = async (jobId: string, status: string) => {
    if (!user || !profile) return;
    const path = `jobs/${jobId}`;
    try {
      const jobRef = doc(db, 'jobs', jobId);
      const updateData: any = { status, updatedAt: new Date() };
      if (status === 'accepted' && profile.role === 'provider') {
        updateData.providerId = user.uid;
        updateData.providerName = profile.displayName;
      }
      await updateDoc(jobRef, updateData);
    } catch (error) {
      console.error("Dashboard action error", error);
    }
  };

  const activeJobs = jobs.filter(j => j.status === 'pending' || j.status === 'accepted');
  const historyJobs = jobs.filter(j => j.status === 'completed' || j.status === 'cancelled');

  const earnings = jobs
    .filter(j => j.status === 'completed' && j.providerId === user?.uid)
    .reduce((sum, j) => sum + (j.offeredPrice || 0), 0);

  if (!profile) return null;

  return (
    <div className="space-y-10 pb-12">
      {/* Header Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/80 flex items-center space-x-5">
          <div className="bg-brand-50 p-4 rounded-2xl text-brand-600">
            <Briefcase className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest italic">Active Jobs</p>
            <p className="text-3xl font-display font-black text-slate-900 tracking-tighter">{activeJobs.length}</p>
          </div>
        </div>

        {profile.role === 'provider' && (
          <div className="bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/80 flex items-center space-x-5">
            <div className="bg-green-50 p-4 rounded-2xl text-green-600">
              <Wallet className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest italic">Total Earnings</p>
              <p className="text-3xl font-display font-black text-slate-900 tracking-tighter">₹{earnings}</p>
            </div>
          </div>
        )}

        <div className="bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/80 flex items-center space-x-5">
          <div className="bg-slate-50 p-4 rounded-2xl text-slate-500">
            <History className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest italic">History</p>
            <p className="text-3xl font-display font-black text-slate-900 tracking-tighter">{historyJobs.length}</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="space-y-8">
        <div className="flex space-x-1 bg-slate-200/50 p-1.5 rounded-2xl w-fit border border-slate-100 shadow-inner">
          <button 
            onClick={() => setActiveTab('active')}
            className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'active' ? 'bg-white text-brand-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {profile.role === 'provider' ? 'Nearby & Active' : 'My Requests'}
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'history' ? 'bg-white text-brand-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
          >
            History
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-slate-200 h-48 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {(activeTab === 'active' ? activeJobs : historyJobs).map((job) => (
                <JobCard 
                  key={job.id} 
                  job={job} 
                  profile={profile}
                  onAccept={(id) => handleAction(id, 'accepted')}
                  onComplete={(id) => handleAction(id, 'completed')}
                  onCancel={(id) => handleAction(id, 'cancelled')}
                />
              ))}
            </AnimatePresence>
            
            {(activeTab === 'active' ? activeJobs : historyJobs).length === 0 && (
              <div className="col-span-full py-20 text-center space-y-4">
                <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-slate-300">
                  <Clock className="w-10 h-10" />
                </div>
                <p className="text-slate-400 font-medium">No jobs found here yet.</p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
