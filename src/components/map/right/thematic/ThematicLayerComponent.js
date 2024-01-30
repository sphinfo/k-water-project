import React from "react";
import { useRef } from "react";
import ThematicLayerCheckBoxList from "./ThematicLayerCheckBoxList";
import ThematicTreeLayerCheckBoxList from "./ThematicTreeLayerCheckBoxList";
import { useSelector } from "react-redux";
import BaseMapWidget from "@components/map/top/BaseMapWidget";


const ThematicLayerComponent = () => {

    const treeRef = useRef([])
    const thematicMode = useSelector(state => state.main.thematic);

    return (
        <>  
            <div className="map-layer-box thematic-layers-box" style={{display: thematicMode ? '': 'none'}}>

                <BaseMapWidget />   {/* 배경지도 */}
                {/* <ThematicLayerCheckBoxList ref={treeRef} /> */}
                <ThematicTreeLayerCheckBoxList ref={treeRef} />
            </div>

        </>
    )
}

export default React.memo(ThematicLayerComponent);
