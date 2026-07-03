import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BsGithub } from "react-icons/bs";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";

import Project1 from "../../Assets/Projects/1.png";
import Project2 from "../../Assets/Projects/2.png";
import Project3 from "../../Assets/Projects/3.png";
import Project4 from "../../Assets/Projects/4.png";
import Project5 from "../../Assets/Projects/5.png";
import Project6 from "../../Assets/Projects/6.png";
import Project10 from "../../Assets/Projects/10.png";
import LetsGoLogo from "../../Assets/Projects/letsg0-logo.png";

const featuredProjects = [
  {
    imgPath: LetsGoLogo,
    title: "LetsGo South Africa - AI-Powered Tourism Platform",
    description: `Built a full-stack tourism platform for LetsGo South Africa where admins manage travel packages and customers browse listings, submit enquiries, and chat with an AI travel assistant.

Delivered a FastAPI backend, PostgreSQL database, React/Vite frontend, authentication, image workflows, enquiry handling, and cloud deployment.

Skills: FastAPI, React, PostgreSQL, AI Chat, Admin Workflows.`,
    demoLink: "https://letsgodb.web.app/",
    demoLabel: "Website",
  },
  {
    imgPath: Project2,
    title: "BeautyVerse - Beauty Services Marketplace",
    description: `Built a beauty services marketplace where providers create and manage service listings while customers browse beauty services and submit enquiries.

The platform demonstrates reusable backend architecture, listing management, categories, authentication, image handling, and marketplace-style enquiry flows.

Skills: FastAPI, PostgreSQL, SQLAlchemy, Alembic, Docker.`,
    demoLink: "https://beautyverse.co.za/",
    demoLabel: "Website",
  },
  {
    imgPath: Project6,
    title: "MedDesk - AI Clinical Intake Proof of Concept",
    description: `Built an AI-assisted clinical intake proof of concept where patients report symptoms before consultation and clinicians receive structured draft SOAP notes with surfaced red flags.

Designed as clinician-support software to structure intake information and improve review efficiency, not as a replacement for medical judgment.

Skills: FastAPI, Generative AI, Clinical Intake, SOAP Notes, Prompt Engineering.`,
    demoLink: "https://meddesk.co.za/",
    demoLabel: "Website",
  },
  {
    imgPath: Project10,
    title: "Synthetic Patient-Doctor Data Pipeline",
    description: `Built a synthetic clinical consultation dataset pipeline that generates structured doctor-patient records and optional full-consultation audio for downstream AI evaluation.

The system produces JSONL consultation records, clinical extraction outputs, TTS-ready scripts, audio manifests, and Hugging Face export bundles for text and audio datasets.

Skills: Python, Synthetic Data, OpenAI APIs, TTS, Dataset Engineering.`,
    ghLink: "https://github.com/TumeloKonaite/synthetic_data",
    demoLink: "https://huggingface.co/datasets/TumeloKonaite/synthetic-patient-dr-data",
    demoLabel: "Dataset",
  },
  {
    imgPath: Project1,
    title: "AWS Multi-Agent Pricing Intelligence",
    description: `Built a multi-agent system on AWS that evaluates marketplace listings using ensemble modeling.

The system estimates fair value and detects underpriced opportunities for faster decision-making.

Skills: Python, AWS, ML Ensembles, Agentic Workflows.`,
    ghLink: "https://github.com/TumeloKonaite/AI-Research-Decision-Support-System",
  },
  {
    imgPath: Project2,
    title: "LLM Meeting Intelligence Pipeline",
    description: `Developed an automated speech-to-summary workflow for internal reporting.

Reduced report turnaround time from 2 days to approximately 30 minutes.

Skills: Python, LLMs, NLP, Workflow Automation.`,
    ghLink: "https://github.com/TumeloKonaite/TrueNote/tree/main",
  },
  {
    imgPath: Project3,
    title: "RAG Assistant for Team Onboarding",
    description: `Engineered a retrieval-based AI assistant that lets team members query internal datasets conversationally.

Improved onboarding speed and knowledge access for new joiners.

Skills: RAG, Embeddings, Vector Retrieval, Python APIs.`,
    ghLink: "https://github.com/TumeloKonaite/Support_Agent",
  },
  {
    imgPath: Project4,
    title: "Telecom Infrastructure Optimization",
    description: `Built a machine learning model to identify cellular towers requiring upgrades.

Modeled signal strength, latency, and throughput to support infrastructure planning decisions.

Skills: Python, Feature Engineering, Predictive Modeling, Analytics.`,
    ghLink: "https://github.com/TumeloKonaite/NetPlanner-AI",
  },
  {
    imgPath: Project5,
    title: "Customer Churn Prediction",
    description: `Designed predictive analytics workflows to identify customers with high churn risk.

Supported targeted retention strategies through risk scoring and behavioral insights.

Skills: SQL, Python, Classification Models, Business Analytics.`,
    ghLink: "https://github.com/TumeloKonaite/Customer-Churning-Repo",
  },
];

const additionalRepositories = [
  {
    name: "tumelo-digital-twin",
    href: "https://github.com/TumeloKonaite/tumelo-digital-twin",
  },
];

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          Featured <strong className="purple">Projects</strong>
        </h1>
        <p style={{ color: "white" }}>
          A selection of production-oriented AI systems, full-stack platforms, and digital products.
        </p>

        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {featuredProjects.map((project) => (
            <Col key={project.title} md={4} className="project-card">
              <ProjectCard {...project} />
            </Col>
          ))}
        </Row>

        <section className="project-repository-shell" aria-label="Additional public repositories">
          <div className="project-repository-panel">
            <p className="project-repository-kicker">Additional Public Repositories</p>
            <h2>More code available on GitHub</h2>
            <p>
              Some repositories are not currently featured as portfolio cards, but are still available for review.
            </p>
            <div className="project-repository-links">
              {additionalRepositories.map((repository) => (
                <a
                  key={repository.name}
                  className="project-repository-link"
                  href={repository.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BsGithub />
                  <span>{repository.name}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </Container>
    </Container>
  );
}

export default Projects;
