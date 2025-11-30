import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Star, Instagram, Phone, MapPin, ChevronRight, Cake, Send } from 'lucide-react';
import { AiChatBot } from './components/AiChatBot';
import { AICakeDesigner } from './components/AICakeDesigner';
import { OrderModal } from './components/OrderModal';
import { CampaignSection } from './components/CampaignSection';
import { OrderSteps } from './components/OrderSteps';
import { BlogSection } from './components/BlogSection';
import { PRODUCTS, CATEGORIES, TESTIMONIALS, CONTACT_INFO, ACTIVE_CAMPAIGN, BLOG_POSTS } from './constants';
import { Product, CustomDesign } from './types';
import { InstagramGallery } from './components/InstagramGallery';
import { CartProvider, useCart } from './contexts/CartContext';
import { CartDrawer } from './components/CartDrawer';
import { FlavorQuiz } from './components/FlavorQuiz';
import { Gamepad2 } from 'lucide-react';

// İç bileşen (MainApp) oluşturuyoruz ki useCart hook'unu kullanabilelim
const MainApp = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCustomDesign, setSelectedCustomDesign] = useState<CustomDesign | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  
  // Context'ten fonksiyonları çekiyoruz
  const { addToCart, toggleCart, cartCount } = useCart();

  const filteredProducts = activeCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  const handleOrderClick = (product: Product) => {
    setSelectedProduct(product);
    setSelectedCustomDesign(null);
    setShowOrderModal(true);
  };

  const handleCustomDesignOrder = (design: CustomDesign) => {
    setSelectedCustomDesign(design);
    setSelectedProduct(null);
    setShowOrderModal(true);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="font-sans text-gray-800 bg-rose-50/30 selection:bg-rose-200 relative min-h-screen">
      
      {/* --- Navbar --- */}
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all duration-300 h-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo */}
            <button className="flex items-center space-x-2 cursor-pointer z-50 outline-none" onClick={() => scrollToSection('anasayfa')}>
              <div className="bg-rose-500 p-2 rounded-full text-white">
                <Cake size={24} />
              </div>
              <span className="text-2xl font-serif font-bold text-gray-900 tracking-tight">
                İpek<span className="text-rose-500">Butik</span>Tatlar
              </span>
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('anasayfa')} className="text-gray-600 hover:text-rose-500 font-medium transition cursor-pointer outline-none">Anasayfa</button>
              <button onClick={() => scrollToSection('koleksiyon')} className="text-gray-600 hover:text-rose-500 font-medium transition cursor-pointer outline-none">Koleksiyon</button>
              <button onClick={() => scrollToSection('tasarim')} className="text-gray-600 hover:text-rose-500 font-medium transition cursor-pointer outline-none">Sihirli Mutfak</button>
              <button onClick={() => scrollToSection('siparissureci')} className="text-gray-600 hover:text-rose-500 font-medium transition cursor-pointer outline-none">Süreç</button>
              <button onClick={() => scrollToSection('blog')} className="text-gray-600 hover:text-rose-500 font-medium transition cursor-pointer outline-none">Blog</button>
              <button onClick={() => scrollToSection('hakkimizda')} className="text-gray-600 hover:text-rose-500 font-medium transition cursor-pointer outline-none">Hakkımızda</button>
              <button onClick={() => scrollToSection('iletisim')} className="bg-rose-500 text-white px-5 py-2 rounded-full hover:bg-rose-600 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer outline-none">
                İletişim
              </button>
              
              {/* Cart Button with Context */}
              <div className="relative cursor-pointer group" onClick={toggleCart}>
                <div className="p-2 rounded-full hover:bg-rose-50 transition">
                   <ShoppingBag className="text-gray-600 group-hover:text-rose-500 transition" />
                </div>
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-rose-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-in zoom-in">
                    {cartCount}
                  </span>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4 z-50">
              <button onClick={toggleCart} className="relative text-gray-600 hover:text-rose-500 p-2 outline-none">
                <ShoppingBag size={24} />
                 {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-rose-500 p-2 outline-none">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute top-20 left-0 w-full shadow-xl animate-in slide-in-from-top-2">
            <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
              <button onClick={() => scrollToSection('anasayfa')} className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-rose-50 rounded-lg transition-colors font-medium outline-none">Anasayfa</button>
              <button onClick={() => scrollToSection('koleksiyon')} className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-rose-50 rounded-lg transition-colors font-medium outline-none">Koleksiyon</button>
              <button onClick={() => scrollToSection('tasarim')} className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-rose-50 rounded-lg transition-colors font-medium outline-none">Sihirli Mutfak</button>
              <button onClick={() => scrollToSection('siparissureci')} className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-rose-50 rounded-lg transition-colors font-medium outline-none">Süreç</button>
              <button onClick={() => scrollToSection('blog')} className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-rose-50 rounded-lg transition-colors font-medium outline-none">Blog</button>
              <button onClick={() => scrollToSection('hakkimizda')} className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-rose-50 rounded-lg transition-colors font-medium outline-none">Hakkımızda</button>
              <button onClick={() => scrollToSection('iletisim')} className="block w-full text-left px-4 py-3 text-rose-600 font-bold hover:bg-rose-50 rounded-lg transition-colors outline-none">İletişim</button>
            </div>
          </div>
        )}
      </nav>

      {/* --- Cart Drawer --- */}
      <CartDrawer />

      {/* --- Hero Section --- */}
      <section id="anasayfa" className="relative pt-24 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
           {/* Background decorative blobs */}
           <div className="absolute top-0 right-0 w-1/2 h-full bg-rose-100/40 rounded-l-[100px] transform translate-x-20"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-100/50 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center md:text-left">
              <div className="inline-block px-4 py-1.5 bg-rose-100 text-rose-600 rounded-full text-sm font-semibold tracking-wide uppercase mb-2">
                El Yapımı & Günlük Taze
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 leading-tight">
                Hayallerinizdeki Tadı <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500">Tasarlıyoruz</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-lg mx-auto md:mx-0">
                Eryaman'da en kaliteli malzemelerle hazırlanan butik pastalar, cupcake'ler ve özel gün tatlıları. Sizin hayaliniz, bizim sanatımız.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                <button onClick={() => scrollToSection('koleksiyon')} className="bg-rose-500 text-white px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl hover:bg-rose-600 transition flex items-center justify-center gap-2 outline-none">
                  Lezzetleri Keşfet <ChevronRight size={20}/>
                </button>
                <button 
                  onClick={() => setShowQuiz(true)}
                  className="bg-amber-100 text-amber-800 border border-amber-200 px-8 py-4 rounded-full font-medium hover:bg-amber-200 transition flex items-center justify-center gap-2 outline-none"
                >
                  <Gamepad2 size={20} /> Testi Çöz
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&q=80&w=800" 
                  alt="Özel Tasarım Pasta" 
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="font-serif text-2xl">Özel Gün Koleksiyonu</p>
                  <p className="text-white/90">Her dilimde mutluluk</p>
                </div>
              </div>
              {/* Decorative floating elements */}
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl animate-bounce hidden md:block">
                <div className="flex items-center gap-2">
                  <Star className="text-amber-400 fill-current" size={20} />
                  <span className="font-bold text-gray-800">4.9/5 Puan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Campaign Section (New) --- */}
      <CampaignSection campaign={ACTIVE_CAMPAIGN} onOrderClick={handleOrderClick} />

      {/* --- Order Steps (Process) --- */}
      <OrderSteps />

      {/* --- AI Designer Section --- */}
      <section id="tasarim" className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Sihirli Mutfağımız Sizin İçin Çalışsın</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                Henüz vitrinimizde olmayan bir hayaliniz mi var? Sihirli mutfak destekli tasarım aracımızla aklınızdaki pastayı oluşturun ve hemen sipariş verin.
                </p>
            </div>
            <AICakeDesigner onDesignSelect={handleCustomDesignOrder} />
        </div>
      </section>

      {/* --- Products Section --- */}
      <section id="koleksiyon" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Lezzet Koleksiyonumuz</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Her biri özenle hazırlanan tatlılarımızdan dilediğinizi seçin veya özel siparişiniz için bizimle iletişime geçin.
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 outline-none ${
                  activeCategory === cat.id
                    ? 'bg-rose-500 text-white shadow-md transform scale-105'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                <div className="relative overflow-hidden h-64">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-gray-900 font-bold px-3 py-1 rounded-full text-sm">
                    {product.price}
                  </div>
                  
                  {/* Instagram Button Overlay */}
                  <a 
                    href={product.instagramLink || CONTACT_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="absolute top-4 left-4 bg-white/90 backdrop-blur p-2 rounded-full text-rose-500 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-rose-500 hover:text-white transform -translate-y-2 group-hover:translate-y-0"
                    title="Instagram'da İncele"
                  >
                    <Instagram size={18} />
                  </a>

                </div>
                <div className="p-6">
                  <div className="text-xs text-rose-500 font-bold uppercase tracking-wider mb-2">
                    {CATEGORIES.find(c => c.id === product.category)?.name}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <button 
                      onClick={() => addToCart(product)}
                      className="text-gray-500 hover:text-rose-500 font-medium text-sm transition flex items-center gap-1 outline-none group-hover:text-rose-600"
                    >
                      <ShoppingBag size={16} /> Sepete Ekle
                    </button>
                    <button 
                      onClick={() => handleOrderClick(product)}
                      className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition shadow-lg hover:shadow-xl transform active:scale-95 outline-none"
                    >
                      Sipariş Ver
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Blog Section (New) --- */}
      <BlogSection posts={BLOG_POSTS} />

      {/* --- Instagram Gallery --- */}
      <InstagramGallery />

      {/* --- About Section --- */}
      <section id="hakkimizda" className="py-20 bg-rose-900 text-white relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="grid md:grid-cols-2 gap-16 items-center">
             <div>
               <img 
                  src="https://mjrshqlpomrezudlpmoj.supabase.co/storage/v1/object/sign/butik/562813289_18533579242025689_8921257982099440269_n.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xMTJiZDNlNC03N2U3LTRmZGUtOGNkOC1jYTQxNjc3ZDVhYTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJidXRpay81NjI4MTMyODlfMTg1MzM1NzkyNDIwMjU2ODlfODkyMTI1Nzk4MjA5OTQ0MDI2OV9uLmpwZyIsImlhdCI6MTc2NDUxOTEyNCwiZXhwIjoyMDc5ODc5MTI0fQ.W3hrFfgYMiCO0sHedErQsTjm8DZoFvwcVnovGMlVprE" 
                  alt="Mutfakta Üretim" 
                  className="rounded-2xl shadow-2xl rotate-3 hover:rotate-0 transition duration-500"
               />
             </div>
             <div>
               <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">İpek Butik Tatlar'ın Hikayesi</h2>
               <div className="space-y-4 text-rose-100">
                 <p>
                   2020 yılında Eryaman'daki küçük bir ev mutfağında başlayan yolculuğumuz, bugün yüzlerce mutlu müşteriye ulaşan bir tutkuya dönüştü. "İpek Butik Tatlar" olarak felsefemiz çok basit: <span className="font-bold text-white">Kendi çocuklarımıza yedirmediğimiz hiçbir şeyi müşterilerimize sunmuyoruz.</span>
                 </p>
                 <p>
                   Hazır kek karışımları, yapay tatlandırıcılar veya koruyucu maddeler mutfağımıza giremez. Her bir pasta, tıpkı bir sanat eseri gibi kişiye özel tasarlanır ve teslimat günü taptaze hazırlanır.
                 </p>
                 <div className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="border-l-4 border-rose-400 pl-4">
                        <p className="italic text-lg">"Mutluluk, taze pişmiş bir pastanın kokusunda saklıdır."</p>
                        <p className="mt-2 font-bold">— İpek Şef, Kurucu</p>
                      </div>
                    </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
      </section>

      {/* --- Testimonials --- */}
      <section className="py-20 bg-amber-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-12">Müşterilerimiz Ne Diyor?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <p className="text-gray-600 mb-6 italic">"{t.comment}"</p>
                <div className="font-bold text-gray-900">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Contact & CTA --- */}
      <section id="iletisim" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-rose-50 rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Hayalinizdeki Pastayı Tasarlayalım</h2>
              <p className="text-gray-600">
                Özel günleriniz için sipariş vermek veya fiyat bilgisi almak için aşağıdaki formu doldurun veya bize WhatsApp'tan ulaşın.
              </p>
            </div>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Mesajınız alındı! En kısa sürede dönüş yapacağız."); }}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adınız Soyadınız</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition" placeholder="Adınız" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefon Numaranız</label>
                  <input type="tel" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition" placeholder="0555..." required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Etkinlik Tarihi</label>
                <input type="date" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hayalinizdeki Pasta / Notunuz</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition" placeholder="Kaç kişilik, konsept nedir, özel istekleriniz..." required></textarea>
              </div>
              <button type="submit" className="w-full bg-rose-500 text-white font-bold py-4 rounded-lg hover:bg-rose-600 transition shadow-lg transform active:scale-95 flex items-center justify-center gap-2">
                <Send size={20} /> Teklif İste
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <span className="text-2xl font-serif font-bold text-white tracking-tight block mb-4">
                İpek<span className="text-rose-500">Butik</span>Tatlar
              </span>
              <p className="text-gray-400 max-w-sm mb-6">
                En özel günleriniz için sevgiyle hazırlanan, katkısız ve doğal butik pastalar. Mutluluğun tadını çıkarın.
              </p>
              <div className="flex space-x-4">
                <a href={CONTACT_INFO.instagramUrl} target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-2 rounded-full hover:bg-rose-500 hover:text-white transition"><Instagram size={20} /></a>
                <a href={`tel:${CONTACT_INFO.phone}`} className="bg-gray-800 p-2 rounded-full hover:bg-rose-500 hover:text-white transition"><Phone size={20} /></a>
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-rose-500 hover:text-white transition"><MapPin size={20} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Hızlı Erişim</h4>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('anasayfa')} className="hover:text-rose-400 transition outline-none">Anasayfa</button></li>
                <li><button onClick={() => scrollToSection('koleksiyon')} className="hover:text-rose-400 transition outline-none">Pastalar</button></li>
                <li><button onClick={() => scrollToSection('hakkimizda')} className="hover:text-rose-400 transition outline-none">Hakkımızda</button></li>
                <li><button onClick={() => scrollToSection('iletisim')} className="hover:text-rose-400 transition outline-none">İletişim</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">İletişim</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><MapPin size={16} className="text-rose-500"/> {CONTACT_INFO.address}</li>
                <li className="flex items-center gap-2"><Phone size={16} className="text-rose-500"/> {CONTACT_INFO.phone}</li>
                <li className="flex items-center gap-2"><Send size={16} className="text-rose-500"/> {CONTACT_INFO.email}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
            &copy; 2024 İpek Butik Tatlar. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>

      {/* --- Order Modal --- */}
      {showOrderModal && (
        <OrderModal 
          isOpen={showOrderModal} 
          onClose={() => setShowOrderModal(false)} 
          product={selectedProduct}
          customDesign={selectedCustomDesign}
        />
      )}

      {/* --- AI Chatbot Integration --- */}
      <AiChatBot />

      <FlavorQuiz 
        isOpen={showQuiz} 
        onClose={() => setShowQuiz(false)}
        onProductFound={(product) => {
          console.log("Bulunan ürün:", product.name);
        }}
      />
    </div>
  );
};

// App Bileşeni Provider ile sarmalanıyor
export default function App() {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
}