import React from 'react';
import { MousePointerClick, Settings, CreditCard, Truck, ChevronRight } from 'lucide-react';

export const OrderSteps: React.FC = () => {
  const steps = [
    {
      id: 1,
      icon: MousePointerClick,
      title: "Seçimini Yap",
      description: "Koleksiyonumuzdan beğendiğin pastayı seç veya AI ile kendi tasarımını oluştur."
    },
    {
      id: 2,
      icon: Settings,
      title: "Özelleştir",
      description: "Kişi sayısı, aroma ve pasta üzerine yazılacak notu belirle."
    },
    {
      id: 3,
      icon: CreditCard,
      title: "Güvenli Ödeme",
      description: "Kredi kartı, Havale/EFT veya Kapıda Ödeme seçeneklerinden birini seç."
    },
    {
      id: 4,
      icon: Truck,
      title: "Teslimat",
      description: "Belirlediğin gün ve saatte Eryaman içi adresine teslim edelim."
    }
  ];

  return (
    <section id="siparissureci" className="py-16 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Nasıl Sipariş Verilir?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            İpek Butik Tatlar'da sipariş süreci çok kolay ve şeffaftır. Sadece 4 adımda hayalindeki pastaya ulaşabilirsin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gray-200 -z-10"></div>

          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-white border-4 border-rose-50 rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:border-rose-200 group-hover:shadow-md transition-all duration-300 relative">
                <div className="w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center text-white">
                  <step.icon size={28} />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-gold text-white rounded-full flex items-center justify-center font-bold text-sm border-2 border-white">
                  {step.id}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed px-2">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};