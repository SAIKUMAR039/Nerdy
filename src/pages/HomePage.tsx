import React, { useState } from 'react';
import ToolCard from '../components/ToolCard';
import HistoryList from '../components/HistoryList';
import { tools } from '../config/tools';
import { Tool } from '../types';
import { Search } from 'lucide-react';

interface HomePageProps {
  onSelectTool: (tool: Tool) => void;
}

// Tool categories
const categories = {
  'Code Tools': ['code-analyzer', 'algorithm-optimizer', 'code-refactor'],
  'Social Media': ['tweets', 'hashtags', 'linkedin'],
  'Professional Writing': ['email', 'cover-letter', 'chat-response'],
  'Business & Planning': ['meeting-summary', 'business-idea', 'study-notes']
};

const HomePage: React.FC<HomePageProps> = ({ onSelectTool }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCategory = (categoryName: string, toolIds: string[]) => {
    const categoryTools = tools.filter(tool => toolIds.includes(tool.id))
      .filter(tool => 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

    if (searchQuery && categoryTools.length === 0) return null;

    return (
      <div key={categoryName} className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-indigo-900 flex items-center gap-2">
          {categoryName}
          <span className="text-sm font-normal text-gray-500">
            ({categoryTools.length} tools)
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryTools.map(tool => (
            <ToolCard 
              key={tool.id} 
              tool={tool} 
              onClick={onSelectTool}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="mb-12 md:mb-16 max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
          Nerdy AI Studio
        </h1>
        <p className="text-gray-600 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto px-4">
          Transform your ideas into professional content with our AI-powered tools
        </p>
        
        <div className="relative max-w-xl mx-auto px-4">
          <div className="absolute inset-y-0 left-4 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools..."
            className="w-full pl-11 pr-4 py-3 bg-white rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
      </section>

      <section className="mb-12 md:mb-16 px-2 md:px-0">
        {Object.entries(categories).map(([category, toolIds]) => 
          renderCategory(category, toolIds)
        )}
      </section>

      <section className="max-w-4xl mx-auto px-2 md:px-0">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 md:mb-6">Recent History</h2>
        <HistoryList />
      </section>
    </div>
  );
}

export default HomePage;