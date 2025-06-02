import React, { useState } from 'react';
import { Tool } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ToolPage from './pages/ToolPage';
import HistoryPage from './pages/HistoryPage';
import ErrorBoundary from './components/ErrorBoundary';
import { ContentProvider } from './context/ContentContext';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

function App() {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const handleToolSelect = (tool: Tool) => {
    setSelectedTool(tool);
    setShowHistory(false);
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setSelectedTool(null);
    setShowHistory(false);
  };

  const handleShowHistory = () => {
    setSelectedTool(null);
    setShowHistory(true);
    window.scrollTo(0, 0);
  };

  return (
    <AuthProvider>
      <ContentProvider>
        <ErrorBoundary>
          <div className="flex flex-col min-h-screen bg-gray-50">
            <Header onShowHistory={handleShowHistory} onHome={handleBackToHome} />
            <main className="flex-grow">
              {showHistory ? (
                <HistoryPage />
              ) : selectedTool ? (
                <ToolPage tool={selectedTool} onBack={handleBackToHome} />
              ) : (
                <HomePage onSelectTool={handleToolSelect} />
              )}
            </main>
            <Footer />
            <Toaster position="top-right" />
          </div>
        </ErrorBoundary>
      </ContentProvider>
    </AuthProvider>
  );
}

export default App;