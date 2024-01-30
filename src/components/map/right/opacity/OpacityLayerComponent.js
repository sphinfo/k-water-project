import { G$imageLayersOpacity } from "@gis/util";
import React from "react";
import { useSelector } from "react-redux";

const OpacityLayerComponent = () => {

    const opacityMode = useSelector(state => state.main.opacity);

    const changeOpacity = (e)=>{
        G$imageLayersOpacity(e.target.value/10)
    }

    return (
        <>  
            <div className="map-layer-box map-opacity-box" style={{display: opacityMode ? '': 'none'}}>
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
