import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface NavItem {
  title: string;
  slug: string;
  isActive: boolean;
}

interface DocsNavigationProps {
  items: NavItem[];
  onSelect: (slug: string) => void;
  isDarkMode: boolean;
}

export default function DocsNavigation({ items, onSelect, isDarkMode }: DocsNavigationProps) {
  return (
    <nav className="w-64 space-y-2">
      {items.map((item) => (
        <motion.button
          key={item.slug}
          onClick={() => onSelect(item.slug)}
          className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between group transition-all duration-300 ${
            item.isActive
              ? 'bg-[#ff5101] text-white'
              : isDarkMode
                ? 'text-gray-300 hover:bg-[#1a1a1a]'
                : 'text-gray-700 hover:bg-gray-100'
          }`}
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="font-medium">{item.title}</span>
          <ChevronRight
            className={`w-4 h-4 transform transition-transform duration-300 ${
              item.isActive ? 'translate-x-1' : 'group-hover:translate-x-1'
            }`}
          />
        </motion.button>
      ))}
    </nav>
  );
}