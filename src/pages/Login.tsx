import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import useGoogleLogin from '../hooks/useGoogleLogin';

const Login = () => {
    const { handleSuccess, handleError } = useGoogleLogin();

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
