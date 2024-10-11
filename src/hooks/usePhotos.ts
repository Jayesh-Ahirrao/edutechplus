import { useEffect, useState } from 'react';
import showToast from '../utils/showToast';
import { Photo } from '../constants/types';

export const usePhotos = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPhotos = async () => {
            const loadingToastId = showToast('Loading photos...', 'loading');

            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/photos');
                if (!response.ok) {
                    showToast('Failed to fetch photos. Please try again.', 'error', loadingToastId);
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

    return { photos, loading, error, setPhotos };
};
