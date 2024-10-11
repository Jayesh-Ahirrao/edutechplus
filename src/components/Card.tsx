// src/components/Card.tsx
import React, { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';

interface CardProps {
    id: number;
    title: string;
    thumbnailUrl: string;
    url: string;
    onUpdate: (id: number, newTitle: string) => void;
    onDelete: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ id, title, thumbnailUrl, url, onUpdate, onDelete }) => {
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
                className="w-full h-48 sm:h-64  object-cover"
            />
            <div className="p-4">
                {isEditing ? (
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                <div className="flex justify-between mt-4">
                    <div className="flex space-x-2">
                        {isEditing ? (
                            <button
                                onClick={handleSave}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
                            >
                                Save
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="border-none text-white px-4 py-2 rounded hover:bg-yellow-700 transition duration-300 flex items-center"
                            >
                                <FaRegEdit className="mr-1" /> Edit
                            </button>
                        )}
                    </div>
                    <button
                        onClick={() => onDelete(id)}
                        className="bg-red-500 border-none text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300 flex items-center"
                    >
                        <MdDeleteOutline className="mr-1" />
                    </button>
                </div>
            </div>
        </div>

    );
};

export default Card;
