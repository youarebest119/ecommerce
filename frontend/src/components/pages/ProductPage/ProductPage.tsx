import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Slider, { Settings } from "react-slick";
import { TProduct } from "../../../interfaces/types";
import { apiGet } from "../../../services/axios.service";
import { API } from "../../../utils/constants";
import "./ProductPage.scss";


const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<TProduct>();
    const settings: Settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 500,
        slidesToScroll: 1,
        slidesToShow: 1,
        dots: true,
        arrows: false,
    }
    const getProduct = async () => {
        const response = await apiGet<{ data: TProduct, }>({ url: API.PRODUCT.replace(":id", String(id)) })
        setProduct(response.data.data);
    };
    useEffect(() => {
        getProduct();
    }, [])
    return (
        <section className="product_page">
            <Container>
                <h2>Product</h2>
                <div className="product_in">
                    {
                        !product?.isInStock &&
                        <div className="out_of_stock">
                            <p>Out Of Stock</p>
                        </div>
                    }
                    <Row>
                        <Col md={5}>
                            <div className="product_images">
                                <Slider
                                    {...settings}
                                >
                                    <img src={"https://" + product?.productImage.url} alt="" />
                                    {
                                        product?.additionalImages.map((item, index) => {
                                            return (
                                                <img key={item.url + index} src={"https://" + item.url} alt="" />
                                            )
                                        })
                                    }
                                </Slider>
                                <p className="category_txt">{product?.category}</p>
                            </div>
                        </Col>
                        <Col md={7}>
                            <div className="product_details">
                                <p className="brand_name">{product?.brandName}</p>
                                <h3>{product?.name}</h3>
                                <p className="description_txt">{product?.description}</p>
                                <ul className="tags">
                                    {
                                        product?.tags.length &&
                                        product.tags.map((item, index) => {
                                            return (
                                                <li key={`${item}-${index}`}><span title={item}>{item}</span></li>
                                            )
                                        })
                                    }
                                </ul>
                                <p className="gender_txt">{product?.gender}</p>
                                <div className="d-flex align-items-center">
                                    <h4 className="price">Price - <span>${product?.price}</span></h4>
                                    <div className="rating_box positive ms-auto">
                                        <button>{product?.rating}</button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </section>
    )
}

export default ProductPage
