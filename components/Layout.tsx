import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, MapPin, Phone, ShoppingBag } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { PageView } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageView; label: string }[] = [
    { id: 'home', label: 'Ana Sayfa' },
    { id: 'about', label: 'Hikayemiz' },
    { id: 'products', label: 'Ürünler' },
    { id: 'order', label: 'Sipariş Süreci' },
    { id: 'contact', label: 'İletişim' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-brand-text">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => onNavigate('home')}
          >
            <div className="w-10 h-10 bg-brand-pink rounded-full flex items-center justify-center text-brand-darkPink font-serif font-bold text-xl border-2 border-white shadow-sm">
              İ
            </div>
            <span className={`text-xl md:text-2xl font-serif font-bold ${scrolled ? 'text-brand-text' : 'text-brand-text md:text-white md:drop-shadow-md'}`}>
              İpek Butik Tatlar
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  currentPage === item.id 
                    ? 'text-brand-gold border-b-2 border-brand-gold' 
                    : scrolled ? 'text-gray-600 hover:text-brand-gold' : 'text-white hover:text-brand-pink drop-shadow-md'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-brand-text"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu className={scrolled ? 'text-gray-800' : 'text-gray-800 md:text-white'} />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 flex flex-col p-4 animate-in slide-in-from-top-5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMenuOpen(false);
                }}
                className={`py-3 text-left font-medium ${
                  currentPage === item.id ? 'text-brand-gold' : 'text-gray-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            <a 
              href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
              className="mt-4 bg-brand-darkPink text-white py-3 rounded-lg text-center font-medium flex items-center justify-center gap-2"
            >
              <Phone size={18} /> Sipariş Ver
            </a>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 py-12 border-t border-stone-800">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-serif text-white mb-4">İpek Butik Tatlar</h3>
            <p className="text-sm opacity-80 leading-relaxed mb-4">
              Ankara Eryaman'da en kaliteli malzemelerle, hijyenik koşullarda, sevgiyle hazırlanan ev yapımı butik pastalar.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-brand-darkPink transition-colors">
                <Instagram size={20} />
              </a>
              <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-green-600 transition-colors">
                <Phone size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-serif text-white mb-4">Hızlı Erişim</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNavigate('products')} className="hover:text-brand-pink transition-colors">Doğum Günü Pastaları</button></li>
              <li><button onClick={() => onNavigate('products')} className="hover:text-brand-pink transition-colors">Nişan & Söz</button></li>
              <li><button onClick={() => onNavigate('order')} className="hover:text-brand-pink transition-colors">Nasıl Sipariş Verilir?</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-brand-pink transition-colors">İletişim</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-serif text-white mb-4">İletişim</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <MapPin size={16} className="text-brand-gold" />
                {CONTACT_INFO.address}
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Phone size={16} className="text-brand-gold" />
                {CONTACT_INFO.phone}
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <ShoppingBag size={16} className="text-brand-gold" />
                Siparişler en az 3 gün önceden alınır.
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-stone-800 text-center text-xs opacity-50">
          &copy; {new Date().getFullYear()} İpek Butik Tatlar. Tüm hakları saklıdır.
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-green-600 hover:scale-110 transition-all z-40"
        aria-label="WhatsApp ile İletişime Geç"
      >
        <Phone size={28} />
      </a>
    </div>
  );
};