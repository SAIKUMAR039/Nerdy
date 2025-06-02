import React from 'react';
import { GeneratedContent } from '../types';
import { useContentContext } from '../context/ContentContext';
import { tools } from '../config/tools';
import { Clock, Trash } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const HistoryList: React.FC = () => {
  const { history, clearHistory } = useContentContext();

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-400 bg-white rounded-xl shadow-md">
        <Clock className="h-12 w-12 mb-4 opacity-20" />
        <p>No history yet</p>
        <p className="text-sm">Generated content will appear here</p>
      </div>
    );
  }

  const formatDate = (timestamp: number | string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getToolIcon = (toolid: string) => {  // Changed from tool_id to toolid
    const tool = tools.find(t => t.id === toolid);
    if (!tool) return null;
    
    const IconComponent = LucideIcons[tool.icon as keyof typeof LucideIcons];
    return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
  };

  const getToolName = (toolid: string) => {  // Changed from tool_id to toolid
    const tool = tools.find(t => t.id === toolid);
    return tool ? tool.name : toolid;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-indigo-900">Content History</h2>
        {history.length > 0 && (
          <button 
            onClick={clearHistory}
            className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1 transition-colors"
          >
            <Trash size={14} />
            Clear All
          </button>
        )}
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {history.map(item => (
          <div key={item.id} className="border border-indigo-100 rounded-lg p-4 hover:bg-indigo-50/50 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                {getToolIcon(item.toolid)}  {/* Changed from tool_id to toolid */}
                <span className="text-sm font-medium text-indigo-900">{getToolName(item.toolid)}</span>  {/* Changed from tool_id to toolid */}
              </div>
              <div className="text-xs text-gray-500">
                {formatDate(item.timestamp)}
              </div>
            </div>
            <div className="text-sm text-gray-700 line-clamp-3 mb-2">{item.content}</div>
            <div className="text-xs text-gray-500 italic line-clamp-1">Prompt: {item.prompt}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryList