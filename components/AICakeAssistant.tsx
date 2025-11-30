import React, { useState } from 'react';
import { Sparkles, Loader2, Send } from 'lucide-react';
import { getCakeSuggestion } from '../services/geminiService';
import { OrderSuggestion } from '../types';

export const AICakeAssistant: React.FC = () => {
  const [eventType, setEventType] = useState('');
  const [personCount, setPersonCount] = useState('');
  const [preferences, setPreferences] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<OrderSuggestion | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventType || !personCount) return;

    setLoading(true);
    setSuggestion(null);

    try {
      const result = await getCakeSuggestion(eventType, personCount, preferences);
      setSuggestion(result);
    } catch (error) {
      console.error("AI Error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-brand-pink/30">
      <div className="bg-brand-darkPink p-6 text-white text-center">
        <div className="flex justify-center mb-3">
          <Sparkles className="w-8 h-8 text-yellow-300" />
        </div>
        <h3 className="text-xl font-serif font-bold mb-2">Kararsız mısınız?</h3>
        <p className="text-sm opacity-90">
          Yapay zeka asistanımız size özel bir pasta konsepti oluştursun.
        </p>
      </div>

      <div className="p-6">
        {!suggestion ? (
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Etkinlik Nedir?</label>
              <select 
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-brand-pink outline-none"
                required
              >
                <option value="">Seçiniz...</option>
                <option value="Doğum Günü (Çocuk)">Doğum Günü (Çocuk)</option>
                <option value="Doğum Günü (Yetişkin)">Doğum Günü (Yetişkin)</option>
                <option value="Söz / Nişan">Söz / Nişan</option>
                <option value="Baby Shower">Baby Shower / Cinsiyet Partisi</option>
                <option value="Hediye / Kutlama">Hediye / Kutlama</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Kaç Kişilik?</label>
              <select 
                value={personCount}
                onChange={(e) => setPersonCount(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-brand-pink outline-none"
                required
              >
                <option value="">Seçiniz...</option>
                <option value="4-6 Kişilik">4-6 Kişilik (Butik)</option>
                <option value="8-10 Kişilik">8-10 Kişilik</option>
                <option value="15-20 Kişilik">15-20 Kişilik</option>
                <option value="25+ Kişilik">25+ Kişilik</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Özel İstekler (Opsiyonel)</label>
              <input 
                type="text"
                placeholder="Örn: Dinozorları sever, çikolata sevmez..."
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-brand-pink outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-gold hover:bg-amber-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
              Bana Fikir Ver
            </button>
          </form>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <div className="mb-4">
              <h4 className="text-brand-gold font-serif font-bold text-lg mb-1">İpek Şef'in Önerisi:</h4>
              <p className="text-sm italic text-gray-500 mb-4">"{suggestion.message}"</p>
              
              <div className="bg-brand-pink/20 p-4 rounded-lg mb-3">
                <span className="block text-xs font-bold text-brand-darkPink uppercase tracking-wider mb-1">Lezzet Profili</span>
                <p className="text-brand-text font-medium">{suggestion.flavor}</p>
              </div>
              
              <div className="bg-stone-100 p-4 rounded-lg">
                <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Tasarım Konsepti</span>
                <p className="text-gray-700">{suggestion.design}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => setSuggestion(null)}
                className="flex-1 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Yeni Fikir
              </button>
              <a 
                href={`https://wa.me/905551234567?text=Merhaba, yapay zeka asistanınızın önerdiği şu pastayı sipariş etmek istiyorum: ${encodeURIComponent(suggestion.design + ' - ' + suggestion.flavor)}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-green-500 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
              >
                <Send size={14} /> Siparişe Dönüştür
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};