import React, { useEffect, useRef } from "react";
import CesiumMap from "./CesiumMap";

const CesiumMapView = (props) => {

    const mapRef = useRef()
    const cesiumRef = useRef()

    //컨테이너가 생성되면, cesium Map을 해당컨테이너에 그린다.
    useEffect(() => {
        
        cesiumRef.current = new CesiumMap(mapRef);

        return () => {
            cesiumRef.current.destroy();
        }

    }, []);


    return (
        <div id="cesium-map" style={{ position: "fixed", width: "100%", height: "100%" }} ref={mapRef} >
        </div>
    )
}

export default CesiumMapView;
