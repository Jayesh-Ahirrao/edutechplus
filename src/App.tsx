import { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MyCourses from './components/MyCourses';

interface User {
  name: string;
  email: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(getUserFromLocalStorage());
    };
    window.addEventListener('storage', handleStorageChange);
    setUser(getUserFromLocalStorage());
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);




  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <PrivateRoute user={(!user)} navigateTo="/">
                <Login />
              </PrivateRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute user={user} navigateTo='/login'>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/mycourses"
            element={
              <PrivateRoute user={user} navigateTo='/login'>
                <Dashboard >
                  <MyCourses />
                </Dashboard>
              </PrivateRoute>
            }
          />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>

    </>
  )
}

interface PrivateRouteProps {
  children: React.ReactNode;
  user: User | null | boolean;
  navigateTo?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, user, navigateTo = "/" }) => {
  return user ? children : <Navigate to={navigateTo} replace />;
};

const getUserFromLocalStorage = () => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
};

export default App
