import React from "react";
import { useRef } from "react";
import ThematicLayerCheckBoxList from "./ThematicLayerCheckBoxList";
import ThematicTreeLayerCheckBoxList from "./ThematicTreeLayerCheckBoxList";
import { useSelector } from "react-redux";


const ThematicLayerComponent = () => {

    const treeRef = useRef([])
    const thematicMode = useSelector(state => state.main.thematic);

    return (
        <>  
                <div className="thematic-layers-box" style={{display: thematicMode ? '': 'none'}}>
                        {/* <ThematicLayerCheckBoxList ref={treeRef} /> */}
                        <ThematicTreeLayerCheckBoxList ref={treeRef} />
                </div>

        </>
    )
}

export default React.memo(ThematicLayerComponent);
