import { FormEvent } from "react";
import useCategories from "../../../../hooks/useCategories";
import { TFilterModal } from "../../../../interfaces/types";
import { GENDER_OPTIONS, SIZE_OPTIONS } from "../../../../utils/options";
import Checkbox from "../../form/Checkbox/Checkbox";
import Select from "../../form/Select/Select";
import CustomModal from "../CustomModal/CustomModal";
import "./FilterModal.scss";

const FilterModal = (props: TFilterModal) => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.handleClose && props.handleClose();
    };
    const { loading, categories } = useCategories();

    return (
        <CustomModal
            show={props.show}
            handleClose={props.handleClose}
            title="Filters"
            className="filters_modal"
        >
            <form onSubmit={handleSubmit}>
                <Select
                    label="Gender"
                    options={GENDER_OPTIONS}
                    isSearchable={false}
                    defaultValue={GENDER_OPTIONS.find(item => item.value === props.formik.values.gender) || GENDER_OPTIONS[0]}
                    onChange={option => props.formik.setFieldValue("gender", option?.value === "default" ? "" : option?.value)}
                />
                <Select
                    label="Category"
                    options={categories}
                    isLoading={loading}
                    defaultValue={categories.find(item => item.value === props.formik.values.category)}
                    onChange={option => props.formik.setFieldValue("category", option?.value)}
                />
                <Select
                    label="Size"
                    options={SIZE_OPTIONS}
                />
                <Checkbox
                    label="Should be in Stock"
                    name="isInStock"
                />
            </form>
        </CustomModal>
    )
}

export default FilterModal
