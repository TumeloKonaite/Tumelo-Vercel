import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import laptopImg from "../../Assets/about.png";
import Toolstack from "./Toolstack";
import { ImPointRight } from "react-icons/im";

function About() {
  return (
    <>
      <Particle />
      <Container fluid className="about-section">
        <Container>
          <Row style={{ justifyContent: "center", padding: "10px" }}>
            <Col
              md={7}
              style={{
                justifyContent: "center",
                paddingTop: "30px",
                paddingBottom: "50px",
              }}
            >
              <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
                Know Who <strong className="purple">I Am</strong>
              </h1>
              <Aboutcard />
            </Col>
            <Col
              md={5}
              style={{ paddingTop: "120px", paddingBottom: "50px" }}
              className="about-img"
            >
              <img src={laptopImg} alt="about" className="img-fluid" />
            </Col>
          </Row>

          <Row style={{ paddingTop: "60px", paddingBottom: "60px" }}>
            <Col md={12}>
              <h1 className="project-heading">
                Work <strong className="purple">With Me</strong>
              </h1>
              <p style={{ color: "white", marginBottom: "16px" }}>
                I help teams move from AI ideas to production-ready systems.
              </p>
              <p style={{ color: "white", marginBottom: "12px" }}>
                In practice, that usually means:
              </p>
              <ul>
                <li className="about-activity" style={{ marginBottom: "12px" }}>
                  <ImPointRight /> <span className="purple">LLM application engineering</span> with robust
                  retrieval, evaluation, and deployment practices.
                </li>
                <li className="about-activity" style={{ marginBottom: "12px" }}>
                  <ImPointRight /> <span className="purple">ML system design</span> that balances performance,
                  reliability, and cost.
                </li>
                <li className="about-activity" style={{ marginBottom: "12px" }}>
                  <ImPointRight /> <span className="purple">Data and API workflows</span> for scalable AI services.
                </li>
                <li className="about-activity" style={{ marginBottom: "12px" }}>
                  <ImPointRight /> <span className="purple">Production analytics</span> for operational and
                  business decision support.
                </li>
              </ul>
              <p style={{ color: "white", margin: "20px 0" }}>
                If you are working on a practical AI problem and need engineering support, let us connect.
              </p>
              <a
                href="mailto:tumelokonaite@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="coffee-button"
              >
                LET'S CONNECT BY EMAIL
              </a>
            </Col>
          </Row>

          <h1 className="project-heading">
            Professional <strong className="purple">Skillset </strong>
          </h1>

          <Techstack />

          <h1 className="project-heading">
            <strong className="purple">Tools</strong> I Use
          </h1>
          <Toolstack />

          <Github />
        </Container>
      </Container>
    </>
  );
}

export default About;
