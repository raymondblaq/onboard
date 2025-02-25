import React from 'react';
import { motion } from 'framer-motion';

interface CodeBlock {
  language: string;
  code: string;
}

interface Section {
  title: string;
  content: string;
  code?: CodeBlock;
  examples?: string[];
}

interface DocsContentProps {
  title: string;
  content: string;
  sections: Section[];
  isDarkMode: boolean;
}

export default function DocsContent({ title, content, sections, isDarkMode }: DocsContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex-1 max-w-4xl"
    >
      <h1 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h1>
      <div className={`mb-12 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {content}
      </div>

      {sections.map((section, index) => (
        <motion.section
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`mb-12 p-6 rounded-xl backdrop-blur-lg ${
            isDarkMode
              ? 'bg-[#1a1a1a]/80 border border-[#333]'
              : 'bg-white/80 border border-gray-200'
          }`}
        >
          <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {section.title}
          </h2>
          <div className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {section.content}
          </div>

          {section.code && (
            <div className={`mt-6 rounded-lg overflow-hidden ${
              isDarkMode ? 'bg-[#111]' : 'bg-gray-900'
            }`}>
              <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800">
                <span className="text-sm text-gray-400">{section.code.language}</span>
                <button className="text-sm text-gray-400 hover:text-white transition-colors">
                  Copy
                </button>
              </div>
              <pre className="p-4 overflow-x-auto">
                <code className="text-sm text-gray-300">{section.code.code}</code>
              </pre>
            </div>
          )}

          {section.examples && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.examples.map((example, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-lg ${
                    isDarkMode
                      ? 'bg-[#111] border border-[#333] text-gray-300'
                      : 'bg-gray-50 border border-gray-200 text-gray-700'
                  }`}
                >
                  {example}
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      ))}
    </motion.div>
  );
}