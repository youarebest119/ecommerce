import { TFiltersApplied } from "../../../interfaces/types";
import { capitalize } from "../../../services/common.service";
import "./FiltersApplied.scss";

const FiltersApplied = (props: TFiltersApplied) => {
    return (
        <>
            <div className="filters_applied_list">
                <ul>
                    {
                        props.text &&
                        <li>
                            <button onClick={props.clearText}>
                                {props.text}
                            </button>
                        </li>
                    }
                    {
                        props.formik.values.gender &&
                        <li>
                            <button onClick={() => props.formik.setFieldValue("gender", "")}>
                                {capitalize(props.formik.values.gender)}
                            </button>
                        </li>
                    }
                    {
                        props.formik.values.category &&
                        <li>
                            <button onClick={() => props.formik.setFieldValue("category", "")}>
                                {props.formik.values.category}
                            </button>
                        </li>
                    }
                </ul>
            </div>
        </>
    )
}

export default FiltersApplied
