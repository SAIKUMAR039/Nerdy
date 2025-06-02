import React, { useState, useCallback } from 'react';
import PromptEditor from '../components/PromptEditor';
import ContentOutput from '../components/ContentOutput';
import TokenConfirmDialog from '../components/TokenConfirmDialog';
import { Tool } from '../types';
import { generateContent } from '../services/gemini';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useContentContext } from '../context/ContentContext';
import { deductToken } from '../services/supabase';
import toast from 'react-hot-toast';

interface ToolPageProps {
  tool: Tool;
  onBack: () => void;
}

const ToolPage: React.FC<ToolPageProps> = ({ tool, onBack }) => {
  const [content, setContent] = useState<string>('');
  const [currentPrompt, setCurrentPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState<string>('');
  
  const { user, tokens, refreshTokens } = useAuth();
  const { addToHistory } = useContentContext();

  const handleGenerate = useCallback(async (prompt: string) => {
    if (!user) {
      toast.error('Please sign in to use this tool');
      return;
    }

    if (tokens < 1) {
      toast.error('Not enough tokens. Please purchase more.');
      return;
    }

    setPendingPrompt(prompt);
    setShowConfirm(true);
  }, [user, tokens]);

  const handleConfirmedGenerate = async () => {
    setShowConfirm(false);
    setIsLoading(true);
    setError(null);
    setCurrentPrompt(pendingPrompt);
    
    try {
      // Deduct token before generating content
      await deductToken(user!.id);
      
      const generatedContent = await generateContent(pendingPrompt);
      setContent(generatedContent);
      
      // Save to history
      await addToHistory({
        toolid: tool.id,
        content: generatedContent,
        prompt: pendingPrompt
      });

      // Refresh token balance
      await refreshTokens();
      
      toast.success('Content generated successfully!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
      setContent('');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle keyboard shortcuts
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBack();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onBack]);

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={onBack} 
        className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Tools
      </button>
      
      <h1 className="text-2xl font-bold mb-2 text-gray-900">{tool.name}</h1>
      <p className="text-gray-600 mb-8">{tool.description}</p>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PromptEditor 
          tool={tool} 
          onGenerate={handleGenerate} 
          isLoading={isLoading} 
        />
        <ContentOutput 
          tool={tool}
          content={content}
          prompt={currentPrompt}
          isLoading={isLoading}
        />
      </div>

      <TokenConfirmDialog
        isOpen={showConfirm}
        onConfirm={handleConfirmedGenerate}
        onCancel={() => setShowConfirm(false)}
        tokenBalance={tokens}
      />
    </div>
  );
};

export default ToolPage;