import React, { useEffect } from 'react';
import { CheckCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info';
  message: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 animate-bounce-gentle">
      <div className="bg-[#111111] text-white px-5 py-3 rounded-xs shadow-2xl border border-[#B08D57]/40 flex items-center gap-3 text-xs sm:text-sm">
        {toast.type === 'success' ? (
          <CheckCircle className="w-4 h-4 text-[#D4B77A] shrink-0" />
        ) : (
          <Info className="w-4 h-4 text-blue-400 shrink-0" />
        )}
        <span className="font-medium text-neutral-100">{toast.message}</span>
        <button
          onClick={onDismiss}
          className="text-neutral-400 hover:text-white ml-2 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
