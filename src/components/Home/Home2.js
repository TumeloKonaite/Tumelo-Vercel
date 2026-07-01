import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import { ImPointRight } from "react-icons/im";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row className="align-items-center gy-5">
          <Col md={8} className="home-about-description">
            <div className="observatory-label">System profile</div>
            <h1 style={{ fontSize: "2.6em" }}>
              A software engineer&apos;s <span className="purple">AI portfolio</span>
            </h1>

            <p className="home-about-body">
              I am <span className="purple">Tumelo Konaite</span>, a <span className="purple">Data Scientist,
              AI Engineer, and Software Engineer</span> focused on building production-ready systems that solve
              practical problems and create measurable business value.
              <br />
              <br />
              My work spans <span className="purple">data science</span>, <span className="purple">predictive
              analytics</span>, <span className="purple">Retrieval-Augmented Generation</span>, <span className="purple">agentic AI systems</span>,
              backend platform development, and cloud-native applications.
              <br />
              <br />
              I specialize in taking solutions beyond experimentation and into production, whether that means
              educational platforms, customer support automation, marketplace backends, predictive models,
              or enterprise AI applications.
            </p>

            <ul>
              <li className="about-activity">
                <ImPointRight /> Building end-to-end systems that combine analytics, machine learning, AI, and software engineering.
              </li>
              <br />
              <li className="about-activity">
                <ImPointRight /> Designing modular architectures, APIs, and cloud-native services that are maintainable and scalable.
              </li>
              <br />
              <li className="about-activity">
                <ImPointRight /> Translating data-driven ideas into production systems aligned with real business objectives.
              </li>
            </ul>

            <p className="home-about-body">
              With an <span className="purple">MSc in Computational and Applied Mathematics</span>, I combine
              quantitative modelling, statistical analysis, and rigorous problem-solving with practical product
              development and software engineering. My MSc research focused on quantitative finance, derivative pricing,
              and interest-rate modelling, giving me a strong mathematical foundation for machine learning, risk modelling,
              and financial AI applications.
            </p>
          </Col>

          <Col md={4} className="myAvtar">
            <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} glareEnable={true} glareMaxOpacity={0.15} scale={1.02}>
              <div className="avatar-frame">
                <img src={myImg} className="img-fluid" alt="avatar" />
              </div>
            </Tilt>
          </Col>
        </Row>

        <Row className="insight-row">
          <Col md={4}>
            <div className="insight-panel">
              <span className="signal-label">Engineering stance</span>
              <h3>Data to product</h3>
              <p>I focus on turning data, models, and AI workflows into products that can be deployed, measured, and improved.</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="insight-panel">
              <span className="signal-label">What I optimize</span>
              <h3>Business-aligned systems</h3>
              <p>Performance, maintainability, operational simplicity, and clear outcomes matter more than novelty alone.</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="insight-panel">
              <span className="signal-label">Build philosophy</span>
              <h3>Production over prototypes</h3>
              <p>The goal is not just intelligent demos, but reliable software platforms teams can own, scale, and trust.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Home2;
