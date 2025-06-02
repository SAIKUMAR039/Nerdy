import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-6 border-t border-gray-200">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} AI Content Studio. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Terms</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;