import React from "react";
import { useRef } from "react";
import ThematicLayerCheckBoxList from "./ThematicLayerCheckBoxList";
import ThematicTreeLayerCheckBoxList from "./ThematicTreeLayerCheckBoxList";


const ThematicLayerComponent = () => {

    const treeRef = useRef([])

    return (
        <>  
            <div >
                <div style={{width: 350, height: 550, background: 'white'}}>
                    <div>
                        <ThematicLayerCheckBoxList ref={treeRef} />
                        {/* <ThematicTreeLayerCheckBoxList ref={treeRef} /> */}
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default React.memo(ThematicLayerComponent);
