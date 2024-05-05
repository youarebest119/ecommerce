import { Outlet } from "react-router-dom";
import "./Onboardlayout.scss";
import { Container } from "react-bootstrap";

const Onboardlayout = () => {
    return (
        <>
            <div className="onboard_layout">
                <Container>
                    <Outlet />
                </Container>
            </div>
        </>
    )
}

export default Onboardlayout
