import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi, I am <span className="purple">Tumelo Konaite</span> from{" "}
            <span className="purple">Johannesburg, South Africa</span>.
            <br />
            <br />
            I am a <span className="purple">Machine Learning Engineer</span> with an MSc in
            Computational and Applied Mathematics from the University of the Witwatersrand.
            My focus is building practical AI systems, including LLM-powered solutions,
            retrieval-augmented generation, and production APIs.
          </p>

          <ul>
            <li className="about-activity">
              <ImPointRight /> <span className="purple">ZenoStudy (Dec 2025 - Present)</span>:
              building scalable AI systems for learning workflows, evaluating foundation models,
              and delivering production-ready FastAPI services.
            </li>
            <br />
            <li className="about-activity">
              <ImPointRight /> <span className="purple">Huawei Technologies (Dec 2019 - Nov 2025)</span>:
              delivered meeting-intelligence automation, retrieval-based assistants,
              geospatial data pipelines, and telecom optimization models.
            </li>
          </ul>

          <p style={{ textAlign: "justify" }}>
            I am AWS-certified in Generative AI, Machine Learning Engineering, and Solutions Architecture.
            I enjoy designing systems that are measurable, maintainable, and useful for real teams.
          </p>

          <ul>
            <li className="about-activity">
              <ImPointRight /> Multi-agent AI pricing systems on AWS
            </li>
            <li className="about-activity">
              <ImPointRight /> Customer churn prediction and retention analytics
            </li>
            <li className="about-activity">
              <ImPointRight /> Healthcare note-to-summary and action-generation workflows
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Build AI that works in production, not only in demos."
          </p>
          <footer className="blockquote-footer">Tumelo Konaite</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
