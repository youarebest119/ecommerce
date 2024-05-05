import { TRadio } from "../../../../interfaces/types"
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import "./Radio.scss";

const Radio = (props: TRadio) => {
    const { name, label, error, className, value, ...rest } = props;
    return (
        <>
            <div className={`radio_input ${className || ""}`}>
                <div className="radio_input_in">
                    <input
                        {...rest}
                        type='radio'
                        name={name}
                        value={value}
                        id={name + value}
                    />
                    <label htmlFor={name + value}>{label}</label>
                </div>
                {
                    error &&
                    <ErrorMsg>{error}</ErrorMsg>
                }
            </div>
        </>
    )
}

export default Radio
