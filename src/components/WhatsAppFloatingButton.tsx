import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { generateGeneralWhatsAppUrl } from '../utils/format';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const handleClick = () => {
    window.open(generateGeneralWhatsAppUrl(), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip banner */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#111111] text-white text-xs px-3.5 py-2 rounded-xs shadow-xl border border-white/10 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <span>Need help framing? Chat on WhatsApp</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-neutral-400 hover:text-white ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <button
        id="btn-floating-whatsapp"
        onClick={handleClick}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1eb857] text-white shadow-2xl flex items-center justify-center transition-transform duration-300 hover:scale-110 cursor-pointer border-2 border-white group"
        title="Chat with DESIGN FRAME on WhatsApp"
        aria-label="WhatsApp Chat"
      >
        <MessageCircle className="w-7 h-7 fill-white text-transparent group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
};
