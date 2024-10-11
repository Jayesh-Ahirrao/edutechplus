import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

interface User {
  name: string;
  email: string;
}

const HeroSection: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const handleNavigation = () => {
    console.log("from if: ", user);
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(() => JSON.parse(storedUser));
    } else {
      setUser(() => null);
    }
  }, []);

  console.log("state updated: ", user);

  return (
    <section id="home" className="h-screen bg-gray-100 flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Welcome to EduTech+
      </h1>
      <p className="text-xl mb-6">
        The future of learning, simplified.
      </p>
      <button
        onClick={handleNavigation}
        className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-700"
      >
        {user ? "Dashboard" : "Join Now"}
      </button>
    </section>
  );
};

export default HeroSection;
