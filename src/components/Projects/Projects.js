import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";

import Project1 from "../../Assets/Projects/1.png";
import Project2 from "../../Assets/Projects/2.png";
import Project3 from "../../Assets/Projects/3.png";
import Project4 from "../../Assets/Projects/4.png";
import Project5 from "../../Assets/Projects/5.png";
import Project6 from "../../Assets/Projects/6.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          Featured <strong className="purple">Projects</strong>
        </h1>
        <p style={{ color: "white" }}>
          A selection of practical AI and machine learning systems built for production-oriented use cases.
        </p>

        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={Project1}
              title="AWS Multi-Agent Pricing Intelligence"
              description={`Built a multi-agent system on AWS that evaluates marketplace listings using ensemble modeling.

              The system estimates fair value and detects underpriced opportunities for faster decision-making.

              Skills: Python, AWS, ML Ensembles, Agentic Workflows.`}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={Project2}
              title="LLM Meeting Intelligence Pipeline"
              description={`Developed an automated speech-to-summary workflow for internal reporting.

              Reduced report turnaround time from 2 days to approximately 30 minutes.

              Skills: Python, LLMs, NLP, Workflow Automation.`}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={Project3}
              title="RAG Assistant for Team Onboarding"
              description={`Engineered a retrieval-based AI assistant that lets team members query internal datasets conversationally.

              Improved onboarding speed and knowledge access for new joiners.

              Skills: RAG, Embeddings, Vector Retrieval, Python APIs.`}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={Project4}
              title="Telecom Infrastructure Optimization"
              description={`Built a machine learning model to identify cellular towers requiring upgrades.

              Modeled signal strength, latency, and throughput to support infrastructure planning decisions.

              Skills: Python, Feature Engineering, Predictive Modeling, Analytics.`}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={Project5}
              title="Customer Churn Prediction"
              description={`Designed predictive analytics workflows to identify customers with high churn risk.

              Supported targeted retention strategies through risk scoring and behavioral insights.

              Skills: SQL, Python, Classification Models, Business Analytics.`}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={Project6}
              title="Healthcare Consultation Summarizer"
              description={`Built an AI application that converts doctor consultation notes into structured summaries,
              actionable next steps, and patient-ready email communication.

              Skills: Generative AI, Prompt Engineering, FastAPI, Real-time Inference.`}
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
