import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import { ImPointRight } from "react-icons/im";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>

            <p className="home-about-body">
              I am <span className="purple">Tumelo Konaite</span>, a Machine Learning Engineer focused on
              building production AI systems that solve practical problems.
              <br />
              <br />
              I hold an <span className="purple">MSc in Computational and Applied Mathematics</span> from
              the University of the Witwatersrand, and I specialize in <span className="purple">LLM-powered
              applications</span>, <span className="purple">RAG pipelines</span>, and cloud-ready machine
              learning services.
              <br />
              <br />
              My day-to-day work spans model evaluation, API engineering, and end-to-end deployment.
              I care about quality, reliability, and creating systems teams can trust in production.
            </p>

            <ul>
              <li className="about-activity">
                <ImPointRight /> Designing scalable AI workflows with Python, FastAPI, and AWS.
              </li>
              <br />
              <li className="about-activity">
                <ImPointRight /> Evaluating foundation models with retrieval and quality metrics.
              </li>
              <br />
              <li className="about-activity">
                <ImPointRight /> Turning business and operational data into deployable ML products.
              </li>
            </ul>

            <p className="home-about-body">
              On this site, I share my work across machine learning engineering, applied AI, and product-focused
              experimentation.
            </p>
          </Col>

          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Home2;
