
import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, Wand2, Image as ImageIcon, RotateCcw, Clock, AlertCircle } from 'lucide-react';
import { generateCakeDesign } from '../services/geminiService';
import { CustomDesign, DesignHistoryItem } from '../types';

interface AICakeDesignerProps {
  onDesignSelect: (design: CustomDesign) => void;
}

const DAILY_LIMIT = 3;
const STORAGE_KEY_LIMIT = 'ipek_cake_limit';
const STORAGE_KEY_HISTORY = 'ipek_cake_history';

export const AICakeDesigner: React.FC<AICakeDesignerProps> = ({ onDesignSelect }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  
  // State for Limit & History
  const [remainingCredits, setRemainingCredits] = useState(DAILY_LIMIT);
  const [history, setHistory] = useState<DesignHistoryItem[]>([]);

  // Load initial state from LocalStorage
  useEffect(() => {
    // 1. Check Daily Limit
    const limitData = localStorage.getItem(STORAGE_KEY_LIMIT);
    const today = new Date().toDateString();

    if (limitData) {
      const { date, count } = JSON.parse(limitData);
      if (date === today) {
        setRemainingCredits(Math.max(0, DAILY_LIMIT - count));
      } else {
        // Reset for new day
        localStorage.setItem(STORAGE_KEY_LIMIT, JSON.stringify({ date: today, count: 0 }));
        setRemainingCredits(DAILY_LIMIT);
      }
    } else {
      localStorage.setItem(STORAGE_KEY_LIMIT, JSON.stringify({ date: today, count: 0 }));
      setRemainingCredits(DAILY_LIMIT);
    }

    // 2. Load History
    const historyData = localStorage.getItem(STORAGE_KEY_HISTORY);
    if (historyData) {
      setHistory(JSON.parse(historyData));
    }
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt || remainingCredits <= 0) return;

    setLoading(true);
    setGeneratedImage(null);

    try {
      const base64Image = await generateCakeDesign(prompt);
      
      if (base64Image) {
        setGeneratedImage(base64Image);

        // Update Limit
        const today = new Date().toDateString();
        const currentCount = DAILY_LIMIT - remainingCredits + 1;
        localStorage.setItem(STORAGE_KEY_LIMIT, JSON.stringify({ date: today, count: currentCount }));
        setRemainingCredits(prev => prev - 1);

        // Update History
        const newItem: DesignHistoryItem = {
          id: Date.now(),
          image: base64Image,
          prompt: prompt,
          timestamp: Date.now()
        };
        
        const newHistory = [newItem, ...history].slice(0, 6); // Keep last 6 items
        setHistory(newHistory);
        localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(newHistory));
      }

    } catch (error) {
      console.error("Generation failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectHistory = (item: DesignHistoryItem) => {
    setGeneratedImage(item.image);
    setPrompt(item.prompt);
    // Smooth scroll to top preview
    window.scrollTo({ top: document.getElementById('designer-preview')?.offsetTop || 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-brand-pink/30 flex flex-col">
      
      <div className="flex flex-col md:flex-row min-h-[500px]">
        {/* Left Side: Input */}
        <div className="w-full md:w-1/3 bg-stone-50 p-8 flex flex-col border-r border-gray-100">
          <div className="mb-6">
            <div className="w-12 h-12 bg-brand-gold/10 text-brand-gold rounded-2xl flex items-center justify-center mb-4">
              <Wand2 size={24} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Hayalindeki Pastayı Tasarla</h3>
            <p className="text-gray-600 text-sm mb-4">
              Aklındaki pastayı tarif et, sihirli mutfak senin için saniyeler içinde görselleştirsin.
            </p>

            {/* Credit Info */}
            <div className={`p-3 rounded-lg border flex items-center gap-3 text-sm font-medium ${remainingCredits > 0 ? 'bg-blue-50 border-blue-100 text-blue-700' : 'bg-red-50 border-red-100 text-red-700'}`}>
               <Clock size={18} />
               <span>Günlük Kalan Hakkınız: {remainingCredits}/{DAILY_LIMIT}</span>
            </div>
          </div>

          <form onSubmit={handleGenerate} className="space-y-4 flex-grow flex flex-col">
            <div className="flex-grow">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Pasta Tarifi
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Örn: 3 katlı, pembe ve altın renklerinde, üzerinde taze şakayık çiçekleri olan zarif bir nişan pastası..."
                className="w-full h-32 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-pink focus:border-transparent outline-none resize-none text-sm bg-white shadow-sm"
                required
                disabled={remainingCredits === 0}
              />
            </div>
            
            {remainingCredits === 0 ? (
                <div className="text-center text-red-500 text-sm py-2">
                    <AlertCircle className="inline-block mr-1" size={16}/>
                    Bugünlük limitiniz doldu. Yarın tekrar bekleriz!
                </div>
            ) : (
                <button
                type="submit"
                disabled={loading || !prompt}
                className="w-full py-4 bg-brand-gold text-white rounded-xl font-bold shadow-lg shadow-amber-100 hover:bg-amber-700 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                {loading ? (
                    <>
                    <Loader2 className="animate-spin" size={20} /> Tasarlanıyor...
                    </>
                ) : (
                    <>
                    <Sparkles size={20} /> Görsel Oluştur
                    </>
                )}
                </button>
            )}
          </form>
        </div>

        {/* Right Side: Output */}
        <div id="designer-preview" className="w-full md:w-2/3 bg-white p-4 md:p-8 flex items-center justify-center relative min-h-[400px]">
          {loading ? (
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-brand-pink rounded-full border-t-transparent animate-spin"></div>
                  <Sparkles className="absolute inset-0 m-auto text-brand-gold animate-pulse" size={32} />
              </div>
              <p className="text-gray-500 font-medium animate-pulse">Sihirli mutfak çalışıyor...</p>
              <p className="text-xs text-gray-400 mt-2">Bu işlem birkaç saniye sürebilir.</p>
            </div>
          ) : generatedImage ? (
            <div className="w-full h-full flex flex-col animate-in zoom-in duration-500">
              <div className="relative flex-grow rounded-2xl overflow-hidden shadow-2xl border-4 border-white mb-6 group bg-gray-50 max-h-[500px]">
                <img 
                  src={generatedImage} 
                  alt="AI Generated Cake" 
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                      setGeneratedImage(null);
                      setPrompt('');
                  }}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition flex items-center justify-center gap-2"
                >
                  <RotateCcw size={18} /> Yeni Tasarım
                </button>
                <button
                  onClick={() => onDesignSelect({ image: generatedImage, prompt })}
                  className="px-8 py-3 bg-brand-darkPink text-white rounded-xl font-bold shadow-lg shadow-pink-200 hover:bg-rose-800 transition flex items-center justify-center gap-2"
                >
                  Bu Tasarımı Sipariş Ver <Wand2 size={18} />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-300">
              <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-gray-200">
                <ImageIcon size={48} />
              </div>
              <p className="text-lg font-medium text-gray-400">Henüz bir tasarım yok</p>
              <p className="text-sm">Sol taraftan hayalindeki pastayı tarif etmeye başla.</p>
            </div>
          )}
        </div>
      </div>

      {/* History Section */}
      {history.length > 0 && (
        <div className="bg-stone-50 border-t border-gray-200 p-6">
            <h4 className="font-serif font-bold text-gray-800 mb-4 flex items-center gap-2">
                <RotateCcw size={18} /> Önceki Tasarımların
            </h4>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {history.map((item) => (
                    <button 
                        key={item.id} 
                        onClick={() => handleSelectHistory(item)}
                        className="flex-shrink-0 w-32 group relative"
                    >
                        <div className="w-32 h-32 rounded-xl overflow-hidden border-2 border-white shadow-md hover:border-brand-gold transition-all">
                            <img src={item.image} alt="History" className="w-full h-full object-cover" />
                        </div>
                        <div className="mt-1 text-xs text-gray-500 truncate text-center px-1">
                            {new Date(item.timestamp).toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'})}
                        </div>
                    </button>
                ))}
            </div>
        </div>
      )}
    </div>
  );
};
