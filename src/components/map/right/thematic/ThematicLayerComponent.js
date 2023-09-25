import React from "react";
import { useRef } from "react";
import ThematicLayerCheckBoxList from "./ThematicLayerCheckBoxList";
import ThematicTreeLayerCheckBoxList from "./ThematicTreeLayerCheckBoxList";


const ThematicLayerComponent = () => {

    const treeRef = useRef([])

    return (
        <>  
                <div className="thematic-layers-box">
                        {/* <ThematicLayerCheckBoxList ref={treeRef} /> */}
                        <ThematicTreeLayerCheckBoxList ref={treeRef} />
                </div>

        </>
    )
}

export default React.memo(ThematicLayerComponent);
