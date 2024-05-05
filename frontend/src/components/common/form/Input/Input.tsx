import { TInput } from "../../../../interfaces/types";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import "../FormikInput/Input.scss";

const Input = (props: TInput) => {
    const { label, className, name, type, ...rest } = props;
    return (
        <>
            <div className={`custom_input ${className || ""}`}>
                {label && <label htmlFor={name}>{label}</label>}
                <div className="custom_input_in">
                    <input
                        {...rest}
                        id={name}
                        name={name}
                        type={type || "text"}
                    />
                </div>
                {
                    props.error &&
                    <ErrorMsg>{props.error}</ErrorMsg>
                }
            </div>
        </>
    )
}

export default Input
