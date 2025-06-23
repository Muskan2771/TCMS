// Gauge.js
import React from "react";
import "./Gauge.css";

const Gauge = ({ value }) => {
  const radius = 40; // Reduced radius of the circle
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const strokeDashoffset =
    circumference - (Math.abs(value) / 100) * circumference;

  // Choose color based on whether value is negative or positive
  const fillColor = value < 0 ? "red" : "#00bfff"; // Red for negative, blue for positive

  return (
    <div className="gauge-container">
      <svg width="100" height="100" className="gauge">
        {/* Background Circle */}
        <circle
          className="gauge-background"
          cx="50"
          cy="50"
          r={radius}
          strokeWidth="8"
        />
        {/* Gauge Circle */}
        <circle
          className="gauge-fill"
          cx="50"
          cy="50"
          r={radius}
          strokeWidth="8"
          strokeDasharray={value < 0 ? 0 : circumference || 0}
          strokeDashoffset={value < 0 ? 0 : strokeDashoffset}
          style={{ stroke: fillColor }}
        />
        {/* Horizontal Text */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".35em"
          className="gauge-text"
        >
          {value}%
        </text>
      </svg>
    </div>
  );
};

export default Gauge;
