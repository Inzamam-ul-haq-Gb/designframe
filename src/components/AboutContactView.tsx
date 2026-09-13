import React, { useState } from 'react';
import { Mail, PhoneCall, MapPin, MessageCircle, ShieldCheck, Award, Sparkles, Send } from 'lucide-react';
import { generateGeneralWhatsAppUrl } from '../utils/format';

interface AboutContactViewProps {
  initialTab?: 'about' | 'contact';
}

export const AboutContactView: React.FC<AboutContactViewProps> = ({ initialTab = 'about' }) => {
  const [tab, setTab] = useState<'about' | 'contact'>(initialTab);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  React.useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setName('');
      setPhone('');
      setMessage('');
      alert('Thank you! Your message has been received. Our team will contact you on WhatsApp.');
    }, 1500);
  };

  return (
    <div className="py-16 sm:py-24 bg-white border-t border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Toggle Switch */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-[#F7F5F1] rounded-full border border-[#EDE7DE]">
            <button
              onClick={() => setTab('about')}
              className={`px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                tab === 'about'
                  ? 'bg-[#111111] text-white shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              About DESIGN FRAME
            </button>
            <button
              onClick={() => setTab('contact')}
              className={`px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                tab === 'contact'
                  ? 'bg-[#111111] text-white shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Contact & Inquiries
            </button>
          </div>
        </div>

        {tab === 'about' ? (
          /* About Us Story */
          <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
            <div className="text-center space-y-4">
              <span className="text-xs font-semibold tracking-[0.2em] text-[#B08D57] uppercase block">
                Our Story & Vision
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111111] font-heading tracking-tight">
                Frame Your Style. Define Your Space.
              </h2>
              <div className="w-20 h-0.5 bg-[#D4B77A] mx-auto" />
              <p className="text-base text-neutral-600 leading-relaxed font-light max-w-2xl mx-auto">
                DESIGN FRAME was conceived with a clear mission: to bring world-class museum framing, contemporary artistic curation, and refined interior aesthetics to residences and modern workspaces across Pakistan.
              </p>
            </div>

            {/* Visual Highlight */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#F7F5F1] p-6 rounded-xs border border-[#EDE7DE] text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#EDE7DE] text-[#B08D57] flex items-center justify-center mx-auto">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm uppercase text-[#111111]">Archival 300GSM Prints</h3>
                <p className="text-xs text-[#666666] leading-relaxed">
                  Printed with 12-color ultra-chrome pigment inks that preserve deep blacks and luminous color integrity for generations.
                </p>
              </div>

              <div className="bg-[#F7F5F1] p-6 rounded-xs border border-[#EDE7DE] text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#EDE7DE] text-[#B08D57] flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm uppercase text-[#111111]">Optical Acrylic Shield</h3>
                <p className="text-xs text-[#666666] leading-relaxed">
                  Clearer than glass, 100% shatterproof, and lightweight for secure wall hanging without damaging gypsum or plaster.
                </p>
              </div>

              <div className="bg-[#F7F5F1] p-6 rounded-xs border border-[#EDE7DE] text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#EDE7DE] text-[#B08D57] flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm uppercase text-[#111111]">Artisan Assembly</h3>
                <p className="text-xs text-[#666666] leading-relaxed">
                  Every corner miter joint is hand-joined and reinforced by seasoned Pakistani framers with pre-installed hanging brackets.
                </p>
              </div>
            </div>

            {/* Editorial Room Photo */}
            <div className="relative rounded-xs overflow-hidden aspect-21/9 shadow-xl border border-[#E5E5E5]">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80"
                alt="DESIGN FRAME Studio"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-8 text-white">
                <div>
                  <span className="text-xs font-bold text-[#D4B77A] tracking-widest uppercase block mb-1">
                    Handcrafted in Pakistan
                  </span>
                  <h4 className="text-xl sm:text-2xl font-bold font-heading">
                    Over 15,000 Homes & Offices Transformed Nationwide
                  </h4>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Contact Us */
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 animate-fade-in">
            {/* Info (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-semibold tracking-[0.2em] text-[#B08D57] uppercase block mb-1">
                  We&apos;re Here To Assist
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] font-heading">
                  Get in Touch
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 mt-2 font-light">
                  Have a question about custom dimensions, corporate bulk framing, or wall layout consultations? Reach out to our dedicated support.
                </p>
              </div>

              <div className="space-y-4 text-xs text-neutral-700">
                <div className="flex items-start gap-3 p-3.5 bg-[#F7F5F1] rounded-xs">
                  <PhoneCall className="w-5 h-5 text-[#B08D57] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-neutral-900">Phone Hotline</h4>
                    <p className="text-neutral-600">+92 313 2017397</p>
                    <span className="text-[10px] text-neutral-400">Mon - Sat: 10:00 AM - 9:00 PM PKT</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-[#F7F5F1] rounded-xs">
                  <Mail className="w-5 h-5 text-[#B08D57] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-neutral-900">Email Inquiries</h4>
                    <p className="text-neutral-600">support@designframe.pk</p>
                    <span className="text-[10px] text-neutral-400">Response within 4 hours</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-[#F7F5F1] rounded-xs">
                  <MapPin className="w-5 h-5 text-[#B08D57] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-neutral-900">Workshop & Studio Hubs</h4>
                    <p className="text-neutral-600">Gulberg III, Lahore • Clifton, Karachi</p>
                    <span className="text-[10px] text-neutral-400">All Pakistan Dispatch</span>
                  </div>
                </div>
              </div>

              <a
                href={generateGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#1eb857] text-white py-3.5 px-4 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer rounded-xs shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>CHAT INSTANTLY ON WHATSAPP</span>
              </a>
            </div>

            {/* Form (7 cols) */}
            <div className="lg:col-span-7 bg-[#F7F5F1] p-6 sm:p-8 rounded-xs border border-[#EDE7DE]">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#111111] mb-4">
                Send Us a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-medium text-neutral-800 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ayesha Tariq"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-[#E5E5E5] p-2.5 rounded-xs focus:border-[#B08D57] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-neutral-800 mb-1">Phone / WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="0300 1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white border border-[#E5E5E5] p-2.5 rounded-xs focus:border-[#B08D57] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-neutral-800 mb-1">Message / Framing Requirement</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about the dimensions or wall concept you have in mind..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white border border-[#E5E5E5] p-2.5 rounded-xs focus:border-[#B08D57] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sent}
                  className="w-full bg-[#111111] hover:bg-[#B08D57] text-white py-3.5 px-4 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#D4B77A]" />
                  <span>{sent ? 'SENDING INQUIRY...' : 'SEND INQUIRY'}</span>
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
