import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <GoogleOAuthProvider clientId="404430453921-vs6stod9p9g97n7q2f43pibk5qml25vc.apps.googleusercontent.com">
  <AuthProvider>
  <App />
  </AuthProvider>
  </GoogleOAuthProvider>
  </React.StrictMode>,
)
