import { Col, Container, Row } from "react-bootstrap";
import { Navigate, NavLink, Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "../../../utils/constants";
import "./Profile.scss";

const Profile = () => {
    const { pathname } = useLocation();
    if (pathname === ROUTES.PROFILE_PAGE || pathname === ROUTES.PROFILE_PAGE + "/") {
        return <Navigate to={ROUTES.SETTINGS} />
    }
    return (
        <>
            <section className="profile_page">
                <Container>
                    <div className="profile_in">
                        <Row>
                            <Col md={4}>
                                <aside className="profile_sidebar">
                                    <ul>
                                        <li>
                                            <NavLink
                                                to={ROUTES.SETTINGS}
                                            >
                                                {/* <SettingsIcon/> */}
                                                Settings
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to={ROUTES.CART}
                                            >
                                                {/* <CartIcon/> */}
                                                Cart
                                            </NavLink>
                                        </li>
                                    </ul>
                                </aside>
                            </Col>
                            <Col md={8}>
                                <div className="profile_body">
                                    <Outlet />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>
        </>
    )
}

export default Profile
