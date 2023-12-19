import React, {useEffect, useState} from "react";
import { Switch } from "@mui/material";
import { FLOOD_DAMAGE_LAYER } from "@redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { G$addWidget, G$removeWidget } from "@gis/util";
import { getL4Layers } from "@common/axios/common";

const FloodL4WaterBodyThematic = () => {

    const dispatch = useDispatch()

    const [layerInfo, setLayerInfo] = useState(false)

    /**
     * selectWaterLevel: 수위 지점 정보
     */
    const { selectFloodDamageLayer, selectFloodLayer } = useSelector(state => state.flood)


    //닫힐때 침수피해 레이어 초기화
    useEffect(()=>{
        return()=>{
            dispatch({type:FLOOD_DAMAGE_LAYER, selectFloodDamageLayer: false})
            G$removeWidget('FloodL4WaterBodyWidget')
        }
    },[])

    useEffect(()=>{

        if(selectFloodLayer){

            //*******API*************  4레벨 침시피해지도 가져오기/
            getL4Layers({id:selectFloodLayer.id}).then((response)=>{
                if(response.result.data.length > 0){
                    let store = response.result.data[0].dataType
                    let layer = response.result.data[0].name
                    setLayerInfo({...response.result.data[0], store, layer})
                }else{
                    setLayerInfo(false)
                }
            })

        }

    },[selectFloodLayer])

  
    useEffect(()=>{

        if(selectFloodDamageLayer){
            G$addWidget('FloodL4WaterBodyWidget')
        }else{
            G$removeWidget('FloodL4WaterBodyWidget')
        }

    },[selectFloodDamageLayer])

    return (
        <>
            <div className="widget widget-toggle">
                <div className="widget-box">
                    <div className="widget-header">
                        <h4 className="widget-title">활용 주제도</h4>
                    </div>
                    <div className="widget-body" style={{display: !layerInfo ? 'none' : ''}}>
                        <div className="switch-list">
                            <div className="switch-list-item">
                                <span className="switch-label">침수 피해</span>
                                <Switch className="float-box-switch" checked={selectFloodDamageLayer ? true : false} onClick={()=>{
                                    dispatch({type:FLOOD_DAMAGE_LAYER, selectFloodDamageLayer: !selectFloodDamageLayer ? layerInfo : false})
                                }}></Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default React.memo(FloodL4WaterBodyThematic);
