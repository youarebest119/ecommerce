import { Form, Formik } from "formik";
import Button from "../../common/Button/Button";
import Input from "../../common/form/FormikInput/FormikInput";
import Password from "../../common/form/Password/Password";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/constants";
import useRegister from "../../../hooks/useRegister";

const Register = () => {
    const navigate = useNavigate();
    const registerUser = useRegister();
    const initialValues = {
        username: "",
        email: "",
        password: "",
    };
    const handleSubmit = async (values: typeof initialValues) => {
        await registerUser(values)
        navigate(ROUTES.LOGIN);
        return;
    }
    return (
        <>
            <div className="onboard_card">
                <h2>Register</h2>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <Input placeholder="Email" type="email" name="email" />
                        <Input placeholder="Username" name="username" />
                        <Password name="password" placeholder="Password" />
                        <Button fluid type={"submit"}>Submit</Button>
                        <p className="redirect_link">Already have an account? <Link to={ROUTES.LOGIN}>Login Here</Link></p>
                    </Form>
                </Formik>
            </div>
        </>
    )
}

export default Register
