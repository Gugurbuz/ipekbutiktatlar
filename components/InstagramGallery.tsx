
import React from 'react';
import { Heart, MessageCircle, Instagram, ExternalLink, CheckCircle } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const INSTAGRAM_PROFILE_IMG = "https://mjrshqlpomrezudlpmoj.supabase.co/storage/v1/object/sign/butik/562813289_18533579242025689_8921257982099440269_n.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xMTJiZDNlNC03N2U3LTRmZGUtOGNkOC1jYTQxNjc3ZDVhYTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJidXRpay81NjI4MTMyODlfMTg1MzM1NzkyNDIwMjU2ODlfODkyMTI1Nzk4MjA5OTQ0MDI2OV9uLmpwZyIsImlhdCI6MTc2NDUxOTEyNCwiZXhwIjoyMDc5ODc5MTI0fQ.W3hrFfgYMiCO0sHedErQsTjm8DZoFvwcVnovGMlVprE";

// Curated list of images that look like social media content (Lifestyle, Behind the scenes, Details)
// instead of just reusing the product catalog images.
const FEED_POSTS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=600",
    likes: 342,
    comments: 24,
    alt: "Mutfakta hazırlık aşaması"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1612203985729-70726954388c?auto=format&fit=crop&q=80&w=600",
    likes: 856,
    comments: 42,
    alt: "Özel gün pastası detayı"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1530103862676-de3c9a59af38?auto=format&fit=crop&q=80&w=600",
    likes: 521,
    comments: 18,
    alt: "Doğum günü partisi sunumu"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=600",
    likes: 298,
    comments: 12,
    alt: "Paketleme ve teslimat hazırlığı"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1488477181946-6428a029177b?auto=format&fit=crop&q=80&w=600",
    likes: 445,
    comments: 36,
    alt: "Cupcake tepsisi fırından yeni çıktı"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80&w=600",
    likes: 612,
    comments: 29,
    alt: "Bahar konseptli pasta dokusu"
  }
];

export const InstagramGallery: React.FC = () => {
  return (
    <div className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Instagram Header Simulation */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 mb-10 pb-10 border-b border-gray-100">
          <div className="relative">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500">
              <div className="w-full h-full bg-white rounded-full p-1 overflow-hidden">
                 <img 
                   src={INSTAGRAM_PROFILE_IMG} 
                   alt="İpek Butik Tatlar Profil" 
                   className="w-full h-full object-cover"
                 />
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
              <a href={CONTACT_INFO.instagramUrl} target="_blank" rel="noreferrer" className="text-blue-900 font-medium truncate">linktr.ee/ipekbutiktatlar</a>
            </div>
          </div>
        </div>

        {/* Feed Grid */}
        <div className="grid grid-cols-3 gap-1 md:gap-6">
          {FEED_POSTS.map((post) => (
            <a 
              key={post.id}
              href={CONTACT_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square group overflow-hidden bg-gray-100 cursor-pointer"
            >
              <img 
                src={post.image} 
                alt={post.alt} 
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
    