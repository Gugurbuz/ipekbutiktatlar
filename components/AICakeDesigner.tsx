import React, { useState } from 'react';
import { Sparkles, Loader2, Wand2, Image as ImageIcon, RotateCcw } from 'lucide-react';
import { generateCakeDesign } from '../services/geminiService';
import { CustomDesign } from '../types';

interface AICakeDesignerProps {
  onDesignSelect: (design: CustomDesign) => void;
}

export const AICakeDesigner: React.FC<AICakeDesignerProps> = ({ onDesignSelect }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;

    setLoading(true);
    setGeneratedImage(null);

    try {
      const base64Image = await generateCakeDesign(prompt);
      setGeneratedImage(base64Image);
    } catch (error) {
      console.error("Generation failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-brand-pink/30 flex flex-col md:flex-row h-full md:min-h-[500px]">
      
      {/* Left Side: Input */}
      <div className="w-full md:w-1/3 bg-stone-50 p-8 flex flex-col justify-center border-r border-gray-100">
        <div className="mb-6">
          <div className="w-12 h-12 bg-brand-gold/10 text-brand-gold rounded-2xl flex items-center justify-center mb-4">
            <Wand2 size={24} />
          </div>
          <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Hayalindeki Pastayı Tasarla</h3>
          <p className="text-gray-600 text-sm">
            Aklındaki pastayı tarif et, yapay zeka senin için saniyeler içinde görselleştirsin.
          </p>
        </div>

        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Pasta Tarifi
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Örn: 3 katlı, pembe ve altın renklerinde, üzerinde taze şakayık çiçekleri olan zarif bir nişan pastası..."
              className="w-full h-32 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-pink focus:border-transparent outline-none resize-none text-sm bg-white shadow-sm"
              required
            />
          </div>
          
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
        </form>
      </div>

      {/* Right Side: Output */}
      <div className="w-full md:w-2/3 bg-white p-4 md:p-8 flex items-center justify-center relative">
        {loading ? (
           <div className="text-center">
             <div className="relative w-24 h-24 mx-auto mb-4">
                <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-brand-pink rounded-full border-t-transparent animate-spin"></div>
                <Sparkles className="absolute inset-0 m-auto text-brand-gold animate-pulse" size={32} />
             </div>
             <p className="text-gray-500 font-medium animate-pulse">Sihirli fırın çalışıyor...</p>
             <p className="text-xs text-gray-400 mt-2">Bu işlem birkaç saniye sürebilir.</p>
           </div>
        ) : generatedImage ? (
          <div className="w-full h-full flex flex-col animate-in zoom-in duration-500">
            <div className="relative flex-grow rounded-2xl overflow-hidden shadow-2xl border-4 border-white mb-6 group">
              <img 
                src={generatedImage} 
                alt="AI Generated Cake" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                 onClick={() => setGeneratedImage(null)} // Reset to generate again
                 className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition flex items-center justify-center gap-2"
              >
                <RotateCcw size={18} /> Tekrar Dene
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
  );
};