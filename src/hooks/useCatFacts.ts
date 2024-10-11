import { useEffect, useState } from 'react';
import axios from 'axios';
import showToast from '../utils/showToast';

export const useCatFacts = () => {
    const [catFacts, setCatFacts] = useState<{ fact: string }[]>([]); // Change from null to empty array
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCatFacts = async () => {
            try {
                const response = await axios.get('https://catfact.ninja/facts');
                setCatFacts(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                showToast('Failed to fetch cat facts. Please try again.', 'error');
                setError('Failed to fetch courses');
                setLoading(false);
            }
        };

        fetchCatFacts();
    }, []);

    return { catFacts, loading, error };
};
