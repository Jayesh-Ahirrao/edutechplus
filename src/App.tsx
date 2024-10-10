import { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

interface User {
  name: string;
  email: string;
}

function App() {
  const [user] = useState<User | null>(getUserFromLocalStorage);

  // console.log(user);

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
  console.log(user);
  return user ? children : <Navigate to={navigateTo} replace />;
};

const getUserFromLocalStorage = () => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
};

export default App
