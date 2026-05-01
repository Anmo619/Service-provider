import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthProvider';
import LandingPage from './pages/LandingPage';
import BookingPage from './pages/BookingPage';
import Dashboard from './pages/Dashboard';
import AuthPage from './pages/AuthPage';
import RoleSelection from './pages/RoleSelection';
import Navbar from './components/Navbar';

function AppRoutes() {
  const { user, profile, loading } = useAuth();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fbfcfd] font-sans premium-gradient">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={user ? <Navigate to="/role-selection" /> : <AuthPage />} />
          <Route 
            path="/role-selection" 
            element={user ? (profile ? <Navigate to="/dashboard" /> : <RoleSelection />) : <Navigate to="/auth" />} 
          />
          <Route 
            path="/book/:categoryId" 
            element={user ? <BookingPage /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard /> : <Navigate to="/auth" />} 
          />
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
