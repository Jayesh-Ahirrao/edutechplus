// Dashboard.tsx
import React, { ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import DashboardBody from '../components/DashboardBody';
import { useCatFacts } from '../hooks/useCatFacts';
import { useUser } from '../hooks/useUser';
import showToast from '../utils/showToast';

interface Props {
    children?: ReactNode;
}

const Dashboard: React.FC<Props> = ({ children }) => {
    const { user, logout } = useUser(); 
    const { catFacts, loading, error } = useCatFacts();
    const navigate = useNavigate();

    const handleLogout = useCallback(async () => {
        await logout(); 
        navigate('/');
        window.dispatchEvent(new Event('storage'));
        showToast("Logged out successfully", "success");
    }, [logout, navigate]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="grid grid-cols-12 min-h-screen">
            <Sidebar user={user} onLogout={handleLogout} />
            <div className="col-span-10 md:col-span-9 custom-colspan min-h-screen">
                {children || <DashboardBody user={user} catFacts={catFacts} />}
            </div>
        </div>
    );
};

export default Dashboard;
