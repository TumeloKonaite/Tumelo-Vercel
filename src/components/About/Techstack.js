import React from "react";
import { Col, Row } from "react-bootstrap";
import Javascript from "../../Assets/TechIcons/Javascript.svg";
import ReactIcon from "../../Assets/TechIcons/React.svg";
import Python from "../../Assets/TechIcons/Python.svg";
import Git from "../../Assets/TechIcons/Git.svg";
import Docker from "../../Assets/TechIcons/Docker.svg";
import SQL from "../../Assets/TechIcons/SQL.svg";
import AWS from "../../Assets/TechIcons/AWS.svg";

import {
  SiFastapi,
  SiPytorch,
  SiScikitlearn,
  SiMlflow,
  SiLinux,
  SiSwagger,
} from "react-icons/si";


function Techstack() {
  return (
<Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
  <Col xs={4} md={2} className="tech-icons">
    <img src={Python} alt="Python" />
    <div className="tech-icons-text">Python</div>
  </Col>
  <Col xs={4} md={2} className="tech-icons">
    <SiFastapi size={45} color="#009688" />
    <div className="tech-icons-text">FastAPI</div>
  </Col>
  <Col xs={4} md={2} className="tech-icons">
    <img src={SQL} alt="SQL and PostgreSQL" />
    <div className="tech-icons-text">SQL / PostgreSQL</div>
  </Col>
  <Col xs={4} md={2} className="tech-icons">
    <img src={Docker} alt="Docker" />
    <div className="tech-icons-text">Docker</div>
  </Col>
  <Col xs={4} md={2} className="tech-icons">
    <img src={AWS} alt="AWS" className="tech-icon-images" />
    <div className="tech-icons-text">AWS</div>
  </Col>
  <Col xs={4} md={2} className="tech-icons">
    <img src={ReactIcon} alt="React" />
    <div className="tech-icons-text">React.js</div>
  </Col>
  <Col xs={4} md={2} className="tech-icons">
    <img src={Javascript} alt="JavaScript" />
    <div className="tech-icons-text">JavaScript</div>
  </Col>
  <Col xs={4} md={2} className="tech-icons">
    <img src={Git} alt="Git" />
    <div className="tech-icons-text">Git</div>
  </Col>
  <Col xs={4} md={2} className="tech-icons">
    <SiSwagger size={45} color="#85EA2D" />
    <div className="tech-icons-text">Swagger / OpenAPI</div>
  </Col>
  <Col xs={4} md={2} className="tech-icons">
    <SiMlflow size={45} color="#0194E2" />
    <div className="tech-icons-text">MLflow</div>
  </Col>
  <Col xs={4} md={2} className="tech-icons">
    <SiScikitlearn size={45} color="#F7931E" />
    <div className="tech-icons-text">Scikit-Learn</div>
  </Col>
  <Col xs={4} md={2} className="tech-icons">
    <SiPytorch size={45} color="#EE4C2C" />
    <div className="tech-icons-text">PyTorch</div>
  </Col>
  <Col xs={4} md={2} className="tech-icons">
    <SiLinux size={45} />
    <div className="tech-icons-text">Linux</div>
  </Col>
    </Row>
  );
}

export default Techstack;
