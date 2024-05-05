import Lottie from "lottie-react"
import animation from "../../../assets/animations/nothing.json";
import "./NoRecordFound.scss";
import { TNoRecordFound } from "../../../interfaces/types";

const NoRecordFound = (props : TNoRecordFound) => {
    return (
        <div className={`no_record_found ${props.className || ""}`}>
            <Lottie
                animationData={animation}
            />
            <p>
                {
                    props.text || "Nothing Found"
                }
            </p>
        </div>
    )
}

export default NoRecordFound
