import React from 'react';
import { CategoryId } from '../types/store';
import { Laptop, Tablet, Smartphone, Watch, Headphones, Sparkles } from 'lucide-react';

interface CategoryNavProps {
  activeCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const categories: { id: CategoryId; name: string; icon: React.ReactNode }[] = [
    { id: 'all', name: 'All Products', icon: <Sparkles className="w-6 h-6 stroke-[1.5]" /> },
    { id: 'iphone', name: 'iPhone', icon: <Smartphone className="w-6 h-6 stroke-[1.5]" /> },
    { id: 'mac', name: 'Mac', icon: <Laptop className="w-6 h-6 stroke-[1.5]" /> },
    { id: 'ipad', name: 'iPad', icon: <Tablet className="w-6 h-6 stroke-[1.5]" /> },
    { id: 'watch', name: 'Apple Watch', icon: <Watch className="w-6 h-6 stroke-[1.5]" /> },
    { id: 'airpods', name: 'AirPods', icon: <Headphones className="w-6 h-6 stroke-[1.5]" /> },
  ];

  return (
    <div className="w-full bg-[#F5F5F7] py-6 border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start md:justify-center gap-6 sm:gap-10 overflow-x-auto no-scrollbar py-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="flex flex-col items-center gap-2 group flex-shrink-0 focus:outline-none"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                    isActive
                      ? 'bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] text-[#0071E3] scale-105'
                      : 'bg-transparent text-[#1D1D1F]/70 hover:text-[#1D1D1F] hover:bg-white/60'
                  }`}
                >
                  {cat.icon}
                </div>
                <span
                  className={`text-xs tracking-tight transition-colors ${
                    isActive
                      ? 'font-semibold text-[#1D1D1F]'
                      : 'font-normal text-[#1D1D1F]/70 group-hover:text-[#1D1D1F]'
                  }`}
                >
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
