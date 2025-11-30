
import React from 'react';
import { BlogPost } from '../types';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

interface BlogSectionProps {
  posts: BlogPost[];
}

export const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
  return (
    <section id="blog" className="py-20 bg-stone-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-gold font-bold tracking-widest text-xs uppercase mb-2 block">İpek Şef'in Kaleminden</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Blog & İpuçları</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Pastacılık sırları, özel gün önerileri ve mutfağımızdan en taze haberler.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full border border-gray-100">
              <div className="relative h-56 overflow-hidden">
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur text-xs font-bold text-brand-darkPink rounded-full shadow-sm">
                    {post.category}
                  </span>
                </div>
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-3 group-hover:text-brand-darkPink transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                <button className="flex items-center gap-2 text-sm font-bold text-brand-gold group-hover:text-brand-darkPink transition-colors mt-auto">
                  Devamını Oku <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
