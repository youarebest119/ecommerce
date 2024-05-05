import { Form, Formik } from "formik";
import Button from "../../common/Button/Button";
import Input from "../../common/form/FormikInput/FormikInput";
import Password from "../../common/form/Password/Password";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../utils/constants";
import useLogin from "../../../hooks/useLogin";

const Login = () => {
    const loginUser = useLogin();
    const initialValues = {
        username: "",
        password: "",
    };
    const handleSubmit = async (values: typeof initialValues) => {
        await loginUser(values);
    }
    return (
        <>
            <div className="onboard_card">
                <h2>Login</h2>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <Input placeholder="Username" name="username" />
                        <Password name="password" placeholder="Password" />
                        <p className="ms-auto link_txt"><Link to={ROUTES.FORGOT_PASSWORD}>Forgot your password?</Link></p>
                        <Button fluid type={"submit"}>Submit</Button>
                        <p className="redirect_link">Don't have an account? <Link to={ROUTES.REGISTER}>Register Here</Link></p>
                    </Form>
                </Formik>
            </div>
        </>
    )
}

export default Login
