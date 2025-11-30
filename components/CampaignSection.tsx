import React from 'react';
import { Campaign, Product } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CampaignSectionProps {
  campaign: Campaign;
  onOrderClick: (product: Product) => void;
}

export const CampaignSection: React.FC<CampaignSectionProps> = ({ campaign, onOrderClick }) => {
  return (
    <section className="py-16 bg-gradient-to-r from-red-50 to-pink-50 overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-darkPink/10 text-brand-darkPink rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles size={12} /> Sınırlı Süre
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-2">
              {campaign.title}
            </h2>
            <p className="text-gray-600 max-w-xl">{campaign.description}</p>
          </div>
          <button className="px-6 py-3 bg-brand-darkPink text-white rounded-full font-medium hover:bg-rose-800 transition-all flex items-center gap-2 shadow-lg shadow-rose-200">
            {campaign.buttonText} <ArrowRight size={18} />
          </button>
        </div>

        {/* Featured Campaign Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Hero Image Card */}
            <div className="hidden lg:block relative rounded-2xl overflow-hidden shadow-xl h-full min-h-[400px]">
                <img 
                    src={campaign.imageUrl} 
                    alt={campaign.title} 
                    className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                    <h3 className="text-white text-2xl font-serif font-bold">{campaign.subtitle}</h3>
                </div>
            </div>

            {/* Product Cards */}
            {campaign.products.map(product => (
                 <div key={product.id} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all border border-pink-100 flex flex-col">
                    <div className="relative h-64 rounded-xl overflow-hidden mb-4">
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-brand-darkPink shadow-sm">
                            Özel Koleksiyon
                        </div>
                    </div>
                    <div className="flex-grow">
                        <h4 className="text-xl font-serif font-bold text-gray-900 mb-2">{product.name}</h4>
                        <p className="text-gray-500 text-sm mb-4">{product.description}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <span className="font-bold text-lg text-brand-gold">{product.price}</span>
                        <button 
                            onClick={() => onOrderClick(product)}
                            className="px-4 py-2 bg-stone-900 text-white rounded-lg text-sm font-medium hover:bg-stone-700 transition-colors"
                        >
                            Sipariş Ver
                        </button>
                    </div>
                 </div>
            ))}
        </div>
      </div>
    </section>
  );
};