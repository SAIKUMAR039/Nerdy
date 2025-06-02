import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function checkAndUpdateMonthlyTokens(userId: string): Promise<void> {
  try {
    // First check if a record exists
    const { data: existingTokens, error: fetchError } = await supabase
      .from('user_tokens')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (fetchError) throw fetchError;

    const now = new Date();
    
    // If no record exists, create initial token record
    if (!existingTokens) {
      const { error: insertError } = await supabase
        .from('user_tokens')
        .insert([{
          user_id: userId,
          token_balance: 1000,
          last_reset: now.toISOString()
        }]);

      if (insertError) throw insertError;
      return;
    }

    // Check if we need to reset monthly tokens
    const lastReset = new Date(existingTokens.last_reset);
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    if (lastReset < firstDayOfMonth) {
      const { error: updateError } = await supabase
        .from('user_tokens')
        .update({
          token_balance: 1000,
          last_reset: now.toISOString()
        })
        .eq('user_id', userId);

      if (updateError) throw updateError;
    }
  } catch (error) {
    console.error('Error in checkAndUpdateMonthlyTokens:', error);
    throw error;
  }
}

export async function getTokenBalance(userId: string): Promise<number> {
  try {
    const { data, error } = await supabase
      .from('user_tokens')
      .select('token_balance')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return data?.token_balance ?? 0;
  } catch (error) {
    console.error('Error in getTokenBalance:', error);
    throw error;
  }
}

export async function deductToken(userId: string): Promise<void> {
  try {
    const { data: userTokens, error: fetchError } = await supabase
      .from('user_tokens')
      .select('token_balance')
      .eq('user_id', userId)
      .maybeSingle();

    if (fetchError) throw fetchError;

    if (!userTokens || userTokens.token_balance <= 0) {
      throw new Error('Insufficient tokens');
    }

    const { error: updateError } = await supabase
      .from('user_tokens')
      .update({ token_balance: userTokens.token_balance - 1 })
      .eq('user_id', userId);

    if (updateError) throw updateError;
  } catch (error) {
    console.error('Error in deductToken:', error);
    throw error;
  }
}