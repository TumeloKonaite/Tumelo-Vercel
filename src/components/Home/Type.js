import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Data Science",
          "AI Engineering",
          "Backend Systems",
          "Cloud Deployment",
          "RAG Applications",
        ],
        autoStart: true,
        loop: true,
        delay: 55,
        deleteSpeed: 28,
        pauseFor: 1800,
      }}
    />
  );
}

export default Type;
