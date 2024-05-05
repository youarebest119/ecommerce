import { TShimmer } from "../../../interfaces/types";
import "./shimmer.scss";

const Shimmer = (props: TShimmer) => {
  return (
    <span
      style={{
        width: props.fluid ? "100%" : typeof props.width === "number" ? `${props.width}px` : props.width ? props.width : "400px",
        height: props.verticlyFluid ? "100%" : props.height ? `${props.height}px` : "40px",
        animationDuration: props.animationDuration || "10s",
      }}
      className={`shimmer ${props.className || ""}`}
    />
  );
};

export default Shimmer;
