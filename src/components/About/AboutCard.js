import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";
import { SOCIAL_LINKS } from "../../constants";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "left" }}>
            <strong>Location:</strong> Johannesburg, South Africa |{" "}
            <a className="purple" href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>{" "}
            |{" "}
            <a className="purple" href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer">
              GitHub
            </a>{" "}
            |{" "}
            <a className="purple" href={SOCIAL_LINKS.portfolio} target="_blank" rel="noreferrer">
              Website
            </a>
          </p>

          <h2 className="purple" style={{ fontSize: "1.35rem", marginTop: "28px" }}>
            Summary
          </h2>
          <p style={{ textAlign: "justify" }}>
            Software Engineer focused on building production-ready backend systems, AI-powered applications,
            and cloud-native solutions. I enjoy learning in public, contributing to open source, and using the
            internet and modern AI tools to continuously expand my skills. I am passionate about taking ideas
            from concept to deployment, adapting quickly to new technologies, and solving real-world problems.
          </p>

          <h2 className="purple" style={{ fontSize: "1.35rem", marginTop: "28px" }}>
            Professional Experience
          </h2>
          <ul>
            <li className="about-activity">
              <ImPointRight /> <span className="purple">Beautyverse | Software Engineer</span>{" "}
              <strong>(Dec 2025 - Present)</strong>
              <br />
              Architecting scalable backend services for Beautyverse&apos;s business management platform and
              marketplace. My work includes FastAPI services, database design, Keycloak identity and access
              management, payment and third-party integrations, and automated delivery with AWS, Docker,
              Linux, CI/CD, and Infrastructure as Code.
            </li>
            <li className="about-activity" style={{ marginTop: "16px" }}>
              <ImPointRight /> <span className="purple">Huawei Technologies | Transmission Data Analyst</span>{" "}
              <strong>(Feb 2021 - Nov 2025)</strong>
              <br />
              Built centralized data pipelines, reporting tools, and automation frameworks for large-scale
              telecom infrastructure. I used Huawei Cloud, Linux, scripting, and Docker to improve data
              reliability, auditability, network efficiency, delivery speed, and cost-effectiveness.
            </li>
          </ul>

          <h2 className="purple" style={{ fontSize: "1.35rem", marginTop: "28px" }}>
            Core Skills
          </h2>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Backend engineering with Python, FastAPI, Flask, SQLAlchemy, Pydantic, and REST APIs
            </li>
            <li className="about-activity">
              <ImPointRight /> Generative AI, LLM integration, prompt engineering, RAG, FAISS, and ChromaDB
            </li>
            <li className="about-activity">
              <ImPointRight /> Keycloak, OAuth2, OpenID Connect, JWT, RBAC, and SSO
            </li>
            <li className="about-activity">
              <ImPointRight /> PostgreSQL, MySQL, Redis, DynamoDB, and MongoDB
            </li>
            <li className="about-activity">
              <ImPointRight /> AWS, Huawei Cloud, Docker, GitHub Actions, Terraform, Ansible, and Linux
            </li>
            <li className="about-activity">
              <ImPointRight /> Pytest, unit, integration, and system testing
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            &quot;Taking ideas from concept to reliable production systems.&quot;
          </p>
          <footer className="blockquote-footer">Tumelo Konaite</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
