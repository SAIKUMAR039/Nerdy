import React, { useState } from 'react';
import { Sparkles, History, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import TokenDisplay from './TokenDisplay';

interface HeaderProps {
  onShowHistory: () => void;
  onHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ onShowHistory, onHome }) => {
  const { user, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={onHome}
              className="flex items-center gap-2 text-gray-900 hover:text-indigo-600 transition-colors"
            >
              <Sparkles className="h-6 w-6 text-indigo-600" />
              <span className="text-xl font-semibold">Nerdy</span>
            </button>
            <nav className="hidden md:flex items-center space-x-6">
              <button 
                onClick={onHome}
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Tools
              </button>
              <button
                onClick={onShowHistory}
                className="flex items-center gap-1.5 text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <History size={18} />
                History
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              {user && <TokenDisplay />}
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-gray-600 hidden lg:inline">{user.email}</span>
                  <button
                    onClick={() => signOut()}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Sign In
                </button>
              )}
            </div>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-indigo-600"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => {
                  onHome();
                  setMobileMenuOpen(false);
                }}
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Tools
              </button>
              <button
                onClick={() => {
                  onShowHistory();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-1.5 text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <History size={18} />
                History
              </button>
              {user && <TokenDisplay />}
              {user ? (
                <>
                  <span className="text-gray-600">{user.email}</span>
                  <button
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setShowAuthModal(true);
                    setMobileMenuOpen(false);
                  }}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </header>
  );
};

export default Header;