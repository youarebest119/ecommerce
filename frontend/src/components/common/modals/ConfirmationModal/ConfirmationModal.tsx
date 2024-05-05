import { Col, Row } from "react-bootstrap";
import { TConfirmationModal } from "../../../../interfaces/types";
import Button from "../../Button/Button";
import CustomModal from "../CustomModal/CustomModal";
import "./ConfirmationModal.scss";

const ConfirmationModal = (props: TConfirmationModal) => {
    return (
        <CustomModal
            show={props.show}
            handleClose={props.handleClose}
            title="Confirmation"
            className="confirmation_modal"
        >
            <h3>{props.title || "Are you sure, You want to continue?"}</h3>
            <Row className="action">
                <Col sm={6} className="order-sm-1">
                    <Button fluid onClick={props.callback}>Yes</Button>
                </Col>
                <Col sm={6}>
                    <Button className="danger_btn" fluid>No</Button>
                </Col>
            </Row>
        </CustomModal>
    )
}

export default ConfirmationModal
