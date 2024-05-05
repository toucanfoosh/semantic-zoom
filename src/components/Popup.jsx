import React, { useState, useEffect } from "react";

function Popup() {
  const [zoomLevel, setZoomLevel] = useState(3); // Example state

  useEffect(() => {
    // Example of how you might interact with Chrome's storage
    chrome.storage.local.get(["zoomLevel"], function (result) {
      if (result.zoomLevel) {
        setZoomLevel(result.zoomLevel);
      }
    });
  }, []);

  return (
    <div>
      <h1>Semantic Zoom Control</h1>
      <p>Current Zoom Level: {zoomLevel}</p>
      <button onClick={() => setZoomLevel(zoomLevel + 1)}>Zoom In</button>
      <button onClick={() => setZoomLevel(zoomLevel - 1)}>Zoom Out</button>
    </div>
  );
}

export default Popup;
