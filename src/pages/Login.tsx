/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const handleSuccess = (response: any) => {
        const decoded = jwtDecode(response.credential);
        localStorage.setItem('user', JSON.stringify(decoded));
        navigate('/');
    };

    const handleError = () => {
        console.log('Login Failed');
        navigate('/login');
    };

    return (
        <GoogleOAuthProvider clientId="782125243852-vdc6p226ng7rsi7t40vvft8q0g83rh7r.apps.googleusercontent.com">
            <div className="flex justify-center items-center h-screen">
                <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleError}
                />
            </div>
        </GoogleOAuthProvider>
    );
};

export default Login;
