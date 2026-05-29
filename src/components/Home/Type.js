import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Data Scientist",
          "AI Engineer",
          "Software Engineer",
          "LLM, RAG, and agentic systems builder",
          "MSc Computational and Applied Mathematics",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
