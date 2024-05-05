import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useAppSelector } from "../../../../app/hooks";
import sampleProfile from "../../../../assets/images/sample-profile.svg";
import useUpdateProfile from "../../../../hooks/useUpdateProfile";
import { combineStrings } from "../../../../services/common.service";
import Button from "../../../common/Button/Button";
import FormikInput from "../../../common/form/FormikInput/FormikInput";
import AccountDeletConfirmation from "../../../common/modals/AccountDeletConfirmation/AccountDeletConfirmation";
import ChangePasswordModal from "../../../common/modals/ChangePasswordModal/ChangePasswordModal";
import ConfirmationModal from "../../../common/modals/ConfirmationModal/ConfirmationModal";
import "./Settings.scss";

const Settings = () => {
    const updateProfile = useUpdateProfile();
    const { details } = useAppSelector(state => state.user);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const initialValues = {
        username: details?.username,
        email: details?.email,
    };
    const handleSubmit = async (values: typeof initialValues, formikHelpers: FormikHelpers<typeof initialValues>) => {
        await updateProfile(values);
        formikHelpers.resetForm({ values });
    }
    return (
        <>
            <div className="settings_page">
                <h2>Settings</h2>
                <img
                    src={combineStrings(details?.profilePic.url, details?.profilePic.id) || sampleProfile}
                    className="profile_img"
                    alt=""
                />
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    {
                        (formik) => {
                            return (
                                <Form>
                                    <Row>
                                        <Col xxl={6}>
                                            <FormikInput
                                                name="username"
                                                placeholder="Username"
                                                label="Username"
                                            />
                                        </Col>
                                        <Col xxl={6}>
                                            <FormikInput
                                                name="email"
                                                type="email"
                                                placeholder="Email"
                                                label="Email"
                                            />
                                        </Col>
                                        <Col xxl={12}>
                                            <Button
                                                type="submit"
                                                disabled={!formik.dirty}
                                            >
                                                Save
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            )
                        }
                    }
                </Formik>
                <ChangePasswordModal />
                <hr />
                <div className="delete_account">
                    <h3>Danger Zone</h3>
                    <div className="delete_account_in">
                        <h5>Once you delete your account, there is no going back.</h5>
                        <AccountDeletConfirmation />
                    </div>
                </div>
            </div>
            <ConfirmationModal
                show={showConfirmation}
                handleClose={() => setShowConfirmation(false)}
            />
        </>
    )
}

export default Settings
