import { Job, UserProfile } from '../types';
import { Clock, MapPin, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { formatDistanceToNow } from 'date-fns';

interface JobCardProps {
  key?: string | number;
  job: Job;
  profile: UserProfile;
  onAccept?: (jobId: string) => void | Promise<void>;
  onComplete?: (jobId: string) => void | Promise<void>;
  onCancel?: (jobId: string) => void | Promise<void>;
}

export default function JobCard({ job, profile, onAccept, onComplete, onCancel }: JobCardProps) {
  const isPending = job.status === 'pending';
  const isAccepted = job.status === 'accepted';
  const isCompleted = job.status === 'completed';
  const isCustomer = profile.role === 'customer';
  const isProvider = profile.role === 'provider';

  const statusColors = {
    pending: 'bg-orange-100 text-orange-600',
    accepted: 'bg-blue-100 text-blue-600',
    completed: 'bg-green-100 text-green-600',
    cancelled: 'bg-red-100 text-red-600'
  };

  return (
    <motion.div 
      layout
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-[2rem] p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/80 space-y-5 transition-shadow hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] bg-gradient-to-br from-white to-slate-50/30"
    >
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${statusColors[job.status]}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current mr-2 animate-pulse" />
            {job.status}
          </div>
          <h3 className="font-display font-black text-slate-900 text-xl tracking-tight leading-none">
            {job.serviceName && job.serviceName !== 'General' ? job.serviceName : job.category}
          </h3>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black text-slate-900 tracking-tighter">₹{job.offeredPrice}</p>
        </div>
      </div>

      <p className="text-slate-500 text-sm font-medium leading-relaxed italic opacity-80">
        "{job.description}"
      </p>

      <div className="flex flex-wrap gap-4 pt-2">
        <div className="flex items-center space-x-1.5 bg-slate-100/80 px-3 py-1.5 rounded-lg text-[11px] font-bold text-slate-500">
          <MapPin className="w-3 h-3 text-brand-600" />
          <span>{job.location} {job.detailedAddress?.houseNo ? `(${job.detailedAddress.houseNo})` : ''}</span>
        </div>
        <div className="flex items-center space-x-1.5 bg-slate-100/80 px-3 py-1.5 rounded-lg text-[11px] font-bold text-slate-500">
          <Clock className="w-3 h-3 text-brand-600" />
          <span>
            {job.createdAt?.seconds 
              ? formatDistanceToNow(new Date(job.createdAt.seconds * 1000), { addSuffix: true }) 
              : 'Just now'}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2">
        {isProvider && isPending && onAccept && (
          <button 
            onClick={() => onAccept(job.id)}
            className="w-full bg-brand-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center space-x-2 hover:bg-brand-700 transition-all shadow-lg shadow-brand-100 active:scale-95"
          >
            <span>Accept Task</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

        {isProvider && isAccepted && onComplete && (
          <button 
            onClick={() => onComplete(job.id)}
            className="w-full bg-green-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center space-x-2 hover:bg-green-700 transition-all shadow-lg shadow-green-100 active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Mark Complete</span>
          </button>
        )}

        {isCustomer && isPending && onCancel && (
          <button 
            onClick={() => onCancel(job.id)}
            className="w-full bg-white text-slate-400 py-4 rounded-2xl font-bold text-sm flex items-center justify-center space-x-2 hover:bg-red-50 hover:text-red-500 hover:border-red-100 border border-slate-100 transition-all active:scale-95"
          >
            <XCircle className="w-4 h-4" />
            <span>Cancel Request</span>
          </button>
        )}

        {isAccepted && (
          <div className="flex items-center justify-center space-x-3 p-3 bg-brand-50 rounded-2xl">
            <div className="w-8 h-8 rounded-full bg-brand-200 flex items-center justify-center text-brand-700 font-black text-xs">
               {(isCustomer ? job.providerName : job.customerName)?.[0] || '?'}
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black text-brand-500 uppercase tracking-widest">Matched with</p>
              <p className="text-xs font-bold text-slate-900">{isCustomer ? job.providerName : job.customerName}</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
