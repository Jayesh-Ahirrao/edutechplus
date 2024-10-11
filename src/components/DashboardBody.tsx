// DashboardBody.tsx
import React from 'react';
import { User } from '../constants/types';
import FactTile from '../components/FactTile';

interface DashboardBodyProps {
    user: User | null;
    catFacts: { fact: string }[]; // No change needed
}

const DashboardBody: React.FC<DashboardBodyProps> = React.memo(({ user, catFacts }) => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 md:p-8">
            <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl md:text-4xl font-bold mb-4 text-gray-800">
                    Welcome back, {user ? user.name : 'User'}
                </h1>
                <p className="text-lg text-start px-3 m-2 font-bold mt-8 mb-4">
                    Here’s some fun cat facts to brighten your day:
                </p>
                <div className="flex gap-2 flex-wrap text-start">
                    {catFacts.map((cat) => (
                        <FactTile fact={cat.fact} key={cat.fact} />
                    ))}
                </div>
            </div>
        </div>
    );
});

export default DashboardBody;
