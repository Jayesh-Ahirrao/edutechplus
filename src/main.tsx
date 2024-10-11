import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';

const CLIENT_ID = "782125243852-vdc6p226ng7rsi7t40vvft8q0g83rh7r.apps.googleusercontent.com";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID || ""}>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
