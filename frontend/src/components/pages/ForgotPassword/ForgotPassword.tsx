import { Form, Formik } from "formik";
import Button from "../../common/Button/Button";
import Input from "../../common/form/FormikInput/FormikInput";
import EmailSentModal from "../../common/modals/EmailSentModal/EmailSentModal";
import { useState } from "react";

const ForgotPassword = () => {
    const [show, setShow] = useState(false);
    const initialValues = {
        username: "",
    };
    const handleSubmit = () => {
        setShow(true);
        return;
    }
    return (
        <>
            <div className="onboard_card">
                <h2>Forgot Password</h2>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <Input placeholder="Username" name="username" />
                        <Button fluid type={"submit"}>Submit</Button>
                    </Form>
                </Formik>
            </div>
            <EmailSentModal
                show={show}
                handleClose={() => setShow(false)}
            />
        </>
    )
}

export default ForgotPassword
