import { Modal } from "react-bootstrap"
import "./CustomModal.scss";
import { TCustomModal } from "../../../../interfaces/types";

const CustomModal = (props: TCustomModal) => {
    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            centered
            className={`custom_modal ${props.className || ""}`}
        >
            {
                props.title &&
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
            }
            <Modal.Body>
                {props.children}
            </Modal.Body>
        </Modal>
    )
}

export default CustomModal
