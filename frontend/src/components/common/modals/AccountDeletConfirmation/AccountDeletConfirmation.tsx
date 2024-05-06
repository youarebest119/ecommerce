import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { useAppSelector } from "../../../../app/hooks";
import useLogout from "../../../../hooks/useLogout";
import { apiDelete } from "../../../../services/axios.service";
import { API } from "../../../../utils/constants";
import Button from "../../Button/Button";
import FormikInput from "../../form/FormikInput/FormikInput";
import CustomModal from "../CustomModal/CustomModal";
import "./AccountDeletConfirmation.scss";

const AccountDeletConfirmation = () => {
    const { details } = useAppSelector(state => state.user);
    const [show, setShow] = useState(false);
    const logout = useLogout();
    const initialValues = {
        username: "",
    };
    const handleSubmit = async ({ username }: typeof initialValues, formikHelpers: FormikHelpers<{ username: string; }>) => {
        if (username === details?.username) {
            await apiDelete({
                url: API.DELETE_USER,
                showToast: true,
            })
            setShow(false);
            logout();
        } else {
            formikHelpers.setErrors({ username: "Wrong username entered" })
        }
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
                        <FormikInput name="username" placeholder="Username" label="Type in the username of your account to confirm " />
                        <Button fluid className="mt-5 danger_btn" type={"submit"}>Continue</Button>
                    </Form>
                </Formik>
            </CustomModal>
        </>
    )
}

export default AccountDeletConfirmation
