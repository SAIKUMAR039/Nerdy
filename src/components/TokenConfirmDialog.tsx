import React from 'react';
import { Coins } from 'lucide-react';

interface TokenConfirmDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  tokenBalance: number;
}

const TokenConfirmDialog: React.FC<TokenConfirmDialogProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  tokenBalance
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-50 rounded-full">
            <Coins className="h-6 w-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Confirm Token Usage</h3>
        </div>
        
        <p className="text-gray-600 mb-6">
          This action will use 1 token from your balance. You currently have {tokenBalance} tokens remaining.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Confirm
          </button>
          <button
            onClick={onCancel}
            className="flex-1 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenConfirmDialog;