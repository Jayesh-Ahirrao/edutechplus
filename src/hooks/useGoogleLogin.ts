import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { GoogleResponse } from '../constants/types';

const useGoogleLogin = () => {
    const navigate = useNavigate();

    const handleSuccess = (response: GoogleResponse) => {
        if (response.credential) {
            const decoded = jwtDecode(response.credential);
            localStorage.setItem('user', JSON.stringify(decoded));
            navigate('/');
            window.dispatchEvent(new Event('storage'));
        }
    };

    const handleError = () => {
        console.log('Login Failed');
        navigate('/login');
    };

    return { handleSuccess, handleError };
};

export default useGoogleLogin;
