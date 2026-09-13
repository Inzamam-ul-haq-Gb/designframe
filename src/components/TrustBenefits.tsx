import React from 'react';
import { Award, Truck, ShieldCheck, Headphones } from 'lucide-react';

export const TrustBenefits: React.FC = () => {
  const benefits = [
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Carefully crafted frames, 300GSM fine art prints, and crystal acrylic.'
    },
    {
      icon: Truck,
      title: 'Nationwide Delivery',
      description: 'Reliable Cash on Delivery across Karachi, Lahore, Islamabad & all Pakistan.'
    },
    {
      icon: ShieldCheck,
      title: 'Secure Packaging',
      description: 'Multi-layer bubble wrap & reinforced corner protectors for 100% damage-free delivery.'
    },
    {
      icon: Headphones,
      title: 'Easy Support',
      description: 'Fast customer assistance and personalized frame advice via WhatsApp.'
    }
  ];

  return (
    <section className="w-full bg-[#F7F5F1] border-y border-[#EDE7DE] py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg bg-white/60 sm:bg-transparent hover:bg-white transition-all duration-200"
              >
                <div className="w-12 h-12 shrink-0 rounded-full bg-[#EDE7DE] text-[#B08D57] flex items-center justify-center border border-[#D4B77A]/30">
                  <Icon className="w-6 h-6 stroke-[1.75]" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#111111] tracking-wide uppercase font-heading mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
