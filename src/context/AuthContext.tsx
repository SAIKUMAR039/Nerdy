import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, checkAndUpdateMonthlyTokens, getTokenBalance } from '../services/supabase';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  tokens: number;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshTokens: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        await loadUserTokens(session.user.id);
      } else {
        setUser(null);
        setTokens(0);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user);
        await loadUserTokens(session.user.id);
      } else {
        setUser(null);
        setTokens(0);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function loadUserTokens(userId: string) {
    try {
      await checkAndUpdateMonthlyTokens(userId);
      const balance = await getTokenBalance(userId);
      setTokens(balance);
    } catch (error) {
      console.error('Error loading tokens:', error);
      toast.error('Failed to load token balance');
    }
  }

  async function signUp(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        await checkAndUpdateMonthlyTokens(data.user.id);
        toast.success('Welcome! Please check your email to verify your account.');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      toast.error('Failed to sign up');
      throw error;
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;

      if (data.user) {
        await loadUserTokens(data.user.id);
        toast.success('Welcome back!');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      toast.error('Invalid login credentials');
      throw error;
    }
  }

  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear all state
      setUser(null);
      setTokens(0);
      
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
      throw error;
    }
  }

  async function refreshTokens() {
    if (!user) return;
    await loadUserTokens(user.id);
  }

  const value = {
    user,
    tokens,
    loading,
    signIn,
    signUp,
    signOut,
    refreshTokens,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}