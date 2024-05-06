import { Form, Formik } from "formik";
import Button from "../../common/Button/Button";
import Input from "../../common/form/FormikInput/FormikInput";
import EmailSentModal from "../../common/modals/EmailSentModal/EmailSentModal";
import { useState } from "react";
import { apiPost } from "../../../services/axios.service";
import { API } from "../../../utils/constants";

const ForgotPassword = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const initialValues = {
        username: "",
    };
    const handleSubmit = async ({ username }: typeof initialValues) => {
        let response = await apiPost<{ email: string }>({
            url: API.FORGOT_PASSWORD,
            data: { username, },
        })
        setEmail(response.data.email);
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
                email={email}
                handleClose={() => setShow(false)}
            />
        </>
    )
}

export default ForgotPassword
