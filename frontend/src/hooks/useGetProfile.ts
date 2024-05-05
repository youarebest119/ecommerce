import { useAppDispatch } from "../app/hooks";
import { setUser } from "../features/slices/user.slice";
import { apiGet } from "../services/axios.service";
import { API } from "../utils/constants";


type ProfileResponse = {
    profilePic: {
        url: string,
        id: string,
    },
    _id: string,
    email: string,
    username: string,
    isAdmin: boolean,
    createdAt: string,
    updatedAt: string,
}

const useGetProfile = () => {
    const dispatch = useAppDispatch();
    const getUserProfile = async () => {
        const response = await apiGet<{ data: ProfileResponse, }>({ url: API.GET_USER_DETAILS })
        dispatch(setUser(response.data.data));
    }
    return getUserProfile;
}

export default useGetProfile
