import React, { useState, useEffect } from "react";
import "../loader/loader.css";

const withLoader = (
  WrappedComponent,
  loadingText = "TCMS",
  timeout = 2000
) => {
  return function WithLoader(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, timeout);

      // Cleanup function to clear the timer if the component unmounts
      return () => clearTimeout(timer);
    }, [timeout]);

    if (hasError) {
      return <div>Error loading component</div>;
    }

    if (isLoading) {
      return (
        <div className="spinnerMain" role="alert" aria-live="assertive">
          <div className="loadingScreen">
            <h3 className="loadingScreen__text">
              {loadingText.split("").map((char, index) => (
                <span key={index} className="loadingScreen__text__span">
                  {char !== " " ? char : "\u00A0\u00A0"}
                </span>
              ))}
            </h3>
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withLoader;
