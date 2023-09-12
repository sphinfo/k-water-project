import React, { useEffect, useRef } from "react";
import { Viewer } from "cesium";

export default function Main() {

  const viewerRef = useRef();

  useEffect(() => {
    if (viewerRef.current) {
      new Viewer(viewerRef.current, {
        homeButton: false,
        sceneModePicker: false,
        timeline: false
      });

    }
    return () => {};
  }, [viewerRef]);

  return <div id="map" ref={viewerRef} />;
}
