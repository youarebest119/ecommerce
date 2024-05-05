import { apiPut } from '../services/axios.service';
import { API } from '../utils/constants';
import useGetProfile from './useGetProfile';

const useUpdateProfile = () => {
    const getUserProfile = useGetProfile();
    const updateProfile = async (details: { username?: string, email?: string }) => {
        await apiPut({ url: API.UPDATE_PROFILE, data: details, showToast: true });
        await getUserProfile();
    };
    return updateProfile;
}

export default useUpdateProfile
