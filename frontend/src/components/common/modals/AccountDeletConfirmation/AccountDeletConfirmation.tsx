import { Form, Formik } from "formik";
import { useState } from "react";
import Button from "../../Button/Button";
import Input from "../../form/Input/Input";
import CustomModal from "../CustomModal/CustomModal";
import "./AccountDeletConfirmation.scss";

const AccountDeletConfirmation = () => {
    const [show, setShow] = useState(false);
    const initialValues = {
        username: "",
    };
    const handleSubmit = () => {
        return;
    }

    return (
        <>
            <Button className="danger_btn" onClick={() => setShow(true)}>Delete</Button>
            <CustomModal
                show={show}
                handleClose={() => setShow(false)}
                title="Confirmation"
                className="account_delete_confirmation_modal"
            >
                <h3>{"Are you absolutely sure you want to delete your account?"}</h3>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <Input name="username" placeholder="Username" label="Type in the username of your account to confirm " />
                        <Button fluid className="mt-5 danger_btn" type={"submit"}>Continue</Button>
                    </Form>
                </Formik>
            </CustomModal>
        </>
    )
}

export default AccountDeletConfirmation
