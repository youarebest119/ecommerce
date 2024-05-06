import { Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { apiPut } from "../../../services/axios.service";
import { API, ROUTES } from "../../../utils/constants";
import Button from "../../common/Button/Button";
import Password from "../../common/form/Password/Password";

const ResetPassword = () => {
    const navigate =useNavigate();
    const {token }  =useParams();
    const initialValues = {
        confirmPassword: "",
        password: "",
    };
    const handleSubmit = async (values: typeof initialValues) => {
         await apiPut<{ token: string, }>({
            url: API.RESET_PASSWORD.replace(":token", String(token)),
            data: values,
            showToast: true,
        });
        navigate(ROUTES.LOGIN);
        return;
    }
    return (
        <>
            <div className="onboard_card">
                <h2>Reset Password</h2>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <Password name="password" placeholder="Password" />
                        <Password name="confirmPassword" placeholder="Confirm Password" />
                        <Button fluid type={"submit"}>Update</Button>
                    </Form>
                </Formik>
            </div>
        </>
    )
}

export default ResetPassword
