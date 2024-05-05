import { TCheckbox } from '../../../../interfaces/types'
import ErrorMsg from '../ErrorMsg/ErrorMsg';
import "./Checkbox.scss";

const Checkbox = (props: TCheckbox) => {
    const { name, label, error, className, ...rest } = props;

    return (
        <div className={`checkbox_input ${className || ""}`}>
            <div className="checkbox_input_in">
                <input
                    {...rest}
                    className="form-check-input"
                    type="checkbox"
                    name={name}
                    id={name}
                />
                <label htmlFor={name}>{label}</label>
            </div>
            {
                props.error &&
                <ErrorMsg>{props.error}</ErrorMsg>
            }
        </div>
    )
}

export default Checkbox
