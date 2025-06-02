import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GeneratedContent } from '../types';
import { supabase } from '../services/supabase';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

interface ContentContextType {
  history: GeneratedContent[];
  addToHistory: (content: Omit<GeneratedContent, 'id' | 'timestamp'>) => Promise<void>;
  clearHistory: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<GeneratedContent[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadHistory();
    } else {
      setHistory([]);
    }
  }, [user]);

  const loadHistory = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('content_history')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: false })
        .limit(20);

      if (error) throw error;
      setHistory(data || []);
    } catch (error) {
      console.error('Error loading history:', error);
      toast.error('Failed to load history');
    }
  };

  const addToHistory = async (content: Omit<GeneratedContent, 'id' | 'timestamp'>) => {
    if (!user) return;

    try {
      const newContent = {
        ...content,
        user_id: user.id,
        timestamp: new Date().toISOString()
      };

      const { error } = await supabase
        .from('content_history')
        .insert([newContent]);

      if (error) throw error;

      await loadHistory();
      toast.success('Content saved to history');
    } catch (error) {
      console.error('Error saving to history:', error);
      toast.error('Failed to save to history');
    }
  };

  const clearHistory = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('content_history')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      setHistory([]);
      toast.success('History cleared');
    } catch (error) {
      console.error('Error clearing history:', error);
      toast.error('Failed to clear history');
    }
  };

  return (
    <ContentContext.Provider value={{ history, addToHistory, clearHistory }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContentContext() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContentContext must be used within a ContentProvider');
  }
  return context;
}