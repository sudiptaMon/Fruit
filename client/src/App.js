import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import HomePage from './components/home';
import ChatPage from './components/chatpage';
import TranslateA from './components/transelate';
import LoginForm from './components/login';
import { AuthProvider,useAuth } from './context/AuthContext';
import NotFound from './components/notfound';
import FaqPage from './components/faq';

// ProtectedRoute component to guard routes
const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
          <Route path="/chat" element={<ProtectedRoute element={<ChatPage />} />} />
          <Route path="/translate" element={<ProtectedRoute element={<TranslateA />} />} />
          <Route path="/faqs" element={<ProtectedRoute element={<FaqPage />} />} />
          <Route path="*" element={<NotFound />} /> 
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
