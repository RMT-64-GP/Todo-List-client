# AI Tasks - Real-time Collaborative Todo List

A real-time collaborative todo list application built with React, Firebase, and WebSocket technology.

## Features

- ✅ **Real-time Collaboration**: Multiple users can work on the same todo list simultaneously
- 🤖 **AI-Powered Summaries**: Get intelligent task organization and summaries using Gemini AI
- 🔄 **Live Updates**: See changes instantly across all connected users
- 👥 **User Tracking**: See who created each task and who's currently online
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Express.js + Socket.io
- **Database**: Firebase Firestore
- **AI**: Google Gemini AI
- **Real-time**: WebSocket communication

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase project with Firestore enabled
- Google Gemini AI API key

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ai-tasks
   ```

2. **Install frontend dependencies**

   ```bash
   npm install
   ```

3. **Install server dependencies**

   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

### Running the Application

1. **Start the WebSocket server**

   ```bash
   cd server
   npm start
   ```

   The server will run on `http://localhost:3000`

2. **Start the frontend development server**

   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`

3. **Open your browser**
   Navigate to `http://localhost:5173` to use the application

## How It Works

1. **Real-time Collaboration**: Users connect via WebSocket and can see who's online
2. **Task Management**: Add, edit, delete, and mark tasks as complete
3. **Live Updates**: All changes are synchronized in real-time across all connected users
4. **AI Integration**: Use AI to get intelligent task summaries and organization
5. **User Attribution**: Each task shows who created it for better collaboration

## Project Structure

```
ai-tasks/
├── src/
│   ├── components/          # React components
│   ├── context/            # React context for state management
│   ├── lib/                # Firebase and AI configurations
│   ├── pages/              # Page components
│   └── App.jsx             # Main app component
├── server/                 # WebSocket server
│   ├── app.js             # Express + Socket.io server
│   └── package.json       # Server dependencies
└── package.json            # Frontend dependencies
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Test the functionality
4. Submit a pull request

## License

This project is licensed under the MIT License.
