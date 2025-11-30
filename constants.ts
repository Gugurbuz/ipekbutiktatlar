
import { Product, Testimonial, Campaign } from './types';

export const CATEGORIES = [
  { id: 'all', name: 'Tümü' },
  { id: 'birthday', name: 'Doğum Günü' },
  { id: 'wedding', name: 'Düğün & Nişan' },
  { id: 'cupcake', name: 'Cupcake & Tatlılar' },
  { id: 'special', name: 'Özel Tasarım' }
];

export const CONTACT_INFO = {
    phone: "0555 123 45 67",
    whatsapp: "905551234567",
    address: "Eryaman, Etimesgut / Ankara",
    email: "bilgi@ipekbutiktatlar.com",
    instagramUrl: "https://www.instagram.com/ipekbutiktatlar/"
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Orman Meyveli Rüya",
    category: "birthday",
    price: "1200 TL",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=800",
    description: "Taze orman meyveleri ve özel pastacı kreması ile hazırlanan yumuşacık bir lezzet.",
    instagramLink: CONTACT_INFO.instagramUrl
  },
  {
    id: 2,
    name: "Elegant Düğün Pastası",
    category: "wedding",
    price: "3500 TL",
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=800",
    description: "3 katlı, şeker hamuru kaplamalı ve el yapımı yenilebilir çiçeklerle süslenmiş şaheser.",
    instagramLink: CONTACT_INFO.instagramUrl
  },
  {
    id: 3,
    name: "Çikolatalı Cupcake Seti",
    category: "cupcake",
    price: "450 TL",
    image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcf8?auto=format&fit=crop&q=80&w=800",
    description: "6'lı paket. Belçika çikolatası dolgulu ve üzerinde ganaj krema ile.",
    instagramLink: CONTACT_INFO.instagramUrl
  },
  {
    id: 4,
    name: "Unicorn Temalı Pasta",
    category: "birthday",
    price: "1400 TL",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800",
    description: "Çocukların favorisi! Rengarenk katmanlar ve el yapımı figürler.",
    instagramLink: CONTACT_INFO.instagramUrl
  },
  {
    id: 5,
    name: "Rustik Nişan Pastası",
    category: "wedding",
    price: "2800 TL",
    image: "https://images.unsplash.com/photo-1623428454614-abaf00244e52?auto=format&fit=crop&q=80&w=800",
    description: "Naked cake tarzında, taze çiçekler ve mevsim meyveleriyle süslenmiş doğal görünüm.",
    instagramLink: CONTACT_INFO.instagramUrl
  },
  {
    id: 6,
    name: "Makaron Kulesi",
    category: "cupcake",
    price: "950 TL",
    image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&q=80&w=800",
    description: "Rengarenk badem unlu makaronlardan oluşan şık bir sunum.",
    instagramLink: CONTACT_INFO.instagramUrl
  }
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: "Ayşe Yılmaz", comment: "Kızımın doğum günü için yaptırdığımız pasta hem görsel olarak şahaneydi hem de tadı damağımızda kaldı. Ellerinize sağlık!", rating: 5 },
  { id: 2, name: "Caner Erkin", comment: "Nişan pastamız tam istediğimiz gibi sade ve şıktı. İpek Hanım'ın ilgisi için çok teşekkürler.", rating: 5 },
  { id: 3, name: "Selin Demir", comment: "Cupcakeler ofis partimizin yıldızı oldu. Kesinlikle tekrar sipariş vereceğiz.", rating: 5 },
];

export const CAKE_FLAVORS = [
  "Vanilyalı & Çilekli",
  "Çikolatalı & Muzlu",
  "Çikolatalı & Frambuazlı",
  "Red Velvet",
  "Limonlu & Yaban Mersinli",
  "Havuçlu & Cevizli",
  "Karamelli & Krokanlı"
];

export const CAKE_SIZES = [
  { id: 1, label: "4-6 Kişilik (15cm)", priceMod: 0 },
  { id: 2, label: "8-10 Kişilik (18cm)", priceMod: 250 },
  { id: 3, label: "15-20 Kişilik (22cm)", priceMod: 500 },
  { id: 4, label: "25+ Kişilik (2 Katlı)", priceMod: 900 }
];

export const ACTIVE_CAMPAIGN: Campaign = {
  title: "Baharın Taze Dokunuşu",
  description: "Mevsimin en taze çilekleri ve hafif pastacı kremasıyla hazırlanan özel 'Bahar Koleksiyonu' şimdi %15 indirimli.",
  subtitle: "Sınırlı Sayıda",
  buttonText: "Koleksiyonu İncele",
  imageUrl: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=1600",
  products: [
    {
      id: 101,
      name: "Çilekli Charlotte",
      category: "birthday",
      price: "1350 TL",
      image: "https://images.unsplash.com/photo-1587242188619-74d7522d4f26?auto=format&fit=crop&q=80&w=600",
      description: "Kedi dili bisküviler ve bol çilek dolgusu ile klasik bir Fransız lezzeti.",
      instagramLink: CONTACT_INFO.instagramUrl
    },
    {
      id: 102,
      name: "Bahar Çiçekleri",
      category: "special",
      price: "1500 TL",
      image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80&w=600",
      description: "Yenilebilir çiçekler ve vanilya ganaj ile süslenmiş hafif bir bahar rüyası.",
      instagramLink: CONTACT_INFO.instagramUrl
    },
     {
      id: 103,
      name: "Limonlu Tart Pasta",
      category: "special",
      price: "1250 TL",
      image: "https://images.unsplash.com/photo-1519340333755-56e9c1d04579?auto=format&fit=crop&q=80&w=600",
      description: "Ekşi ve tatlının mükemmel uyumu, taze limon kremasıyla.",
      instagramLink: CONTACT_INFO.instagramUrl
    }
  ]
};