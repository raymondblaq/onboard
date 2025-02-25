import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Book, ArrowLeft } from 'lucide-react';
import { documentationData } from '../lib/documentation';
import type { Documentation as DocType } from '../lib/types';
import DocsNavigation from '../components/DocsNavigation';
import DocsContent from '../components/DocsContent';

interface DocumentationProps {
  isDarkMode: boolean;
  onClose: () => void;
}

export default function Documentation({ isDarkMode, onClose }: DocumentationProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDoc, setActiveDoc] = useState<string | null>(null);
  const [docs, setDocs] = useState<DocType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for a smoother experience
    setTimeout(() => {
      setDocs(documentationData);
      if (documentationData.length > 0) {
        setActiveDoc(documentationData[0].slug);
      }
      setLoading(false);
    }, 500);
  }, []);

  const filteredDocs = docs.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeDocument = docs.find(doc => doc.slug === activeDoc);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 ${isDarkMode ? 'bg-black' : 'bg-white'}`}
    >
      <div className="h-full flex flex-col">
        {/* Hero Section */}
        <div className="relative h-48 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1548504773-429e84f586d2?q=80&w=3280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20" />
          </div>
          <div className="relative h-full flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div>
              <button
                onClick={onClose}
                className="mb-4 p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div className="flex items-center space-x-3">
                <Book className="w-8 h-8 text-[#ff5101]" />
                <h1 className="text-3xl font-bold text-white">Documentation</h1>
              </div>
            </div>
            <div className={`relative max-w-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documentation..."
                className="block w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 placeholder-gray-400 text-white focus:ring-2 focus:ring-[#ff5101]/20 focus:border-[#ff5101] focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="h-full flex gap-8">
              {/* Sidebar Navigation */}
              <DocsNavigation
                items={filteredDocs.map(doc => ({
                  title: doc.title,
                  slug: doc.slug,
                  isActive: doc.slug === activeDoc
                }))}
                onSelect={setActiveDoc}
                isDarkMode={isDarkMode}
              />

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto">
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center h-full"
                    >
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff5101]" />
                    </motion.div>
                  ) : activeDocument ? (
                    <DocsContent
                      key={activeDocument.slug}
                      title={activeDocument.title}
                      content={activeDocument.content}
                      sections={activeDocument.sections}
                      isDarkMode={isDarkMode}
                    />
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}