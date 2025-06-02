import React from 'react';
import { Tool } from '../types';
import * as LucideIcons from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
  onClick: (tool: Tool) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onClick }) => {
  const IconComponent = LucideIcons[tool.icon as keyof typeof LucideIcons];
  
  return (
    <div 
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer border border-indigo-50 hover:border-indigo-200 group transform hover:-translate-y-1"
      onClick={() => onClick(tool)}
    >
      <div className="flex flex-col h-full">
        <div className="p-3 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl w-14 h-14 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          {IconComponent && <IconComponent className="h-7 w-7 text-indigo-600" />}
        </div>
        <h3 className="font-semibold text-xl mb-2 text-indigo-900 group-hover:text-indigo-600 transition-colors">{tool.name}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{tool.description}</p>
        <div className="flex items-center justify-between">
          <button 
            className="text-indigo-600 text-sm font-medium flex items-center group-hover:text-indigo-700 transition-colors"
          >
            Use Tool
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                clipRule="evenodd" 
              />
            </svg>
          </button>
          <div className="h-8 w-8 bg-indigo-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            {IconComponent && <IconComponent className="h-4 w-4 text-indigo-600" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;