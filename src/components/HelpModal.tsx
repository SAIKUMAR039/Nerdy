import React, { useState } from 'react';
import { X } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const promptTips = [
    "Be specific about your audience (e.g., 'for marketing professionals' or 'for college students')",
    "Specify the tone you want (professional, casual, humorous, inspirational)",
    "Include context about the purpose of the content",
    "Mention specific keywords you want included",
    "Set length requirements (short, medium, or specific character/word counts)"
  ];

  const examples = {
    tweet: "Write a professional tweet about remote work productivity tips with 2 emojis and include a call to action",
    hashtags: "Generate 8 trending hashtags for content about sustainable fashion for Instagram",
    linkedin: "Write a LinkedIn post about a successful product launch that showcases leadership skills with a professional tone"
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">How to Get Better AI Responses</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>
          
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-medium mb-3">Crafting Effective Prompts</h3>
              <p className="text-gray-600 mb-4">
                The quality of AI-generated content depends significantly on your prompts.
                Here are some tips to get better results:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                {promptTips.map((tip, index) => (
                  <li key={index} className="text-gray-700">{tip}</li>
                ))}
              </ul>
            </section>
            
            <section>
              <h3 className="text-lg font-medium mb-3">Example Prompts</h3>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium mb-2">Twitter</h4>
                  <p className="text-gray-600">{examples.tweet}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium mb-2">Hashtags</h4>
                  <p className="text-gray-600">{examples.hashtags}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium mb-2">LinkedIn</h4>
                  <p className="text-gray-600">{examples.linkedin}</p>
                </div>
              </div>
            </section>
            
            <section>
              <h3 className="text-lg font-medium mb-3">Refining Your Results</h3>
              <p className="text-gray-600">
                If you're not satisfied with the initial results, try:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-gray-700">Adding more specific details to your prompt</li>
                <li className="text-gray-700">Changing the tone or style requested</li>
                <li className="text-gray-700">Breaking complex requests into multiple simpler ones</li>
                <li className="text-gray-700">Using the "Customize Prompt" option for more control</li>
              </ul>
            </section>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button 
              onClick={onClose}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;