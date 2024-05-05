import { useAppDispatch } from "../app/hooks";
import { setAuth, setUser } from "../features/slices/user.slice";
import { apiPost } from "../services/axios.service";
import { API } from "../utils/constants";

type LoginResponse = {
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

const useLogin = () => {
    const dispatch = useAppDispatch();
    const loginUser = async ({ username, password }: { username: string, password: string }) => {
        const response = await apiPost<{ data: LoginResponse, token: string, }>({ url: API.LOGIN, data: { username, password } })
        dispatch(setAuth(response.data.token));
        dispatch(setUser(response.data.data));
    };
    return loginUser;
}

export default useLogin
