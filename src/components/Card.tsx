// src/components/Card.tsx
import React, { useState } from 'react';

interface CardProps {
    id: number;
    title: string;
    thumbnailUrl: string;
    url: string;
    onUpdate: (id: number, newTitle: string) => void;
}

const Card: React.FC<CardProps> = ({ id, title, thumbnailUrl, url, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(title);

    const handleSave = () => {
        onUpdate(id, newTitle); // Pass the updated title back to the parent
        setIsEditing(false);
    };

    return (
        <div className="card bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 m-4">
            <img
                src={thumbnailUrl}
                alt={title}
                className="w-full h-48 sm:h-64 md:h-72 lg:h-80 object-cover"
            />
            <div className="p-4">
                {isEditing ? (
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                ) : (
                    <h2 className="text-lg font-bold text-gray-800 truncate">{title}</h2>
                )}
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline mt-2 block"
                >
                    View full image
                </a>
                {isEditing ? (
                    <button
                        onClick={handleSave}
                        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Save
                    </button>
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700"
                    >
                        Edit
                    </button>
                )}
            </div>
        </div>
    );
};

export default Card;
