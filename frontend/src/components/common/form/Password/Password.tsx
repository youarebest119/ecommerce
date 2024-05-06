import { ErrorMessage, Field } from "formik"
import { TInput } from "../../../../interfaces/types"
import ErrorMsg from "../ErrorMsg/ErrorMsg"
import "../FormikInput/Input.scss";

const Password = (props: TInput) => {
    const { label, className, name, type, ...rest } = props;
    return (
        <>
            <div className={`custom_input ${className || ''}`}>
                {label && <label htmlFor={name}>{label}</label>}
                <div className="custom_input_in">
                    <Field
                        {...rest}
                        id={name}
                        name={name}
                        type={"password"}
                    />
                </div>
                <ErrorMessage component={ErrorMsg} name={name} />
            </div>
        </>
    )
}

export default Password
