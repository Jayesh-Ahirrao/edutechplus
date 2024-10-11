import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import useGoogleLogin from '../hooks/useGoogleLogin';

const Login = () => {
    const { handleSuccess, handleError } = useGoogleLogin();
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    return (
        <GoogleOAuthProvider clientId={clientId}>
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
