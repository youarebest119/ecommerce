import { apiPost } from "../services/axios.service";
import { API } from "../utils/constants";

const useRegister = () => {
    const registerUser = async (data: { email: string, username: string, password: string }) => {
        await apiPost({ url: API.REGISTER, data, showToast: true, })
    };
    return registerUser;
}

export default useRegister
