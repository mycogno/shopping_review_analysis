import "d3-transition";
import { select } from "d3-selection";
import React from "react";
import ReactDOM from "react-dom";
import ReactWordcloud from "react-wordcloud";

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

import words from "./words";
import poswords from "./poswords";
import negwords from "./negwords";

function getCallback(callback) {
  return function (word, event) {
    const isActive = callback !== "onWordMouseOut";
    const element = event.target;
    const text = select(element);
    text
      .on("click", () => {
        if (isActive) {
          window.open(`https://www.google.com/search?q=${word.text}`, "_blank");
        }
      })
      .transition()
      .attr("text-decoration", isActive ? "underline" : "none");
  };
}

const callbacks = {
  getWordColor: (word) => (word.sentiment === 1 ? "orange" : "purple"),
  getWordTooltip: (word) =>
    `단어 "${word.text}"의 가중치는 ${word.value} 입니다`,
  onWordClick: getCallback("onWordClick"),
  onWordMouseOut: getCallback("onWordMouseOut"),
  onWordMouseOver: getCallback("onWordMouseOver"),
};

function App() {
  return (
    <div>
      <div>
        <ReactWordcloud
          callbacks={callbacks}
          words={words}
          size={[1000, 1000]}
          options={{
            rotations: 1,
            rotationAngles: [0],
            fontSizes: [18, 55],
            fontWeight: "bold",
            padding: 5,
          }}
        />
      </div>
      {/* <div>
        <ReactWordcloud
          callbacks={callbacks}
          words={poswords}
          size={[1000, 1000]}
          options={{
            rotations: 1,
            rotationAngles: [0],
            fontSizes: [18, 55],
            fontWeight: "bold",
            padding: 5,
          }}
        />
      </div> */}
      <div>
        <ReactWordcloud
          callbacks={callbacks}
          words={negwords}
          size={[1000, 1000]}
          options={{
            rotations: 1,
            rotationAngles: [0],
            fontSizes: [18, 55],
            fontWeight: "bold",
            padding: 5,
          }}
        />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
