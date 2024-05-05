import { Container } from "react-bootstrap";
import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/constants";
import Button from "../Button/Button";
import ProfileDropdown from "./ProfileDropdown/ProfileDropdown";
import { useAppSelector } from "../../../app/hooks";

const Header = () => {
    const { token } = useAppSelector(state => state.user);
    const navigate = useNavigate();
    return (
        <header className="header">
            <Container>
                <div className="header_in">
                    <Link className="logo" to={ROUTES.HOMEPAGE}>Products</Link>
                    <div className="header_action">
                        {
                            token ?
                                <ProfileDropdown />
                                :
                                <>
                                    <Button onClick={() => navigate(ROUTES.LOGIN)}>Login</Button>
                                    <Button onClick={() => navigate(ROUTES.REGISTER)}>Register</Button>
                                </>
                        }
                    </div>
                </div>
            </Container>
        </header>
    )
}

export default Header
