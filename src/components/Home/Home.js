import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/home-main.svg";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import { Link } from "react-router-dom";
import { SOCIAL_LINKS } from "../../constants";

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row className="align-items-center gy-5">
            <Col md={7} className="home-header">
              <div className="observatory-label">Observatory feed: production AI systems online</div>
              <h1 className="hero-title">
                Tumelo Konaite
                <span className="hero-title-accent">Machine learning systems with signal, structure, and intent.</span>
              </h1>
              <p className="hero-summary">
                I build applied AI products that turn messy information into dependable software:
                retrieval systems, evaluation loops, automation pipelines, and cloud-ready APIs.
              </p>

              <div className="hero-type-shell">
                <span className="hero-kicker">Tracking now</span>
                <div className="hero-typewriter">
                  <Type />
                </div>
              </div>

              <div className="hero-actions">
                <Link to="/project" className="hero-action-primary">
                  View Projects
                </Link>
                <Link to="/about" className="hero-action-secondary">
                  System Profile
                </Link>
                <a href={`mailto:${SOCIAL_LINKS.email}`} className="hero-action-secondary">
                  Open Contact
                </a>
              </div>

              <div className="hero-metrics">
                <div className="hero-metric-card">
                  <span className="hero-metric-value">LLM + RAG</span>
                  <span className="hero-metric-label">Production application focus</span>
                </div>
                <div className="hero-metric-card">
                  <span className="hero-metric-value">Python / AWS</span>
                  <span className="hero-metric-label">Shipping stack</span>
                </div>
                <div className="hero-metric-card">
                  <span className="hero-metric-value">Evaluation-first</span>
                  <span className="hero-metric-label">How I keep systems trustworthy</span>
                </div>
              </div>
            </Col>

            <Col md={5} className="hero-visual-column">
              <div className="observatory-panel">
                <div className="observatory-panel-header">
                  <span>Neural Observatory</span>
                  <span>Live</span>
                </div>
                <div className="observatory-visual">
                  <div className="observatory-ring observatory-ring-one"></div>
                  <div className="observatory-ring observatory-ring-two"></div>
                  <img
                    src={homeLogo}
                    alt="home pic"
                    className="img-fluid observatory-illustration"
                  />
                </div>
                <div className="signal-grid">
                  <div className="signal-card">
                    <span className="signal-label">Primary domains</span>
                    <strong>Applied AI, MLOps, retrieval</strong>
                  </div>
                  <div className="signal-card">
                    <span className="signal-label">Operating mode</span>
                    <strong>Research depth with engineering discipline</strong>
                  </div>
                  <div className="signal-card">
                    <span className="signal-label">Output</span>
                    <strong>Systems teams can deploy and maintain</strong>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
      <Home2 />

      <Container className="home-social-shell">
        <Row style={{ paddingTop: "20px", paddingBottom: "80px" }}>
          <Col md={12} className="home-about-social">
            <h1>Connect to the Network</h1>
            <p>
              Direct lines for collaboration, technical discussion, and portfolio walkthroughs.
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href={SOCIAL_LINKS.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <CgWebsite />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href={`mailto:${SOCIAL_LINKS.email}`}
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <MdEmail />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Home;
