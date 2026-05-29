import React from "react";
import { Container } from "react-bootstrap";
import AssistantPanel from "./AssistantPanel";

function AssistantPage() {
  return (
    <section className="assistant-page-section">
      <Container className="assistant-page-shell">
        <div className="assistant-page-hero">
          <span className="assistant-page-kicker">Portfolio chat</span>
          <h1 className="assistant-page-title">
            Talk to <span>Tumelo AI</span>
          </h1>
          <p className="assistant-page-summary">
            Ask me about projects, experience, systems design, technical depth,
            or how I approach building production AI.
          </p>
        </div>

        <AssistantPanel />
      </Container>
    </section>
  );
}

export default AssistantPage;
