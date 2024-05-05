import { useAppDispatch } from "../app/hooks";
import { setAuth, setUser } from "../features/slices/user.slice";
import { apiGet } from "../services/axios.service";
import { API } from "../utils/constants";

const useLogout = () => {
    const dispatch = useAppDispatch();
    const logoutUser = async () => {
        await apiGet({ url: API.LOGOUT })
        dispatch(setAuth(null));
        dispatch(setUser({
            profilePic: {
                url: "",
                id: ""
            },
            _id: "",
            email: "",
            username: "",
            isAdmin: false,
            createdAt: "",
            updatedAt: ""
        }));
    };
    return logoutUser;
}

export default useLogout
