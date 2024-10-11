import React, { useEffect, useState } from 'react';
import axios from 'axios';
import showToast from '../utils/showToast';

interface Courses {
    id: number;
    title: string;
    image: string;
    rating: number;
    price: number;
    instructor_name: string;
}


const options = {
    method: 'POST',
    url: 'https://linkedin-data-api.p.rapidapi.com/posts/reposts',
    headers: {
        'x-rapidapi-key': 'Sign Up for Key',
        'x-rapidapi-host': 'linkedin-data-api.p.rapidapi.com',
        'Content-Type': 'application/json'
    },
    data: {
        urn: '7245786832909557760',
        page: 1,
        paginationToken: ''
    }
};

const MyCourses: React.FC = () => {
    const [courses, setCourses] = useState<Courses[] | null>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            const loadingToastId = showToast('Loading...', 'loading');

            try {
                const response = await axios.request(options);
                setCourses(response.data.item);
                setLoading(false);
            } catch (error) {
                console.error(error);
                showToast('Failed to fetch courses. Please try again.', 'error', loadingToastId);
                setError('Failed to fetch courses');
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>My Courses</h1>
            <ul>
                {courses?.map((course) => (
                    <li key={course.id}>{course.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default MyCourses;
