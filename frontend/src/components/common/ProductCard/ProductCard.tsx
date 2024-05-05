import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import "./ProductCard.scss";
import { ROUTES } from "../../../utils/constants";
import { TProductCard } from "../../../interfaces/types";

const ProductCard = (props: TProductCard) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(ROUTES.PRODUCT_PAGE.replace(":id", props.product?._id || ""))
    }
    return (
        <>
            <div className="product_card">
                <div className="product_img">
                    <img onClick={handleClick} src={`https://${props.product?.productImage.url}`} alt="" />
                    <p className="category_txt">{props.product?.category}</p>
                </div>
                <div className="product_details">
                    <h3 onClick={handleClick} >{props.product?.name}</h3>
                    <ul className="tags">
                        {
                            props.product?.tags &&
                            props.product.tags.length > 0 &&
                            props.product.tags.map((item, index) => {
                                return (
                                    <li key={item + index}><span title={item}>{item}</span></li>
                                )
                            })
                        }
                    </ul>
                    <p className="desc_txt">{props.product?.description}</p>
                    <div className="price_box">
                        <h4>${props.product?.price}</h4>
                        <Button className="cart_btn">Add to cart</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCard
