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
              A software engineer&apos;s <span className="purple">AI observatory</span>
            </h1>

            <p className="home-about-body">
              I am <span className="purple">Tumelo Konaite</span>, a Machine Learning Engineer focused on
              building production AI systems that solve practical problems with measurable behavior.
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
              <h3>Useful over theatrical</h3>
              <p>Interfaces, models, and APIs should create confidence quickly and hold up under production pressure.</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="insight-panel">
              <span className="signal-label">What I optimize</span>
              <h3>Signal quality</h3>
              <p>Retrieval relevance, evaluation coverage, latency, and clear product behavior matter more than hype.</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="insight-panel">
              <span className="signal-label">Build philosophy</span>
              <h3>Intelligence with observability</h3>
              <p>Good AI systems expose their assumptions, fail clearly, and remain maintainable by the team that owns them.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Home2;
