import React, { useState } from 'react';
import { CartItem, OrderDetails } from '../types';
import { formatPKR, WHATSAPP_NUMBER } from '../utils/format';
import { PAKISTAN_CITIES } from '../data/products';
import { 
  X, 
  CheckCircle2, 
  Truck, 
  Building2, 
  CreditCard, 
  ShieldCheck, 
  MessageCircle, 
  ArrowLeft,
  PackageCheck
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderPlaced: (order: OrderDetails) => void;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderPlaced,
  onClearCart,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState(PAKISTAN_CITIES[0]);
  const [province, setProvince] = useState('Punjab');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'Bank Transfer' | 'Online Payment'>('Cash on Delivery');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal >= 3500 ? 0 : 250;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address) {
      alert('Please fill in your Name, Phone Number, and Complete Address.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const order: OrderDetails = {
        orderId: `DF-${Math.floor(10000 + Math.random() * 90000)}`,
        fullName,
        phone,
        email: email || 'customer@example.pk',
        address,
        city,
        province,
        postalCode: postalCode || '54000',
        paymentMethod,
        items: [...items],
        subtotal,
        discountAmount: 0,
        shipping,
        total,
        date: new Date().toLocaleDateString('en-PK', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
      };

      setCompletedOrder(order);
      onOrderPlaced(order);
      onClearCart();
      setIsSubmitting(false);
    }, 800);
  };

  const handleWhatsAppConfirm = (order: OrderDetails) => {
    const text = `Salam DESIGN FRAME!\n\nI just placed order *#${order.orderId}* on your website.\n• Name: ${order.fullName}\n• Phone: ${order.phone}\n• City: ${order.city}\n• Address: ${order.address}\n• Payment Method: ${order.paymentMethod}\n• Total Amount: ${formatPKR(order.total)}\n\nPlease confirm dispatch. Thank you!`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-xs shadow-2xl overflow-hidden my-auto border border-[#E5E5E5]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E5E5E5] bg-[#F7F5F1]">
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-lg text-[#111111]">
              DESIGN<span className="text-[#B08D57]">FRAME</span>
            </span>
            <span className="text-neutral-400">|</span>
            <span className="text-xs uppercase tracking-widest font-semibold text-neutral-700">
              Secure Pakistan Checkout
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Confirmation Screen */}
        {completedOrder ? (
          <div className="p-8 sm:p-12 text-center max-w-xl mx-auto space-y-6 animate-fade-in">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-[#B08D57] tracking-widest uppercase block mb-1">
                Order Placed Successfully
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] font-heading">
                Shukriya, {completedOrder.fullName}!
              </h2>
              <p className="text-xs sm:text-sm text-[#666666] mt-2">
                Your order <span className="font-bold text-neutral-900">#{completedOrder.orderId}</span> has been confirmed. Our framing workshop will begin assembling your piece with care.
              </p>
            </div>

            {/* Receipt Card */}
            <div className="bg-[#F7F5F1] p-5 rounded-xs border border-[#EDE7DE] text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-[#E5E5E5] pb-2">
                <span className="text-neutral-500">Order Reference:</span>
                <span className="font-bold text-[#111111]">#{completedOrder.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Delivery Address:</span>
                <span className="font-medium text-neutral-800 text-right max-w-xs truncate">
                  {completedOrder.address}, {completedOrder.city}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Contact Number:</span>
                <span className="font-medium text-neutral-800">{completedOrder.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Payment:</span>
                <span className="font-semibold text-emerald-700">{completedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E5E5E5] font-bold text-sm text-[#111111]">
                <span>Total Amount:</span>
                <span>{formatPKR(completedOrder.total)}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => handleWhatsAppConfirm(completedOrder)}
                className="w-full bg-[#25D366] hover:bg-[#1eb857] text-white py-3.5 px-4 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>CONFIRM DISPATCH VIA WHATSAPP</span>
              </button>

              <button
                onClick={onClose}
                className="w-full bg-[#111111] hover:bg-neutral-800 text-white py-3 px-4 text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                RETURN TO STORE
              </button>
            </div>
          </div>
        ) : (
          /* Main Checkout Form & Summary */
          <div className="max-h-[85vh] overflow-y-auto">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8">
              
              {/* Customer Details Form (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Contact Information */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#111111] mb-4 pb-2 border-b border-[#E5E5E5]">
                    1. Shipping Address & Contact
                  </h3>
                  
                  <div className="space-y-3.5 text-xs">
                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Inzamam ul Haq"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full border border-[#E5E5E5] p-2.5 rounded-xs focus:border-[#B08D57] focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-medium text-neutral-700 mb-1">
                          Phone Number (WhatsApp) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="0300 1234567"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full border border-[#E5E5E5] p-2.5 rounded-xs focus:border-[#B08D57] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-neutral-700 mb-1">
                          Email Address (Optional)
                        </label>
                        <input
                          type="email"
                          placeholder="your.email@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full border border-[#E5E5E5] p-2.5 rounded-xs focus:border-[#B08D57] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">
                        Complete Street Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="House #, Street #, Sector / Colony"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full border border-[#E5E5E5] p-2.5 rounded-xs focus:border-[#B08D57] focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block font-medium text-neutral-700 mb-1">City</label>
                        <select
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full border border-[#E5E5E5] p-2.5 rounded-xs bg-white focus:border-[#B08D57] focus:outline-none"
                        >
                          {PAKISTAN_CITIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block font-medium text-neutral-700 mb-1">Province</label>
                        <select
                          value={province}
                          onChange={(e) => setProvince(e.target.value)}
                          className="w-full border border-[#E5E5E5] p-2.5 rounded-xs bg-white focus:border-[#B08D57] focus:outline-none"
                        >
                          <option value="Punjab">Punjab</option>
                          <option value="Sindh">Sindh</option>
                          <option value="Khyber Pakhtunkhwa">KPK</option>
                          <option value="Balochistan">Balochistan</option>
                          <option value="Islamabad Capital">Islamabad</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-medium text-neutral-700 mb-1">Postal Code</label>
                        <input
                          type="text"
                          placeholder="e.g. 54000"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          className="w-full border border-[#E5E5E5] p-2.5 rounded-xs focus:border-[#B08D57] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">
                        Delivery Instructions / Wall Hook notes (Optional)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Any special handling notes or delivery time preference..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full border border-[#E5E5E5] p-2 rounded-xs focus:border-[#B08D57] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#111111] mb-4 pb-2 border-b border-[#E5E5E5]">
                    2. Payment Method
                  </h3>

                  <div className="space-y-3 text-xs">
                    {/* COD */}
                    <label
                      className={`flex items-start gap-3 p-3.5 rounded-xs border cursor-pointer transition-all ${
                        paymentMethod === 'Cash on Delivery'
                          ? 'border-[#B08D57] bg-[#F7F5F1] ring-1 ring-[#B08D57]'
                          : 'border-[#E5E5E5] hover:bg-neutral-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'Cash on Delivery'}
                        onChange={() => setPaymentMethod('Cash on Delivery')}
                        className="mt-0.5 text-[#B08D57] focus:ring-[#B08D57]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4 text-[#B08D57]" />
                          <span className="font-bold text-[#111111]">Cash on Delivery (COD)</span>
                          <span className="ml-auto bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-xs">
                            Recommended
                          </span>
                        </div>
                        <p className="text-neutral-500 mt-0.5 text-[11px]">
                          Pay cash to rider upon delivery anywhere in Pakistan. Inspect the tamper-proof seal before paying.
                        </p>
                      </div>
                    </label>

                    {/* Bank Transfer */}
                    <label
                      className={`flex items-start gap-3 p-3.5 rounded-xs border cursor-pointer transition-all ${
                        paymentMethod === 'Bank Transfer'
                          ? 'border-[#B08D57] bg-[#F7F5F1] ring-1 ring-[#B08D57]'
                          : 'border-[#E5E5E5] hover:bg-neutral-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'Bank Transfer'}
                        onChange={() => setPaymentMethod('Bank Transfer')}
                        className="mt-0.5 text-[#B08D57] focus:ring-[#B08D57]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-[#B08D57]" />
                          <span className="font-bold text-[#111111]">Direct Bank Transfer</span>
                        </div>
                        <p className="text-neutral-500 mt-0.5 text-[11px]">
                          Transfer directly to our Meezan Bank / HBL business accounts. Details sent upon order placement.
                        </p>
                      </div>
                    </label>

                    {/* Online Payment */}
                    <label
                      className={`flex items-start gap-3 p-3.5 rounded-xs border cursor-pointer transition-all ${
                        paymentMethod === 'Online Payment'
                          ? 'border-[#B08D57] bg-[#F7F5F1] ring-1 ring-[#B08D57]'
                          : 'border-[#E5E5E5] hover:bg-neutral-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'Online Payment'}
                        onChange={() => setPaymentMethod('Online Payment')}
                        className="mt-0.5 text-[#B08D57] focus:ring-[#B08D57]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-[#B08D57]" />
                          <span className="font-bold text-[#111111]">Debit / Credit Card / JazzCash / EasyPaisa</span>
                        </div>
                        <p className="text-neutral-500 mt-0.5 text-[11px]">
                          Secure payment gateway link will be generated after order review.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

              </div>

              {/* Order Summary Column (5 cols) */}
              <div className="lg:col-span-5 bg-[#F7F5F1] p-6 rounded-xs border border-[#EDE7DE] flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#111111] mb-4 pb-2 border-b border-[#EDE7DE]">
                    Order Summary ({items.length} Items)
                  </h3>

                  {/* List items */}
                  <div className="max-h-60 overflow-y-auto space-y-3 pr-1 text-xs mb-4">
                    {items.map((it) => (
                      <div key={it.id} className="flex gap-2.5 pb-2 border-b border-white/60">
                        <img
                          src={it.image}
                          alt={it.name}
                          className="w-12 h-14 object-cover rounded-xs border border-neutral-200 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-neutral-900 truncate">{it.name}</h4>
                          <p className="text-[11px] text-neutral-500">
                            {it.size} • {it.color} • Qty: {it.quantity}
                          </p>
                          <span className="font-semibold text-[#111111] text-[11px]">
                            {formatPKR(it.price * it.quantity)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price Calculation */}
                  <div className="space-y-2 text-xs border-t border-[#EDE7DE] pt-3 text-neutral-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-neutral-900">{formatPKR(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span className="font-semibold text-neutral-900">
                        {shipping === 0 ? 'FREE' : formatPKR(shipping)}
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-[#111111] pt-3 border-t border-[#EDE7DE]">
                      <span>Total (PKR)</span>
                      <span>{formatPKR(total)}</span>
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="space-y-3">
                  <button
                    id="place-order-submit-btn"
                    type="submit"
                    disabled={isSubmitting || items.length === 0}
                    className="w-full bg-[#111111] hover:bg-[#B08D57] text-white py-4 px-4 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg disabled:opacity-50"
                  >
                    <PackageCheck className="w-4 h-4 text-[#D4B77A]" />
                    <span>{isSubmitting ? 'PROCESSING ORDER...' : 'PLACE ORDER (COD)'}</span>
                  </button>

                  <p className="text-[10px] text-neutral-500 text-center flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    7-Day Hassle-Free Replacement Guarantee
                  </p>
                </div>

              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
