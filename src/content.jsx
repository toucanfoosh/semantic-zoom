import React from "react";
import ReactDOM from "react-dom";

class ContentApp extends React.Component {
  componentDidMount() {
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
    overlay.style.zIndex = "1000";
    overlay.textContent = "This is an overlay!";
    document.body.appendChild(overlay);
  }

  render() {
    return null;
  }
}

const appElement = document.createElement("div");
document.body.appendChild(appElement);
ReactDOM.render(<ContentApp />, appElement);
