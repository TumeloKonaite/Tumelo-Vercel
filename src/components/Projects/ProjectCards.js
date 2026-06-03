import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";

function ProjectCards(props) {
  const hasActions = props.ghLink || props.demoLink || props.detailsLink;

  return (
    <Card className="project-card-view">
      <Card.Img variant="top" src={props.imgPath} alt="card-img" />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text
          style={{
            textAlign: "justify",
            whiteSpace: "pre-line",
          }}
        >
          {props.description}
        </Card.Text>

        {hasActions && (
          <div className="project-card-actions">
            {props.ghLink && (
              <Button
                variant="primary"
                href={props.ghLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open GitHub repository for ${props.title}`}
              >
                <BsGithub /> &nbsp;{props.ghLabel || "GitHub"}
              </Button>
            )}

            {props.demoLink && (
              <Button
                variant="primary"
                href={props.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open live demo for ${props.title}`}
              >
                <CgWebsite /> &nbsp;{props.demoLabel || "Demo"}
              </Button>
            )}
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProjectCards;
