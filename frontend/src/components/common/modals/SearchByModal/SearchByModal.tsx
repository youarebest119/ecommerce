import { TSearchByModal } from "../../../../interfaces/types";
import Radio from "../../form/Radio/Radio";
import CustomModal from "../CustomModal/CustomModal";
import "./SearchByModal.scss";

const SearchByModal = (props: TSearchByModal) => {
    return (
        <CustomModal
            show={props.show}
            handleClose={props.handleClose}
            className="search_by_modal"
            title="Search By"
        >
            <form>
                <Radio
                    label="Name"
                    name="searchBy"
                    value="name"
                    defaultChecked={"name" === props.value}
                    onChange={props.handleChange}
                />
                <Radio
                    label="Description"
                    onChange={props.handleChange}
                    name="searchBy"
                    defaultChecked={"description" === props.value}
                    value="description"
                />
            </form>
        </CustomModal>
    )
}

export default SearchByModal
