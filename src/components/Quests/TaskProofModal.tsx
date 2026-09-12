import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Upload, X, CheckCircle, FileText } from 'lucide-react';
import { Task } from '../../types';
import { ATTRIBUTE_CONFIG } from '../../utils/gameEngine';

interface TaskProofModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmComplete: (taskId: string, proofUrl?: string, notes?: string) => void;
}

export const TaskProofModal: React.FC<TaskProofModalProps> = ({
  task,
  isOpen,
  onClose,
  onConfirmComplete,
}) => {
  const [proofImage, setProofImage] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen || !task) return null;

  const conf = ATTRIBUTE_CONFIG[task.attribute];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProofImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSimulateSampleProof = () => {
    // Generate a clean stylized canvas snapshot proof for immediate zero-friction demo testing
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 240;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, 400, 240);

      ctx.fillStyle = conf.accentHex;
      ctx.fillRect(20, 20, 10, 200);

      ctx.font = 'bold 20px sans-serif';
      ctx.fillStyle = '#f8fafc';
      ctx.fillText(task.title, 45, 60);

      ctx.font = '14px sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`Verified Real-Life Action • ${conf.name} Domain`, 45, 95);
      ctx.fillText(`Duration: ${task.durationMinutes} minutes`, 45, 125);
      ctx.fillText(`Timestamp: ${new Date().toLocaleTimeString()}`, 45, 155);

      ctx.fillStyle = '#22c55e';
      ctx.fillText('✓ Proof of Habit Accomplishment Recorded', 45, 195);

      setProofImage(canvas.toDataURL());
    }
  };

  const handleSubmit = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onConfirmComplete(task.id, proofImage || undefined, notes);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 relative overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Task Header */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-md"
            style={{ backgroundColor: `${conf.accentHex}25`, color: conf.accentHex }}
          >
            {conf.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase text-slate-400">{conf.name} Domain</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-amber-400">
                +{task.xpReward} XP • +{task.essenceReward} Essence
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-100">{task.title}</h3>
          </div>
        </div>

        <p className="text-xs text-slate-300 mb-4">{task.description}</p>

        {/* Proof of Action Section */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            Attach Proof of Completion (Optional)
          </label>

          {proofImage ? (
            <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-950 mb-2">
              <img src={proofImage} alt="Proof" className="w-full h-36 object-cover" />
              <button
                onClick={() => setProofImage(null)}
                className="absolute top-2 right-2 p-1 rounded-md bg-slate-950/80 text-slate-300 hover:text-rose-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 mb-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border border-dashed border-slate-700 hover:border-amber-400/60 bg-slate-800/40 hover:bg-slate-800/80 transition-all text-slate-300 text-xs"
              >
                <Upload className="w-4 h-4 text-amber-400" />
                <span>Upload Photo</span>
              </button>
              <button
                onClick={handleSimulateSampleProof}
                className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border border-dashed border-slate-700 hover:border-emerald-400/60 bg-slate-800/40 hover:bg-slate-800/80 transition-all text-slate-300 text-xs"
              >
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Quick Verify</span>
              </button>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Reflection Note */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            Reflection Note (Optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="How did this activity feel? What did you discover or accomplish?"
            rows={2}
            className="w-full text-xs p-2.5 rounded-xl bg-slate-950/80 border border-slate-750 focus:border-amber-400 text-slate-200 placeholder:text-slate-600 outline-none resize-none"
          />
        </div>

        {/* Submit & Reward Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isVerifying}
            className="flex-[2] px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {isVerifying ? (
              <span className="animate-pulse">Evolving World...</span>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Complete Quest (+{task.xpReward} XP)</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
