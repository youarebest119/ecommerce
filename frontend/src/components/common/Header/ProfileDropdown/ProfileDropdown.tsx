import { useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../../../../app/hooks";
import sampleProfile from "../../../../assets/images/sample-profile.svg";
import useLogout from "../../../../hooks/useLogout";
import { combineStrings } from "../../../../services/common.service";
import { ROUTES } from "../../../../utils/constants";
import ConfirmationModal from "../../modals/ConfirmationModal/ConfirmationModal";
import "./ProfileDropdown.scss";

const ProfileDropdown = () => {
    const logoutUser = useLogout();
    const { details } = useAppSelector(state => state.user);
    const ref = useRef<HTMLButtonElement>(null);
    const handleClick = () => ref.current && ref.current.click();
    const [show, setShow] = useState(false);
    return (
        <>
            <Dropdown className="profile_dropdown">
                <Dropdown.Toggle ref={ref}>
                    <img src={combineStrings(details?.profilePic.url, details?.profilePic.id) || sampleProfile} alt="profile" />
                    {details?.username}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <NavLink onClick={handleClick} to={ROUTES.PROFILE_PAGE}>Profile</NavLink>
                    <hr />
                    <Link onClick={() => { handleClick(); setShow(true); }} to={"#"}>Logout</Link>
                </Dropdown.Menu>
            </Dropdown>
            <ConfirmationModal
                show={show}
                handleClose={() => setShow(false)}
                callback={() => logoutUser()}
            />
        </>
    )
}

export default ProfileDropdown
