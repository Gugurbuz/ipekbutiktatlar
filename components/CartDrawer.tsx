import React from 'react';
import { X, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { CONTACT_INFO } from '../constants';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, toggleCart, removeFromCart, cartTotal } = useCart();

  if (!isCartOpen) return null;

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;

    let message = "Merhaba İpek Butik Tatlar! 🍰 Web siteniz üzerinden şu ürünleri sipariş etmek istiyorum:\n\n";
    
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - ${item.price}\n`;
    });

    message += `\n*Toplam Tutar:* ${cartTotal.toLocaleString('tr-TR')} TL\n`;
    message += "\nSipariş detayları için yardımcı olabilir misiniz?";

    const url = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={toggleCart}
      ></div>

      {/* Drawer Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right-4 duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-rose-500" />
            <h2 className="text-xl font-serif font-bold text-gray-900">Sepetim ({cart.length})</h2>
          </div>
          <button 
            onClick={toggleCart}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60">
              <ShoppingBag size={64} className="text-gray-300" />
              <p className="text-lg font-medium text-gray-900">Sepetiniz henüz boş.</p>
              <p className="text-sm text-gray-500">Lezzetli koleksiyonumuza göz atmaya ne dersiniz?</p>
              <button 
                onClick={toggleCart}
                className="px-6 py-2 bg-rose-500 text-white rounded-full text-sm font-bold hover:bg-rose-600 transition"
              >
                Alışverişe Başla
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.cartId} className="flex gap-4 p-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:border-rose-100 transition-colors group">
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-rose-500 font-medium uppercase mt-1">{item.category}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="font-bold text-gray-900">{item.price}</span>
                    <button 
                      onClick={() => removeFromCart(item.cartId)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      title="Sepetten Çıkar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 bg-stone-50 border-t border-gray-100 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 font-medium">Ara Toplam</span>
              <span className="text-2xl font-serif font-bold text-rose-600">
                {cartTotal.toLocaleString('tr-TR')} TL
              </span>
            </div>
            <p className="text-xs text-gray-500 text-center">
              Kargo ve teslimat ücretleri WhatsApp görüşmesinde hesaplanacaktır.
            </p>
            <button 
              onClick={handleWhatsAppOrder}
              className="w-full py-4 bg-[#25D366] text-white rounded-xl font-bold hover:bg-[#128C7E] transition-all shadow-lg shadow-green-100 flex items-center justify-center gap-2 group"
            >
              <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
              WhatsApp ile Siparişi Tamamla
            </button>
          </div>
        )}
      </div>
    </div>
  );
};