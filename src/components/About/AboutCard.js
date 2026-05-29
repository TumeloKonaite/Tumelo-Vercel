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
            I am a <span className="purple">Data Scientist, AI Engineer, and Software Engineer</span> with
            an MSc in Computational and Applied Mathematics from the University of the Witwatersrand.
            I build end-to-end systems that combine analytics, machine learning, artificial intelligence,
            and modern software engineering into scalable, production-ready products.
          </p>

          <ul>
            <li className="about-activity">
              <ImPointRight /> <span className="purple">ZenoStudy (Dec 2025 - Present)</span>:
              building AI-powered educational platforms, backend systems, and production-ready services for
              learning experiences, support automation, and digital products such as BeautyVerse.
            </li>
            <br />
            <li className="about-activity">
              <ImPointRight /> <span className="purple">Huawei Technologies (Dec 2019 - Nov 2025)</span>:
              delivered predictive analytics, meeting-intelligence automation, retrieval-based assistants,
              geospatial data pipelines, and telecom optimization models.
            </li>
          </ul>

          <p style={{ textAlign: "justify" }}>
            My experience spans predictive analytics, RAG systems, agentic AI applications, backend platform
            development, API engineering, and cloud-native deployment. I enjoy designing modular architectures,
            evaluating technology trade-offs, and building systems that balance performance, cost, and operational simplicity.
          </p>

          <ul>
            <li className="about-activity">
              <ImPointRight /> AI-powered educational platforms
            </li>
            <li className="about-activity">
              <ImPointRight /> Retrieval-Augmented Generation and agentic AI systems
            </li>
            <li className="about-activity">
              <ImPointRight /> Customer support automation and marketplace backends
            </li>
            <li className="about-activity">
              <ImPointRight /> Predictive analytics, machine learning, and cloud-native APIs
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Build data and AI systems that create real value in production."
          </p>
          <footer className="blockquote-footer">Tumelo Konaite</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
