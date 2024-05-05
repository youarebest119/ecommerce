import { TButton } from "../../../interfaces/types"
import "./Button.scss";

const Button = (props: TButton) => {
    const { children, fluid, type, className, ...rest } = props;
    return (
        <button
            {...rest}
            type={type || "button"}
            className={`custom_btn ${fluid ? "w-100" : ""} ${className || ""}`}
        >
            {children}
        </button>
    )
}

export default Button