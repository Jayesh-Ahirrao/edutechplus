import React, { useEffect, useState } from 'react';
import Card from './Card';
import { Photo } from '../constants/types';
import showToast from '../utils/showToast';



const CardList: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchPhotos = async () => {
      const loadingToastId = showToast('Loading photos...', 'loading');

      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/photos');
        if (!response.ok) {
          showToast('Failed to fetch photos. Please try again.', 'error' , loadingToastId);
          return;
        }
        const data = await response.json();
        setPhotos(data.slice(0, 20));
        showToast('Photos loaded successfully!', 'success', loadingToastId); 
      } catch (error) {
        showToast('Error fetching photos. Please check your connection.', 'error', loadingToastId);
        console.error('Error fetching photos:', error);
        setError("Error fetching photos");
      } finally {
        setLoading(false);
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


  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

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
