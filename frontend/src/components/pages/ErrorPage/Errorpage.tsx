import { Col, Container, Row } from "react-bootstrap";
import { Link, useRouteError } from "react-router-dom";
import "./ErrorPage.scss";
import { RightArrow } from "../../../assets/icons/icons";
import { ROUTES } from "../../../utils/constants";

const Errorpage = () => {
  const error: any = useRouteError();
  return (
    <section className={"error_page"}>
      <Container>
        <Row className="justify-content-center">
          <Col md={12}>
            <h3>Error - {error.stack.split(":")[0]}</h3>
            <h1>{error.message}</h1>
            <p>
              <pre>{error.stack}</pre>
            </p>
            <Link to={ROUTES.HOME}>
              Go Home <RightArrow />
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Errorpage;
