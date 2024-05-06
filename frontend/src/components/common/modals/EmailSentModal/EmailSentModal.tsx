import { TEmailSentModal } from "../../../../interfaces/types";
import CustomModal from "../CustomModal/CustomModal";
import "./EmailSentModal.scss";
import success from "../../../../assets/images/success.png"
import { Link } from "react-router-dom";

const EmailSentModal = (props: TEmailSentModal) => {
    return (
        <CustomModal
            show={props.show}
            handleClose={props.handleClose}
            className="email_sent_modal"
            title="Email Sent"
        >
            <img src={success} alt="success" />
            <h4>Email Sent to
                &nbsp;
                <Link
                    to={`https://mail.google.com/mail/u/${props.email}/#inbox`}
                    target="_blank"
                    rel="noreferrer"
                >
                    {props.email}
                </Link>&nbsp;
                Successfully.</h4>
        </CustomModal>
    )
}

export default EmailSentModal
