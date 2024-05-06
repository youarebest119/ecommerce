import { Form, Formik } from "formik";
import { useState } from "react";
import { apiPut } from "../../../../services/axios.service";
import { API } from "../../../../utils/constants";
import Button from "../../Button/Button";
import Password from "../../form/Password/Password";
import CustomModal from "../CustomModal/CustomModal";
import "./ChangePasswordModal.scss";

const ChangePasswordModal = () => {
    const [show, setShow] = useState(false);
    const initialValues = {
        newPassword: "",
        confirmPassword: "",
        oldPassword: "",
    };
    const handleSubmit = async (values: typeof initialValues) => {
        await apiPut({
            url: API.UPDATE_PASSWORD,
            data: values,
            showToast: true,
        });
        setShow(false);
        return;
    }

    return (
        <>
            <button className="change_password_btn" onClick={() => setShow(true)}>Change your password.</button>
            <CustomModal
                show={show}
                handleClose={() => setShow(false)}
                title="Change your password"
                className="change_password_modal"
            >
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <Password className="mb-3" name="oldPassword" placeholder="Enter old password" label="Old password" />
                        <Password className="mb-3" name="newPassword" placeholder="Enter new password" label="New password" />
                        <Password className="mb-3" name="confirmPassword" placeholder="Confirm new password" label="Confirm new password" />
                        <Button fluid className="mt-5 danger_btn" type={"submit"}>Continue</Button>
                    </Form>
                </Formik>
            </CustomModal>
        </>
    )
}

export default ChangePasswordModal
