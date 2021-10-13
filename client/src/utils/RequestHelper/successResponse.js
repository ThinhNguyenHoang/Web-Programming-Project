import { toast } from 'react-toastify';

const excludedEndpoint = ['/resource/upload', '/common/user/sign-in'];

export const handleToastOnSuccess = (endPoint, response) => {
    if (!excludedEndpoint.includes(endPoint)) {
        toast.success(response.data.message, { autoClose: 2000 });
    }
};
