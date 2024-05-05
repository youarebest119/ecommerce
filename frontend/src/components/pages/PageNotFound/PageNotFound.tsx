import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RightArrow } from "../../../assets/icons/icons";
import { ROUTES } from "../../../utils/constants";
import "../ErrorPage/ErrorPage.scss"

const PageNotFound = () => {
  return (
    <>
      <section className={"error_page"}>
        <Container>
          <Row className="justify-content-center">
            <Col md={7}>
              <h3>Error 404</h3>
              <h1>
                Sorry !!! <br />
                There's No Page.
              </h1>
              <p>
                The page you are looking for is not available for the moment!!!{" "}
                <br /> You can go home or please try again later.
              </p>
              <Link to={ROUTES.HOMEPAGE}>
                Go Home <RightArrow />
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default PageNotFound;
