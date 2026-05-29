import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Machine Learning Engineer",
          "LLM, RAG, and evaluation systems builder",
          "FastAPI and AWS AI developer",
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
