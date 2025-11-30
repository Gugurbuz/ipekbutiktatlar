import { GoogleGenAI, Chat, Type } from "@google/genai";
import { OrderSuggestion } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

let chatSession: Chat | null = null;

export const startChat = () => {
  chatSession = ai.chats.create({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction: `Sen İpek Butik Tatlar pastanesinin yapay zeka asistanısın. Adın İpek Asistan.
      Yerimiz Ankara Eryaman'dadır.
      Ürünlerimiz %100 el yapımı, doğal ve kişiye özeldir.
      Fiyatlar hakkında yaklaşık bilgi verebilirsin:
      - Cupcake setleri: ~450 TL
      - Butik Pastalar: ~1200 TL'den başlar (kişi sayısı ve tasarıma göre artar)
      - Nişan Pastaları: ~2500 TL civarı
      
      Müşteriyle samimi, nazik ve iştah açıcı bir dille konuş.
      Sipariş almak için net bir formumuz yok ancak WhatsApp'a yönlendirebilirsin.
      Eğer kullanıcı özel bir tasarım isterse, hayalindeki pastayı tarif etmesini iste.`,
    }
  });
};

export const sendMessageToGemini = async (message: string) => {
  if (!chatSession) startChat();
  try {
    if (chatSession) {
        const response = await chatSession.sendMessage({ message });
        return response.text;
    }
    return "Bağlantı hatası.";
  } catch (error) {
    console.error("Gemini Chat Error", error);
    // If session expired or error, restart
    startChat();
    return "Şu an bağlantımda ufak bir sorun var, ama tatlılarımız harika! 🍰 Lütfen tekrar yazar mısın?";
  }
};

export const getCakeSuggestion = async (eventType: string, personCount: string, preferences: string): Promise<OrderSuggestion> => {
  const prompt = `Müşteri için pasta önerisi oluştur.
  Etkinlik: ${eventType}
  Kişi Sayısı: ${personCount}
  Tercihler: ${preferences}
  
  Lütfen JSON formatında şu alanlarla yanıt ver:
  - message: Müşteriye hitaben kısa, samimi bir öneri cümlesi.
  - flavor: Önerilen pasta içeriği ve aroması.
  - design: Önerilen pasta tasarımı ve süsleme detayları.
  
  Yanıtın dili Türkçe olmalıdır.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                message: { type: Type.STRING },
                flavor: { type: Type.STRING },
                design: { type: Type.STRING }
            },
            required: ["message", "flavor", "design"]
        }
      }
    });

    if (response.text) {
        return JSON.parse(response.text) as OrderSuggestion;
    }
    throw new Error("Empty response from AI");
  } catch (error) {
    console.error("AI Suggestion Error", error);
    return {
        message: "Size özel harika bir fikrimiz var!",
        flavor: "Çikolata ve Taze Meyveler",
        design: "Kişiye özel, konseptinize uygun şık bir butik pasta."
    };
  }
};

export const generateCakeDesign = async (prompt: string): Promise<string | null> => {
  try {
    // Enhance the prompt for high-end food photography results
    // Refined instructions for maximum realism and appetizing look
    const enhancedPrompt = `
      Generate a professional, high-definition photograph of a boutique cake described as: "${prompt}".
      
      CRITICAL VISUAL GUIDELINES:
      1.  **Photorealism**: The image MUST look like a real photo taken by a professional food photographer. No illustrations, no 3D renders, no cartoons.
      2.  **Lighting**: Soft, diffused natural window light coming from the side (rembrandt lighting) to create gentle highlights on the frosting and depth in shadows. Avoid harsh flash.
      3.  **Textures**:
          - Frosting/Buttercream: Must look creamy, smooth, or piped with visible texture, not plastic.
          - Sponge: If visible, must look moist, airy, and soft.
          - Glaze/Ganache: Glossy and reflective.
          - Fruits: Fresh, glistening with natural moisture.
      4.  **Camera**: Shot with a 50mm or 85mm prime lens at f/2.8. Sharp focus on the front details of the cake, with a creamy, soft background blur (bokeh).
      5.  **Setting**: An elegant, clean marble countertop or a rustic wooden table in a bright, airy patisserie environment. Neutral tones.
      6.  **Composition**: Centered or slightly off-center, plated on a beautiful ceramic cake stand or plate.
      
      NEGATIVE PROMPT (Implicit): Do not include text, watermarks, writing on the cake, blurry details, distorted shapes, oversaturated colors, plastic-looking surfaces, people, or hands.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: enhancedPrompt }],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64EncodeString: string = part.inlineData.data;
        return `data:image/png;base64,${base64EncodeString}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Generation Error", error);
    return null;
  }
};