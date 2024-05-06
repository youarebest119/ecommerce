import { Form, Formik } from "formik";
import { apiPut } from "../../../services/axios.service";
import { API } from "../../../utils/constants";
import Button from "../../common/Button/Button";
import Password from "../../common/form/Password/Password";

const ResetPassword = () => {
    const initialValues = {
        confirmPassword: "",
        password: "",
    };
    const handleSubmit = async (values: typeof initialValues) => {
        const response = await apiPut({
            url: API.RESET_PASSWORD,
            data: values,
        })
        console.log('response', response);
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
