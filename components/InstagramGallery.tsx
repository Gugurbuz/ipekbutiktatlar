import React from 'react';
import { Heart, MessageCircle, Instagram, ExternalLink, CheckCircle } from 'lucide-react';
import { PRODUCTS, CONTACT_INFO } from '../constants';

export const InstagramGallery: React.FC = () => {
  // Simulate Instagram posts using product images
  const posts = PRODUCTS.slice(0, 6).map((product, index) => ({
    id: product.id,
    image: product.image,
    likes: Math.floor(Math.random() * 500) + 120,
    comments: Math.floor(Math.random() * 50) + 5,
  }));

  return (
    <div className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Instagram Header Simulation */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 mb-10 pb-10 border-b border-gray-100">
          <div className="relative">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500">
              <div className="w-full h-full bg-white rounded-full p-1">
                 <div className="w-full h-full bg-rose-100 rounded-full flex items-center justify-center text-3xl font-serif font-bold text-rose-500">
                    İ
                 </div>
              </div>
            </div>
          </div>
          
          <div className="text-center md:text-left flex-1">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
              <h3 className="text-xl md:text-2xl font-sans font-light text-gray-800 flex items-center gap-2">
                ipekbutiktatlar
                <CheckCircle size={18} className="text-blue-500 fill-current text-white" />
              </h3>
              <a 
                href={CONTACT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-1.5 bg-brand-darkPink text-white text-sm font-semibold rounded-lg hover:bg-rose-700 transition-colors"
              >
                Takip Et
              </a>
              <button className="px-4 py-1.5 bg-gray-100 text-gray-800 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                Mesaj Gönder
              </button>
            </div>
            
            <div className="flex justify-center md:justify-start gap-8 mb-4 text-sm md:text-base">
              <div><span className="font-bold">142</span> gönderi</div>
              <div><span className="font-bold">12.5B</span> takipçi</div>
              <div><span className="font-bold">890</span> takip</div>
            </div>
            
            <div className="text-sm text-gray-600">
              <p className="font-bold text-gray-900">İpek Butik Tatlar | Ankara Eryaman</p>
              <p>🍰 Butik Pasta Tasarım & Organizasyon</p>
              <p>🌱 %100 El Yapımı & Katkısız</p>
              <p>📍 Eryaman, Ankara</p>
              <p>👇 Sipariş ve Bilgi için tıklayın</p>
              <a href="#" className="text-blue-900 font-medium truncate">linktr.ee/ipekbutiktatlar</a>
            </div>
          </div>
        </div>

        {/* Feed Grid */}
        <div className="grid grid-cols-3 gap-1 md:gap-6">
          {posts.map((post) => (
            <a 
              key={post.id}
              href={CONTACT_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square group overflow-hidden bg-gray-100 cursor-pointer"
            >
              <img 
                src={post.image} 
                alt="Instagram Post" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-white">
                <div className="flex items-center gap-2 font-bold">
                  <Heart fill="white" size={20} />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-2 font-bold">
                  <MessageCircle fill="white" size={20} />
                  <span>{post.comments}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <a 
            href={CONTACT_INFO.instagramUrl} 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand-darkPink font-semibold hover:underline"
          >
            <Instagram size={20} />
            Instagram'da Daha Fazlasını Gör
            <ExternalLink size={16} />
          </a>
        </div>

      </div>
    </div>
  );
};