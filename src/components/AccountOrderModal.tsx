import React, { useState } from 'react';
import { X, Search, Package, CheckCircle2, Clock, Truck, ShieldCheck, MapPin } from 'lucide-react';

interface AccountOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string;
}

export const AccountOrderModal: React.FC<AccountOrderModalProps> = ({
  isOpen,
  onClose,
  initialOrderId = '',
}) => {
  const [orderQuery, setOrderQuery] = useState(initialOrderId);
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderQuery.trim()) {
      setSearched(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-xs shadow-2xl overflow-hidden border border-[#E5E5E5] my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E5E5E5] bg-[#F7F5F1]">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-[#B08D57]" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#111111] font-heading">
              Track Pakistan Delivery
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          
          <form onSubmit={handleSearch} className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800">
              Enter Order ID or Contact Number
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                placeholder="e.g. DF-84920 or 03001234567"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                className="flex-1 border border-[#E5E5E5] p-2.5 text-xs uppercase focus:border-[#B08D57] focus:outline-none rounded-xs"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#111111] hover:bg-[#B08D57] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors"
              >
                Track
              </button>
            </div>
            <span className="text-[11px] text-neutral-500 block">
              Tip: You can find your Order ID on your confirmation receipt or WhatsApp dispatch note.
            </span>
          </form>

          {/* Tracking Result Timeline */}
          {searched ? (
            <div className="bg-[#F7F5F1] p-5 rounded-xs border border-[#EDE7DE] space-y-5 animate-fade-in">
              <div className="flex justify-between items-center border-b border-[#E5E5E5] pb-3 text-xs">
                <div>
                  <span className="text-neutral-500">Tracking:</span>
                  <span className="font-bold text-neutral-900 ml-1.5">{orderQuery.toUpperCase()}</span>
                </div>
                <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-xs text-[10px] uppercase">
                  In Production / Assembling
                </span>
              </div>

              {/* Progress Steps */}
              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900">Order Confirmed & Verified</h4>
                    <p className="text-[11px] text-neutral-500">Order logged into workshop production queue.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#B08D57] text-white flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900">12-Color Giclée Printing & Matboard Cut</h4>
                    <p className="text-[11px] text-neutral-500">Artisan joining frame mouldings and acrylic glass.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 opacity-50">
                  <div className="w-6 h-6 rounded-full bg-neutral-300 text-neutral-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-800">Tamper-Proof Bubble Packing</h4>
                    <p className="text-[11px] text-neutral-500">Multi-layer shock absorbing transit protection.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 opacity-50">
                  <div className="w-6 h-6 rounded-full bg-neutral-300 text-neutral-600 flex items-center justify-center shrink-0">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-800">Dispatched via TCS / Leopard Courier</h4>
                    <p className="text-[11px] text-neutral-500">Cash on Delivery rider will contact you prior to delivery.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 text-xs text-neutral-500 space-y-2">
              <MapPin className="w-6 h-6 text-[#B08D57] mx-auto opacity-70" />
              <p>Standard delivery is 3-4 working days for major cities (Lahore, Karachi, Islamabad) and 4-6 days for other regions.</p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
