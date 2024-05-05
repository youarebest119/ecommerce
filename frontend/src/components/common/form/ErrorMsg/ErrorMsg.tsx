import "./ErrorMsg.scss";
import { TErrorMsg } from '../../../../interfaces/types'

const ErrorMsg = (props: TErrorMsg) => {
    return (
        <p className={`error_msg ${props.className || ""}`}>
            {props.children}
        </p>
    )
}

export default ErrorMsg
