// Loader.jsx

import React from "react";
import "../loader/loader.css";

const Loader = ({ loadingText, downloadPercentage }) => {
  const text = "TCMS";

  return (
    <div className="spinnerMain" role="alert" aria-live="assertive">
      <div className="loadingScreen">
        <h3 className="loadingScreen__text">
          {text.split("").map((char, index) => (
            <span
              key={index}
              className="loadingScreen__text__span"
              style={{ "--i": index + 1 }}
            >
              {char}
            </span>
          ))}
        </h3>
        {loadingText && (
          <>
            <div className="loadingProgress">{loadingText}</div>
            <div className="progressBarContainer">
              <div
                className="progressBar"
                style={{ width: `${downloadPercentage}%` }}
                aria-valuenow={downloadPercentage}
                aria-valuemin="0"
                aria-valuemax="100"
                role="progressbar"
              ></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Loader;
