import { G$imageLayersOpacity } from "@gis/util";
import React from "react";

const OpacityLayerComponent = () => {

    const changeOpacity = (e)=>{
        console.info(e.target.value/10)
        G$imageLayersOpacity(e.target.value/10)
    }

    return (
        <>  
            <div className="map-layer-box map-opacity-box">
              <div className="box-header">
                <h4 className="box-title">표출 지도 투명도</h4>
              </div>
              <div className="box-body">
                <input
                  style={{float: 'right', marginTop: 10, marginRight: 10}}
                  type="range"
                  min={1}
                  max={10}
                  defaultValue={10}
                  onClick={(event) => {
                    event.stopPropagation()
                  }}
                  onChange={(event) => changeOpacity(event)}
                />
              </div>
            </div>

        </>
    )
}

export default React.memo(OpacityLayerComponent);
