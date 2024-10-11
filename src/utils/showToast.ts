import toast from 'react-hot-toast';

type ToastType = 'error' | 'success' | 'info' | 'loading';


const showToast = (message: string, type: ToastType = 'error', id: string = "default"): string => {
    let toastId: string = id;

    switch (type) {
        case 'error':
            toastId = toast.error(message, { id: toastId });
            break;
        case 'success':
            toastId = toast.success(message, { id: toastId });
            break;
        case 'info':
            toastId = toast(message, { id: toastId });
            break;
        case 'loading':
            toastId = toast.loading(message, { id: toastId });
            break;
        default:
            toastId = toast(message, { id: toastId });
            break;
    }

    return toastId;
};


export default showToast;