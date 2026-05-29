import React from "react";
import Particles from "react-tsparticles";

function Particle() {
  return (
    <Particles
      id="tsparticles"
      params={{
        fpsLimit: 60,
        particles: {
          color: {
            value: ["#7dd3fc", "#67e8f9", "#6ee7b7", "#f0f9ff"],
          },
          number: {
            value: 95,
            density: {
              enable: true,
              value_area: 1100,
            },
          },
          line_linked: {
            enable: true,
            color: "#7dd3fc",
            distance: 150,
            opacity: 0.2,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            out_mode: "bounce",
            random: true,
            speed: 0.35,
          },
          size: {
            value: 2,
            random: true,
          },
          opacity: {
            value: 0.45,
            anim: {
              enable: true,
              speed: 0.8,
              opacity_min: 0.12,
            },
          },
        },
        interactivity: {
          events: {
            onhover: {
              enable: true,
              mode: "grab",
            },
            onclick: {
              enable: true,
              mode: "repulse",
            },
          },
          modes: {
            grab: {
              distance: 180,
              line_linked: {
                opacity: 0.6,
              },
            },
            repulse: {
              distance: 140,
              duration: 0.4,
            },
          },
        },
        retina_detect: true,
      }}
    />
  );
}

export default Particle;
