import { Form, Formik } from "formik";
import Button from "../../common/Button/Button";
import Password from "../../common/form/Password/Password";

const ResetPassword = () => {
    const initialValues = {
        confirmPassword: "",
        password: "",
    };
    const handleSubmit = () => {
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
