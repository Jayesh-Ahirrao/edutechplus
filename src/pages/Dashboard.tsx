import { useEffect, useState } from 'react';

const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    if (!user) {
        return <div>Loading...</div>; 
    }

    return (
        <div>
            <h1>Welcome, {user.name}</h1>
            <div>
                <h2>Your Dashboard</h2>
                <p>Here you can access your personalized data and stats.</p>
            </div>
        </div>
    );
};

export default Dashboard;
