import React, { useState } from 'react';
import { Sparkles, ArrowRight, RotateCcw, Check, X } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface QuizProps {
  isOpen: boolean;
  onClose: () => void;
  onProductFound: (product: Product) => void;
}

// Sorular ve Puanlama Mantığı
const QUESTIONS = [
  {
    id: 1,
    text: "Canın tatlı çektiğinde ilk hangisini hayal edersin?",
    options: [
      { text: "Yoğun, akışkan bir çikolata", type: 'chocolate' },
      { text: "Taptaze, ferah meyveler", type: 'fruit' },
      { text: "Hafif, kremsi ve vanilyalı tatlar", type: 'cream' }
    ]
  },
  {
    id: 2,
    text: "Hangi mevsim seni daha çok yansıtır?",
    options: [
      { text: "Kışın sıcaklığı ve samimiyeti", type: 'chocolate' },
      { text: "Yazın enerjisi ve renkleri", type: 'fruit' },
      { text: "Baharın tazeliği ve çiçekleri", type: 'cream' }
    ]
  },
  {
    id: 3,
    text: "Bir pastada en sevmediğin şey nedir?",
    options: [
      { text: "Çok ağır ve bayıcı olması", type: 'fruit' },
      { text: "Yavan ve tatsız olması", type: 'chocolate' },
      { text: "Çok karışık aromalar", type: 'cream' }
    ]
  }
];

export const FlavorQuiz: React.FC<QuizProps> = ({ isOpen, onClose, onProductFound }) => {
  const [step, setStep] = useState(0); // 0: Intro, 1-3: Sorular, 4: Sonuç
  const [scores, setScores] = useState({ chocolate: 0, fruit: 0, cream: 0 });
  const [resultProduct, setResultProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const handleAnswer = (type: string) => {
    // Puanı güncelle
    const newScores = { ...scores, [type]: (scores as any)[type] + 1 };
    setScores(newScores);

    // Sonraki soruya geç veya sonucu hesapla
    if (step < QUESTIONS.length) {
      setStep(prev => prev + 1);
    } else {
      calculateResult(newScores);
    }
  };

  const calculateResult = (finalScores: any) => {
    // En yüksek puanı bulan basit mantık
    const winnerType = Object.keys(finalScores).reduce((a, b) => finalScores[a] > finalScores[b] ? a : b);
    
    // Kategoriye göre ürün eşleştirme (PRODUCTS listesinden rastgele veya sabit)
    let foundProduct: Product | undefined;

    if (winnerType === 'chocolate') {
        foundProduct = PRODUCTS.find(p => p.name.includes('Çikolata') || p.id === 3); 
    } else if (winnerType === 'fruit') {
        foundProduct = PRODUCTS.find(p => p.name.includes('Meyve') || p.name.includes('Çilek') || p.id === 1);
    } else {
        foundProduct = PRODUCTS.find(p => p.name.includes('Unicorn') || p.name.includes('Makaron') || p.id === 6);
    }

    setResultProduct(foundProduct || PRODUCTS[0]);
    setStep(4); // Sonuç ekranı
  };

  const resetQuiz = () => {
    setStep(0);
    setScores({ chocolate: 0, fruit: 0, cream: 0 });
    setResultProduct(null);
  };

  const handleAddToCart = () => {
    if (resultProduct) {
      addToCart(resultProduct);
      onProductFound(resultProduct);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-white rounded-3xl w-full max-w-lg relative shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        
        {/* Kapat Butonu */}
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition z-10">
          <X size={20} className="text-gray-500" />
        </button>

        {/* --- ADIM 0: GİRİŞ --- */}
        {step === 0 && (
          <div className="p-8 text-center flex flex-col items-center">
            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
              <Sparkles className="text-yellow-600" size={40} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">Ruh Eşin Olan Pastayı Bul!</h3>
            <p className="text-gray-600 mb-8">
              Kararsız mı kaldın? Sadece 3 soruda damak zevkine en uygun lezzeti senin için seçelim.
            </p>
            <button 
              onClick={() => setStep(1)}
              className="px-8 py-3 bg-rose-500 text-white rounded-full font-bold shadow-lg hover:bg-rose-600 hover:scale-105 transition-all flex items-center gap-2"
            >
              Testi Başlat <ArrowRight size={20} />
            </button>
          </div>
        )}

        {/* --- ADIM 1, 2, 3: SORULAR --- */}
        {step > 0 && step <= 3 && (
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold text-rose-500 tracking-widest uppercase">Soru {step} / 3</span>
                <div className="flex gap-1">
                    {[1,2,3].map(i => (
                        <div key={i} className={`h-2 w-8 rounded-full ${i <= step ? 'bg-rose-500' : 'bg-gray-200'} transition-all`}></div>
                    ))}
                </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-8 leading-snug">
              {QUESTIONS[step-1].text}
            </h3>

            <div className="space-y-3">
              {QUESTIONS[step-1].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option.type)}
                  className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-rose-400 hover:bg-rose-50 transition-all flex items-center justify-between group"
                >
                  <span className="font-medium text-gray-700 group-hover:text-rose-700">{option.text}</span>
                  <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 text-rose-500 transition-opacity transform group-hover:translate-x-1" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* --- ADIM 4: SONUÇ --- */}
        {step === 4 && resultProduct && (
          <div className="flex flex-col">
            <div className="bg-rose-500 p-8 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                <div className="relative z-10">
                    <p className="text-rose-100 text-sm font-bold uppercase mb-2 animate-in slide-in-from-top-2">Senin Lezzetin</p>
                    <h3 className="text-3xl font-serif font-bold animate-in slide-in-from-bottom-2">"{resultProduct.name}"</h3>
                </div>
            </div>
            
            <div className="p-8 text-center -mt-6">
                <div className="bg-white p-2 rounded-2xl shadow-xl inline-block mb-6 rotate-3 hover:rotate-0 transition-transform duration-500">
                    <img 
                        src={resultProduct.image} 
                        alt={resultProduct.name} 
                        className="w-48 h-48 object-cover rounded-xl"
                    />
                </div>
                
                <p className="text-gray-600 mb-6 px-4">
                    Verdiğin cevaplara göre; {resultProduct.description.toLowerCase()} tam sana göre!
                </p>

                <div className="flex flex-col gap-3">
                    <button 
                        onClick={handleAddToCart}
                        className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold shadow-lg hover:bg-gray-800 transition flex items-center justify-center gap-2"
                    >
                        <Check size={20} /> Hemen Sepete Ekle
                    </button>
                    <button 
                        onClick={resetQuiz}
                        className="w-full py-3 text-gray-500 font-medium hover:bg-gray-50 rounded-xl transition flex items-center justify-center gap-2"
                    >
                        <RotateCcw size={16} /> Testi Tekrar Çöz
                    </button>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};