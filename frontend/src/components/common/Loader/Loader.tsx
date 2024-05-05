import { Spinner } from "react-bootstrap";
import "./Loader.scss";

const Loader = () => {
    return (
        <>
            <div className="overlayloader">
                <Spinner />
            </div>
        </>
    )
}

export default Loader
