# Nerdy AI Studio

A powerful AI-powered content generation platform that offers specialized tools for various content creation needs - from code analysis to professional writing.



## 🚀 Features

- **Multiple AI Tools**: Suite of specialized tools categorized by function:
  - **Code Tools**: Code analyzer, Algorithm optimizer, Code refactoring assistant
  - **Social Media**: Tweet generator, Hashtag generator, LinkedIn post creator
  - **Professional Writing**: Email composer, Cover letter generator, Chat response creator
  - **Business & Planning**: Meeting summary, Business idea generator, Study notes creator

- **Customizable Templates**: Each tool comes with carefully crafted prompt templates for targeted results

- **User Authentication**: Secure login and registration via Supabase

- **History Tracking**: Save and revisit previous content generations

- **Premium Features**: Subscription options for enhanced usage via Stripe integration

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **UI/Styling**: TailwindCSS
- **Backend Infrastructure**: Supabase
- **State Management**: React Context API
- **AI Integration**: Google Gemini 2.0 Flash model
- **Payment Processing**: Stripe
- **Build Tool**: Vite

## 📋 Prerequisites

- Node.js (v18+)
- npm or yarn
- Supabase account
- Google Gemini API key
- Stripe account (for payment features)

## 🔧 Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/nerdy-ai-studio.git
cd nerdy-ai-studio
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server
```bash
npm run dev
```

## 🏗️ Project Structure

```
src/
├── App.tsx                # Main application component
├── components/            # Reusable UI components
├── config/
│   └── tools.ts           # Tool definitions and prompt templates
├── context/               # React Context providers
├── pages/                 # Page components
├── services/              # API service integrations
└── types/                 # TypeScript type definitions
```

## 📊 Database Schema

The Supabase database includes the following tables:
- `users`: User information
- `content_history`: Saved content generations
- `subscriptions`: User subscription details

## 🧪 Running Tests

```bash
npm run test
```

## 🚢 Deployment

1. Build the production version:
```bash
npm run build
```

2. Deploy the `dist` directory to your preferred hosting service.

## 🔐 Environment Variables

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- API keys for Gemini and Stripe are defined in their respective service files

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👏 Acknowledgements

- [React](https://reactjs.org/)
- [Supabase](https://supabase.io/)
- [Google Gemini API](https://ai.google.dev/)
- [Stripe](https://stripe.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
