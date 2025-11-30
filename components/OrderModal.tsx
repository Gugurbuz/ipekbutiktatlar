import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Check, CreditCard, Banknote, Truck, Calendar, ChevronRight, ChevronLeft, Sparkles, MapPin, Phone, User, Info, MessageCircle } from 'lucide-react';
import { Product, OrderFormState, CustomDesign } from '../types';
import { CAKE_FLAVORS, CAKE_SIZES, CONTACT_INFO } from '../constants';

interface OrderModalProps {
  product?: Product | null;
  customDesign?: CustomDesign | null;
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  { id: 1, label: 'Özelleştir' },
  { id: 2, label: 'Bilgiler' },
  { id: 3, label: 'Ödeme' },
];

export const OrderModal: React.FC<OrderModalProps> = ({ product, customDesign, isOpen, onClose }) => {
  const [form, setForm] = useState<OrderFormState & { orderId?: string }>({
    step: 1,
    size: CAKE_SIZES[0].id, // Default to first size
    flavor: CAKE_FLAVORS[0],
    note: '',
    date: '',
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'credit_card',
    orderId: ''
  });

  // Calculate Prices
  const getBasePrice = () => {
    if (customDesign) return 0;
    if (!product?.price) return 0;
    return parseInt(product.price.replace(/[^0-9]/g, '')) || 0;
  };

  const getSizePrice = () => {
    return CAKE_SIZES.find(s => s.id === form.size)?.priceMod || 0;
  };

  const getTotalPrice = () => {
    return getBasePrice() + getSizePrice();
  };

  // Validation
  const isStepValid = () => {
    switch (form.step) {
      case 1:
        return true; // Size and flavor have defaults
      case 2:
        return form.name.trim().length > 2 && 
               form.phone.trim().length > 9 && 
               form.date !== '' && 
               form.address.trim().length > 10;
      case 3:
        return true; // Payment method has default
      default:
        return false;
    }
  };

  if (!isOpen) return null;

  const nextStep = () => {
    if (isStepValid()) {
      setForm(prev => ({ ...prev, step: (prev.step + 1) as any }));
    }
  };
  
  const prevStep = () => setForm(prev => ({ ...prev, step: (prev.step - 1) as any }));
  const handleChange = (key: keyof OrderFormState, value: any) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSubmitOrder = () => {
    // Generate Order ID just once
    const newOrderId = `#IPEK-${Math.floor(1000 + Math.random() * 9000)}`;
    setForm(prev => ({ ...prev, orderId: newOrderId }));
    
    setTimeout(() => {
      handleChange('step', 4);
    }, 1500);
  };

  // Display Data
  const displayImage = customDesign ? customDesign.image : product?.image;
  const displayName = customDesign ? "Kişiye Özel Tasarım" : product?.name;
  const totalPriceDisplay = customDesign 
    ? "Fiyat Teklifi Alınacak" 
    : `${getTotalPrice().toLocaleString('tr-TR')} TL`;

  const renderStepContent = () => {
    switch (form.step) {
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            {customDesign && (
              <div className="bg-brand-pink/10 p-4 rounded-xl border border-brand-pink/20 flex gap-4 items-start">
                <Sparkles className="text-brand-darkPink flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-brand-darkPink text-sm mb-1">Yapay Zeka Tasarımı</h4>
                  <p className="text-xs text-gray-600 italic">"{customDesign.prompt}"</p>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Pasta Boyutu</label>
              <div className="grid grid-cols-1 gap-3">
                {CAKE_SIZES.map(size => (
                  <button
                    key={size.id}
                    onClick={() => handleChange('size', size.id)}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                      form.size === size.id 
                      ? 'border-brand-gold bg-amber-50 ring-1 ring-brand-gold shadow-sm' 
                      : 'border-gray-200 hover:border-brand-gold/50 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex flex-col text-left">
                       <span className={`font-semibold ${form.size === size.id ? 'text-brand-gold' : 'text-gray-700'}`}>{size.label}</span>
                       <span className="text-xs text-gray-400">Yaklaşık Dilim Sayısı</span>
                    </div>
                    <div className="text-sm font-medium text-gray-600">
                        {size.priceMod === 0 ? 'Standart Fiyat' : `+${size.priceMod} TL`}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">İçerik & Aroma</label>
              <div className="relative">
                <select 
                    value={form.flavor} 
                    onChange={(e) => handleChange('flavor', e.target.value)}
                    className="w-full appearance-none p-4 bg-white border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-pink focus:border-brand-pink transition-all"
                >
                    {CAKE_FLAVORS.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    <ChevronRight className="rotate-90" size={16} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pasta Üzeri Yazı / Not</label>
              <input 
                type="text" 
                className="w-full p-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-pink focus:border-brand-pink transition-all"
                placeholder="Örn: İyi ki Doğdun Canım Oğlum"
                value={form.note}
                onChange={(e) => handleChange('note', e.target.value)}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <div className="bg-blue-50 p-4 rounded-xl flex gap-3 text-sm text-blue-800 border border-blue-100">
              <Info size={20} className="flex-shrink-0" />
              <span>Siparişlerinizi en erken 3 gün sonrası için oluşturabilirsiniz. Acil siparişleriniz için lütfen WhatsApp hattımızdan iletişime geçiniz.</span>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teslimat Tarihi <span className="text-red-500">*</span></label>
                <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                    type="date" 
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-pink"
                    value={form.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    min={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                    />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad <span className="text-red-500">*</span></label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                        type="text" 
                        placeholder="Adınız Soyadınız"
                        className="w-full pl-10 p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-pink"
                        value={form.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefon <span className="text-red-500">*</span></label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                        type="tel" 
                        placeholder="0555 555 55 55"
                        className="w-full pl-10 p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-pink"
                        value={form.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        />
                    </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teslimat Adresi (Eryaman İçi) <span className="text-red-500">*</span></label>
                <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                    <textarea 
                        rows={3}
                        className="w-full pl-10 p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-pink resize-none"
                        placeholder="Mahalle, Cadde, Sokak, Bina No, Daire No..."
                        value={form.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                    />
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Ödeme Yöntemi Seçiniz</label>
              <div className="space-y-3">
                {[
                  { id: 'credit_card', icon: CreditCard, title: 'Kredi / Banka Kartı', sub: 'Güvenli Online Ödeme (PayTR)' },
                  { id: 'transfer', icon: Banknote, title: 'Havale / EFT', sub: '%5 İndirimli' },
                  { id: 'door', icon: Truck, title: 'Kapıda Ödeme', sub: 'Nakit veya Kredi Kartı' }
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => handleChange('paymentMethod', method.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                      form.paymentMethod === method.id 
                      ? 'border-brand-gold bg-amber-50 ring-1 ring-brand-gold shadow-md' 
                      : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`p-3 rounded-full ${form.paymentMethod === method.id ? 'bg-white text-brand-gold' : 'bg-gray-100 text-gray-500'}`}>
                        <method.icon size={24} />
                    </div>
                    <div className="text-left">
                      <div className={`font-bold ${form.paymentMethod === method.id ? 'text-gray-900' : 'text-gray-700'}`}>{method.title}</div>
                      <div className="text-xs text-gray-500">{method.sub}</div>
                    </div>
                    {form.paymentMethod === method.id && <Check className="ml-auto text-brand-gold" size={20} />}
                  </button>
                ))}
              </div>
            </div>

            {form.paymentMethod === 'credit_card' && (
              <div className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 animate-in zoom-in duration-300">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-sm font-bold text-gray-700">Kart Bilgileri</h4>
                  <div className="flex gap-2">
                     <div className="h-6 w-10 bg-white rounded border border-gray-200 flex items-center justify-center text-[8px] font-bold text-blue-800 italic">VISA</div>
                     <div className="h-6 w-10 bg-white rounded border border-gray-200 flex items-center justify-center text-[8px] font-bold text-red-600">Master</div>
                  </div>
                </div>
                <div className="space-y-4">
                   <div>
                       <label className="text-xs font-semibold text-gray-500 uppercase ml-1 mb-1 block">Kart Numarası</label>
                       <div className="relative">
                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input type="text" placeholder="0000 0000 0000 0000" className="w-full pl-9 p-3 border border-gray-300 rounded-lg bg-white" disabled />
                       </div>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase ml-1 mb-1 block">SKT</label>
                        <input type="text" placeholder="AA/YY" className="w-full p-3 border border-gray-300 rounded-lg bg-white text-center" disabled />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase ml-1 mb-1 block">CVC</label>
                        <input type="text" placeholder="***" className="w-full p-3 border border-gray-300 rounded-lg bg-white text-center" disabled />
                      </div>
                   </div>
                </div>
                <p className="text-xs text-gray-400 mt-4 text-center flex items-center justify-center gap-1">
                    <Check size={12} /> 256-bit SSL ile korunmaktadır.
                </p>
              </div>
            )}
          </div>
        );
      case 4:
        const whatsappMessage = encodeURIComponent(
          `Merhaba İpek Butik Tatlar! 🍰 Web siteniz üzerinden bir sipariş oluşturdum.\n\n` +
          `*Sipariş No:* ${form.orderId}\n` +
          `*Ürün:* ${displayName}\n` +
          `*Boyut:* ${CAKE_SIZES.find(s => s.id === form.size)?.label}\n` +
          `*Aroma:* ${form.flavor}\n` +
          `*Tarih:* ${form.date}\n` +
          `*Ad Soyad:* ${form.name}\n` +
          `*Not:* ${form.note || 'Yok'}\n` +
          `*Adres:* ${form.address}\n` +
          `*Ödeme Yöntemi:* ${form.paymentMethod === 'credit_card' ? 'Kredi Kartı' : form.paymentMethod === 'transfer' ? 'Havale/EFT' : 'Kapıda Ödeme'}\n\n` +
          `Siparişimi onaylayabilir misiniz?`
        );
        
        return (
          <div className="text-center py-8 animate-in zoom-in duration-500 flex flex-col items-center justify-center h-full">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-100">
              <Check className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-3xl font-serif font-bold text-gray-900 mb-2">Sipariş Kaydı Oluşturuldu!</h3>
            <p className="text-gray-600 mb-6 max-w-sm mx-auto">
              Siparişiniz sisteme kaydedildi. Son bir adım kaldı: <br/> 
              <span className="font-semibold text-gray-900">Onay için WhatsApp üzerinden bildiriniz.</span>
            </p>
            
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 w-full mb-6">
               <div className="text-sm text-gray-500 mb-1">Sipariş Numaranız</div>
               <div className="font-mono font-bold text-2xl text-brand-gold tracking-widest">{form.orderId}</div>
            </div>

            <a 
              href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-8 py-4 bg-[#25D366] text-white rounded-xl font-bold hover:bg-[#128C7E] transition-all shadow-xl shadow-green-200 flex items-center justify-center gap-3 mb-4"
            >
              <MessageCircle size={24} /> 
              WhatsApp ile Onayla & Gönder
            </a>

            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-sm font-medium"
            >
              Ana Sayfaya Dön
            </button>
          </div>
        );
    }
  };

  // Use Portal to render modal at the end of document.body
  // This prevents z-index issues and ensures the modal is always on top.
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="bg-white rounded-3xl w-full max-w-5xl shadow-2xl relative flex overflow-hidden max-h-[90vh] flex-col md:flex-row animate-in zoom-in duration-200">
        
        {/* Left / Main Content */}
        <div className="flex-1 flex flex-col h-full bg-white relative z-10">
             {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-20">
                <div>
                    <h3 className="font-serif font-bold text-2xl text-gray-900">Sipariş Oluştur</h3>
                    <p className="text-sm text-gray-500">Adım {form.step} / 3</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors md:hidden"><X size={24} /></button>
            </div>

            {/* Content Scrollable */}
            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-grow">
                {renderStepContent()}
            </div>

            {/* Footer Actions */}
            {form.step !== 4 && (
            <div className="p-6 border-t border-gray-100 bg-white sticky bottom-0 z-20 flex justify-between items-center">
                {form.step > 1 ? (
                <button 
                    onClick={prevStep}
                    className="px-6 py-3 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition-colors flex items-center gap-2"
                >
                    <ChevronLeft size={20} /> Geri
                </button>
                ) : (
                <div></div>
                )}
                
                {form.step < 3 ? (
                <button 
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg ${
                        isStepValid() 
                        ? 'bg-brand-gold text-white hover:bg-amber-700 shadow-amber-200' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                    }`}
                >
                    Devam Et <ChevronRight size={20} />
                </button>
                ) : (
                <button 
                    onClick={handleSubmitOrder}
                    className="px-8 py-3 bg-green-600 text-white font-bold hover:bg-green-700 rounded-xl transition-all shadow-lg shadow-green-200 flex items-center gap-2"
                >
                    Siparişi Onayla <Check size={20} />
                </button>
                )}
            </div>
            )}
        </div>

        {/* Right / Summary Sidebar (Desktop Only) */}
        {form.step !== 4 && (
            <div className="hidden md:flex w-80 bg-stone-50 border-l border-gray-100 flex-col p-6 shadow-[inset_10px_0_20px_-10px_rgba(0,0,0,0.02)]">
                <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-200 rounded-full text-gray-400 hover:text-gray-600 transition-colors"><X size={20} /></button>
                
                <h4 className="font-serif font-bold text-lg text-gray-900 mb-6 flex items-center gap-2">
                    <Sparkles size={18} className="text-brand-gold" /> Sipariş Özeti
                </h4>

                {/* Product Card Mini */}
                <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 mb-6">
                    <div className="w-full h-32 rounded-lg overflow-hidden mb-3 relative">
                        <img src={displayImage} alt={displayName} className="w-full h-full object-cover" />
                    </div>
                    <div className="font-bold text-gray-900">{displayName}</div>
                    <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {customDesign ? customDesign.prompt : product?.description}
                    </div>
                </div>

                {/* Details List */}
                <div className="space-y-4 flex-grow text-sm">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-500">Boyut</span>
                        <span className="font-medium text-gray-900">{CAKE_SIZES.find(s => s.id === form.size)?.label.split(' ')[0]}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-500">İçerik</span>
                        <span className="font-medium text-gray-900 truncate max-w-[120px]">{form.flavor}</span>
                    </div>
                    {form.date && (
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                            <span className="text-gray-500">Teslimat</span>
                            <span className="font-medium text-gray-900">{new Date(form.date).toLocaleDateString('tr-TR')}</span>
                        </div>
                    )}
                </div>

                {/* Total Price */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex justify-between items-end mb-1">
                        <span className="text-gray-500 text-sm">Toplam Tutar</span>
                        <span className="text-2xl font-serif font-bold text-brand-darkPink">{totalPriceDisplay}</span>
                    </div>
                    <p className="text-[10px] text-gray-400 text-right">KDV Dahildir</p>
                </div>
            </div>
        )}
      </div>
    </div>,
    document.body
  );
};