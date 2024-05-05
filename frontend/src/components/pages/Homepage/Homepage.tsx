import { useFormik } from "formik";
import { useMemo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDebounce } from "use-debounce";
import { FilterIcon, MenuIcon } from "../../../assets/icons/icons";
import useProducts from "../../../hooks/useProducts";
import Button from "../../common/Button/Button";
import FiltersApplied from "../../common/FiltersApplied/FiltersApplied";
import NoRecordFound from "../../common/NoRecordFound/NoRecordFound";
import ProductCard from "../../common/ProductCard/ProductCard";
import ProductCardShimmer from "../../common/ProductCard/ProductCardShimmer";
import Input from "../../common/form/Input/Input";
import FilterModal from "../../common/modals/FilterModal/FilterModal";
import SearchByModal from "../../common/modals/SearchByModal/SearchByModal";
import "./Homepage.scss";
import { Values } from "../../../interfaces/types";

const Homepage = () => {
    const [showSearchByModal, setShowSearchByModal] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [page, setPage] = useState(1);
    const [text, setText] = useState('');
    const [search] = useDebounce(text, 1000);

    const formik = useFormik<Values>({
        initialValues: {
            searchBy: "name",
            gender: "",
            category: "",
            availableSizes: "",
        },
        onSubmit: (values) => {
            console.log('values :>> ', values);
        }
    })

    const filtersApplied = useMemo(
        () => 0 + (formik.values.gender ? 1 : 0) + (formik.values.category ? 1 : 0),
        [formik.values]
    );

    const handleClear = () => {
        setText("");
        formik.resetForm();
    }

    const { products, loading, details } = useProducts({
        search: formik.values.searchBy === "name" ? search : "",
        description: formik.values.searchBy === "description" ? search : "",
        page,
        gender: formik.values.gender,
        category: formik.values.category,
    });

    return (
        <>
            <section className="homepage">
                <Container>
                    <h2>Homepage</h2>
                    <div className="filters">
                        <form>
                            <div className="search_input">
                                <Input
                                    onChange={(e) => {
                                        setText(e.target.value);
                                    }}
                                    value={text}
                                    name="search"
                                    placeholder={`Search by ${formik.values.searchBy}`}
                                />
                                <Button onClick={() => setShowSearchByModal(true)}><MenuIcon /></Button>
                            </div>
                        </form>
                        <Button
                            onClick={() => setShowFilters(true)}
                            className="filter_btn ms-auto"
                        >
                            <FilterIcon />
                            {filtersApplied > 0 && <span>{filtersApplied}</span>}
                        </Button>
                        {(text || formik.dirty) && <Button onClick={handleClear}>Clear</Button>}
                    </div>
                    <FiltersApplied text={text} clearText={() => setText("")} formik={formik} />
                    <InfiniteScroll
                        dataLength={products.length}
                        next={() => setPage(prev => prev + 1)}
                        hasMore={products.length !== details.total}
                        className="products"
                        loader={<Row><ProductCardShimmer /></Row>}
                    >
                        <div className="products_list">
                            <Row>
                                {
                                    !loading ?
                                        products &&
                                            products.length > 0 ?
                                            products.map((item) => {
                                                return (
                                                    <Col key={item._id} xl={4} md={4} sm={6}>
                                                        <ProductCard
                                                            product={item}
                                                        />
                                                    </Col>
                                                )
                                            })
                                            :
                                            <Col xs={12}>
                                                <NoRecordFound />
                                            </Col>
                                        :
                                        <ProductCardShimmer />
                                }
                            </Row>
                        </div>
                    </InfiniteScroll>
                </Container>
            </section>
            <SearchByModal
                handleSubmit={formik.handleSubmit}
                handleChange={e => formik.setFieldValue("searchBy", e.currentTarget.value)}
                value={formik.values.searchBy}
                show={showSearchByModal}
                handleClose={() => setShowSearchByModal(false)}
            />
            <FilterModal
                show={showFilters}
                handleClose={() => setShowFilters(false)}
                formik={formik}
            />
        </>
    )
}

export default Homepage
