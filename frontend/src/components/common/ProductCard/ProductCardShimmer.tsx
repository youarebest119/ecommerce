import { Col } from "react-bootstrap"
import Shimmer from "../Shimmer/Shimmer"

const ProductCardShimmer = (props: { count?: number }) => {
    return (
        <>
            {
                Array.from({ length: props.count || 3 }).map((_item, index) => {
                    return (
                        <Col key={index} xl={4} md={4} sm={6}>
                            <div className="product_card">
                                <div className="product_img">
                                    <Shimmer height={200} fluid />
                                </div>
                                <div className="product_details">
                                    <h3>
                                        <Shimmer height={24} width={"80%"} />
                                    </h3>
                                    <ul className="tags">
                                        <li>
                                            <Shimmer width={60} height={18} />
                                        </li>
                                        <li>
                                            <Shimmer width={60} height={18} />
                                        </li>
                                        <li>
                                            <Shimmer width={60} height={18} />
                                        </li>
                                    </ul>
                                    <p className="desc_txt"><Shimmer fluid height={18} /></p>
                                    <div className="price_box">
                                        <h4>
                                            <Shimmer height={44} width={60} />
                                        </h4>
                                        <Shimmer className="ms-auto" width={100} height={44} />
                                    </div>
                                </div>
                            </div>
                        </Col>
                    )
                })
            }
        </>
    )
}

export default ProductCardShimmer
