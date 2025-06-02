import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Coins, TrendingUp, Clock } from 'lucide-react';
import { initiateTokenPurchase } from '../services/stripe';

const TokenDisplay: React.FC = () => {
  const { tokens, user } = useAuth();
  const [showPurchase, setShowPurchase] = useState(false);

  const handlePurchase = async (amount: number) => {
    if (!user) return;
    try {
      await initiateTokenPurchase(user.id, amount);
    } catch (error) {
      console.error('Purchase error:', error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowPurchase(!showPurchase)}
        className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors group"
      >
        <Coins className="h-5 w-5 text-indigo-600 group-hover:scale-110 transition-transform" />
        <span className="font-medium text-indigo-900">{tokens} tokens</span>
      </button>

      {showPurchase && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-indigo-100 p-4 z-50">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-indigo-600" />
            <h3 className="font-medium text-indigo-900">Purchase Tokens</h3>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-indigo-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-indigo-600" />
                <span className="text-sm font-medium text-indigo-900">Monthly Reset</span>
              </div>
              <p className="text-xs text-indigo-700">
                You get 1000 free tokens at the start of each month!
              </p>
            </div>

            <button
              onClick={() => handlePurchase(100)}
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all transform hover:-translate-y-0.5"
            >
              <div className="text-sm font-medium">100 tokens</div>
              <div className="text-xs opacity-90">$40 • Best for starters</div>
            </button>
            
            <button
              onClick={() => handlePurchase(250)}
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all transform hover:-translate-y-0.5"
            >
              <div className="text-sm font-medium">250 tokens</div>
              <div className="text-xs opacity-90">$100 • Most popular</div>
            </button>
            
            <button
              onClick={() => handlePurchase(500)}
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all transform hover:-translate-y-0.5"
            >
              <div className="text-sm font-medium">500 tokens</div>
              <div className="text-xs opacity-90">$200 • Best value</div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenDisplay;