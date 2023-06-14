import React, { useEffect, useRef } from "react";
import OlMap from "./OLmap";

const OLMapView = (props) => {

    const mapRef = useRef();

    let olMap = null;

    //컨테이너가 생성되면, openlayers Map을 해당컨테이너에 그린다.
    useEffect(() => {
        
        olMap = new OlMap(mapRef, props.store);

        return () => {
            olMap.destroy();
        }

    }, []);


    return (
        <div id="ol-map" style={{ position: "fixed", width: "100%", height: "100%" }} ref={mapRef} >
        </div>
    )
}

export default OLMapView;
