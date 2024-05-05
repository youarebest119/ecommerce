import ReactSelect from 'react-select'
import { TSelect } from '../../../../interfaces/types'
import ErrorMsg from '../ErrorMsg/ErrorMsg';
import "./Select.scss";

const Select = (props: TSelect) => {
    const { label, className, error, ...rest } = props;
    return (
        <div className={`custom_select ${className || ""}`}>
            {label && <label>{label}</label>}
            <ReactSelect
                {...rest}
                classNamePrefix={"select"}
            />
            {
                props.error &&
                <ErrorMsg>{props.error}</ErrorMsg>
            }
        </div>
    )
}

export default Select
