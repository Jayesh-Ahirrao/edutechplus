// src/components/PhotosList.tsx
import React, { useEffect, useState } from 'react';
import Card from './Card';

interface Photo {
  id: number;
  title: string;
  thumbnailUrl: string;
  url: string;
}

const CardList: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch photos from the API
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/photos');
        const data = await response.json();
        setPhotos(data.slice(0, 20));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, []);

  const handleUpdate = (id: number, newTitle: string) => {
    setPhotos((prevPhotos) =>
      prevPhotos.map((photo) =>
        photo.id === id ? { ...photo, title: newTitle } : photo
      )
    );
  };
  const handleDelete = (id: number) => {
    setPhotos((prevPhotos) => prevPhotos.filter(photo => photo.id !== id));
  };


  if (loading) {
    return <div className="text-center text-gray-600">Loading photos...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">Photo Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <Card
            key={photo.id}
            id={photo.id}
            title={photo.title}
            thumbnailUrl={photo.thumbnailUrl}
            url={photo.url}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default CardList;
