import React, { useState, useEffect } from 'react';
import { Tool } from '../types';
import { HelpCircle } from 'lucide-react';

interface PromptEditorProps {
  tool: Tool;
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
}

interface TemplateVariable {
  name: string;
  value: string;
}

const PromptEditor: React.FC<PromptEditorProps> = ({ tool, onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState<string>(tool.promptTemplate);
  const [variables, setVariables] = useState<TemplateVariable[]>([]);
  const [isCustomPrompt, setIsCustomPrompt] = useState<boolean>(false);
  const [showTips, setShowTips] = useState<boolean>(false);

  useEffect(() => {
    const regex = /{([^}]+)}/g;
    const matches = [...tool.promptTemplate.matchAll(regex)];
    const extractedVars = matches.map(match => ({
      name: match[1],
      value: ''
    }));
    
    setVariables(extractedVars);
    setPrompt(tool.promptTemplate);
    setIsCustomPrompt(false);
  }, [tool]);

  const handleVariableChange = (index: number, value: string) => {
    const newVariables = [...variables];
    newVariables[index].value = value;
    setVariables(newVariables);
    
    if (!isCustomPrompt) {
      let newPrompt = tool.promptTemplate;
      newVariables.forEach(v => {
        newPrompt = newPrompt.replace(`{${v.name}}`, v.value || `{${v.name}}`);
      });
      setPrompt(newPrompt);
    }
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
    setIsCustomPrompt(true);
  };

  const handleGenerate = () => {
    if (isLoading) return;
    
    if (!isCustomPrompt && variables.some(v => !v.value)) {
      alert('Please fill in all template variables');
      return;
    }
    
    onGenerate(prompt);
  };

  const togglePromptMode = () => {
    setIsCustomPrompt(!isCustomPrompt);
    if (!isCustomPrompt) {
      // Switching to custom mode
    } else {
      // Switching back to template mode
      let newPrompt = tool.promptTemplate;
      variables.forEach(v => {
        newPrompt = newPrompt.replace(`{${v.name}}`, v.value || `{${v.name}}`);
      });
      setPrompt(newPrompt);
    }
  };

  const promptTips = {
    tweets: "Include trending topics, emotions, and clear CTAs",
    hashtags: "Mix popular and niche tags, avoid banned tags",
    linkedin: "Show thought leadership and industry expertise",
    email: "Maintain professional tone and clear structure",
    "study-notes": "Focus on key concepts and practical examples",
    "meeting-summary": "Prioritize action items and responsibilities",
    "cover-letter": "Align skills with job requirements",
    "chat-response": "Match tone to platform and context",
    "business-idea": "Address market gaps and scalability"
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-indigo-50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-indigo-900">Prompt Template</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTips(!showTips)}
            className="text-indigo-400 hover:text-indigo-600 transition-colors"
            title="Show writing tips"
          >
            <HelpCircle size={20} />
          </button>
          <button 
            onClick={togglePromptMode}
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            {isCustomPrompt ? 'Use Template' : 'Customize Prompt'}
          </button>
        </div>
      </div>

      {showTips && (
        <div className="mb-4 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
          <h3 className="font-medium mb-2 text-indigo-900">Writing Tips for {tool.name}</h3>
          <p className="text-sm text-indigo-700">{promptTips[tool.id as keyof typeof promptTips]}</p>
        </div>
      )}
      
      {!isCustomPrompt && (
        <div className="mb-4 space-y-4">
          {variables.map((variable, index) => (
            <div key={index} className="flex flex-col">
              <label className="block text-sm font-medium text-indigo-900 mb-1 capitalize">
                {variable.name.replace(/_/g, ' ')}:
              </label>
              <input 
                type="text"
                value={variable.value}
                onChange={(e) => handleVariableChange(index, e.target.value)}
                className="border border-indigo-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={`Enter ${variable.name.replace(/_/g, ' ')}`}
              />
            </div>
          ))}
        </div>
      )}
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-indigo-900 mb-1">
          {isCustomPrompt ? 'Custom Prompt' : 'Generated Prompt'}:
        </label>
        <textarea 
          value={prompt}
          onChange={handlePromptChange}
          disabled={!isCustomPrompt}
          className="w-full h-32 border border-indigo-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-indigo-50 disabled:text-indigo-700"
          placeholder="Enter your prompt here..."
        ></textarea>
      </div>
      
      <button 
        onClick={handleGenerate}
        disabled={isLoading}
        className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors
          ${isLoading 
            ? 'bg-indigo-400 cursor-not-allowed' 
            : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
      >
        {isLoading ? 'Generating...' : 'Generate Content'}
      </button>
    </div>
  );
};

export default PromptEditor;