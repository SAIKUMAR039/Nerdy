import React, { useState } from 'react';
import { Tool } from '../types';
import { Copy, Save, FileText } from 'lucide-react';
import { useContentContext } from '../context/ContentContext';
import toast from 'react-hot-toast';

interface ContentOutputProps {
  tool: Tool;
  content: string;
  prompt: string;
  isLoading: boolean;
}

const ContentOutput: React.FC<ContentOutputProps> = ({ 
  tool, 
  content, 
  prompt, 
  isLoading 
}) => {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const { addToHistory } = useContentContext();

  const handleCopy = () => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('Content copied to clipboard');
  };

  const handleSave = async () => {
    if (!content) return;
    try {
      await addToHistory({
        toolid: tool.id,
        content,
        prompt
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      toast.success('Saved to history');
    } catch (error) {
      toast.error('Failed to save to history');
    }
  };

  const formatContent = (content: string) => {
    // Split content into sections based on ** ** markers
    const sections = content.split(/\*\*(.*?)\*\*/);
    
    return sections.map((section, index) => {
      if (index % 2 === 1) {
        // Section title
        return (
          <h3 key={index} className="text-lg font-semibold text-indigo-900 mt-6 mb-3">
            {section}
          </h3>
        );
      }

      // Handle code blocks and regular text within sections
      const blocks = section.split('```');
      return blocks.map((block, blockIndex) => {
        if (blockIndex % 2 === 1) { // Code block
          const [lang, ...code] = block.split('\n');
          return (
            <div key={`${index}-${blockIndex}`} className="my-4 rounded-lg overflow-hidden bg-gray-900">
              {lang && (
                <div className="bg-gray-800 px-4 py-2 text-gray-400 text-sm font-mono">
                  {lang}
                </div>
              )}
              <pre className="p-4 overflow-x-auto">
                <code className="text-gray-100 text-sm">{code.join('\n').trim()}</code>
              </pre>
            </div>
          );
        }

        // Regular text with bullet points and paragraphs
        return (
          <div key={`${index}-${blockIndex}`} className="space-y-2">
            {block.split('\n').map((line, lineIndex) => {
              if (!line.trim()) return null;
              
              if (line.startsWith('- ')) {
                return (
                  <div key={lineIndex} className="flex items-start gap-2 text-gray-700">
                    <span className="text-indigo-500 mt-1.5">•</span>
                    <span>{line.substring(2)}</span>
                  </div>
                );
              }

              return (
                <p key={lineIndex} className="text-gray-700">
                  {line}
                </p>
              );
            })}
          </div>
        );
      });
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-indigo-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-indigo-900 flex items-center gap-2">
          <FileText className="h-5 w-5 text-indigo-600" />
          Analysis Results
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={handleCopy}
            disabled={!content || isLoading}
            className={`p-2 rounded-lg transition-colors ${
              !content || isLoading
                ? 'text-gray-400 bg-gray-100'
                : copied
                ? 'text-green-600 bg-green-50'
                : 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'
            }`}
            title="Copy to clipboard"
          >
            <Copy size={16} />
          </button>
          <button
            onClick={handleSave}
            disabled={!content || isLoading}
            className={`p-2 rounded-lg transition-colors ${
              !content || isLoading
                ? 'text-gray-400 bg-gray-100'
                : saved
                ? 'text-green-600 bg-green-50'
                : 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'
            }`}
            title="Save to history"
          >
            <Save size={16} />
          </button>
        </div>
      </div>
      
      <div className={`overflow-y-auto max-h-[calc(100vh-300px)] ${content ? 'px-4' : ''}`}>
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : content ? (
          <div className="space-y-4">
            {formatContent(content)}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <div className="w-16 h-16 mb-4 rounded-full bg-indigo-50 flex items-center justify-center">
              <FileText className="h-8 w-8 text-indigo-400" />
            </div>
            <p className="text-center">Enter your input and click Generate to see the analysis</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentOutput;