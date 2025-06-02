import React, { useState } from 'react';
import { useContentContext } from '../context/ContentContext';
import { tools } from '../config/tools';
import { Clock, Trash, Filter, Copy, Calendar } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import toast from 'react-hot-toast';

const HistoryPage: React.FC = () => {
  const { history, clearHistory } = useContentContext();
  const [selectedTool, setSelectedTool] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('Content copied to clipboard');
  };

  const filteredHistory = history.filter(item => {
    const matchesTool = selectedTool ? item.toolid === selectedTool : true;
    const matchesSearch = searchQuery.toLowerCase()
      ? item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.prompt.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesTool && matchesSearch;
  });

  const getToolIcon = (toolid: string) => {
    const tool = tools.find(t => t.id === toolid);
    if (!tool) return null;
    const IconComponent = LucideIcons[tool.icon as keyof typeof LucideIcons];
    return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
  };

  const getToolName = (toolid: string) => {
    const tool = tools.find(t => t.id === toolid);
    return tool ? tool.name : toolid;
  };

  const formatDate = (timestamp: number | string) => {
    return new Date(timestamp).toLocaleString();
  };

  if (history.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center p-12 text-gray-400 bg-white rounded-xl shadow-md">
          <Clock className="h-16 w-16 mb-6 opacity-20" />
          <h2 className="text-2xl font-semibold mb-2 text-gray-600">No History Yet</h2>
          <p className="text-center text-gray-500">
            Start generating content with our AI tools and your history will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-900">Content History</h1>
        <button
          onClick={() => clearHistory()}
          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash size={18} />
          Clear History
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search in content and prompts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="w-full md:w-64">
            <select
              value={selectedTool}
              onChange={(e) => setSelectedTool(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Tools</option>
              {tools.map(tool => (
                <option key={tool.id} value={tool.id}>{tool.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredHistory.map(item => (
            <div key={item.id} className="border border-gray-100 rounded-xl p-5 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-indigo-50 rounded-lg">
                    {getToolIcon(item.toolid)}
                  </div>
                  <div>
                    <h3 className="font-medium text-indigo-900">
                      {getToolName(item.toolid)}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar size={14} />
                      <span>{formatDate(item.timestamp)}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(item.content)}
                  className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  title="Copy content"
                >
                  <Copy size={18} />
                </button>
              </div>
              <div className="mb-3 text-gray-700 whitespace-pre-wrap">
                {item.content}
              </div>
              <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                <strong>Prompt:</strong> {item.prompt}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;