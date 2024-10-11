import React from 'react';
import Card from './Card';
import { usePhotos } from '../hooks/usePhotos';

const CardList: React.FC = () => {
  const { photos, loading, error, setPhotos } = usePhotos();

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
