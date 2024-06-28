import React, { useState, useEffect } from "react";

const Menu = ({ text }) => {
  const [zoomLevel, setZoomLevel] = useState(3);

  const handleZoomIn = () => {
    if (zoomLevel < 5) setZoomLevel(zoomLevel + 1);
  };

  const handleZoomOut = () => {
    if (zoomLevel > 1) setZoomLevel(zoomLevel - 1);
  };

  useEffect(() => {
    const menu = document.getElementById("menu");
    const range = window.getSelection().getRangeAt(0);
    const rect = range.getBoundingClientRect();
    menu.style.top = `${rect.bottom + window.scrollY}px`;
    menu.style.left = `${
      rect.left + window.scrollX + rect.width / 2 - menu.offsetWidth / 2
    }px`;
  }, []);

  return (
    <div
      id="menu"
      style={{
        position: "absolute",
        background: "white",
        border: "1px solid black",
        padding: "10px",
        zIndex: 1000,
      }}
    >
      <button onClick={handleZoomOut}>-</button>
      <span style={{ margin: "0 10px" }}>Zoom Level: {zoomLevel}</span>
      <button onClick={handleZoomIn}>+</button>
    </div>
  );
};

export default Menu;
