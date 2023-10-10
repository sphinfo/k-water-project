import BaseGeoserverAxios from "@common/axios/BaseGeoserverAxios";
import { G$addLayer, G$addWidget, G$flyToExtent, G$pointsToCenter, G$pointsToExtent, G$pointsToLowest, G$polygonToCentroid, G$removeLayerForId, G$removeWidget } from "@gis/util";
import React, { useEffect, useRef, useState } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import BaseWmsImageLayer from "@gis/layers/BaseWmsImageLayer";
import { Cartesian3, HeadingPitchRange, HeadingPitchRoll, Math as MathC } from "cesium";
import MapManager from "@gis/MapManager";
import WaterShedChartDataSource from "@gis/layers/WaterShedChartDataSource";
import { useDispatch } from "react-redux";
import { LOADING } from "@redux/actions";

const Drought = () => {

    const dispatch = useDispatch()

    //
    const [watershed, setWatershed] = useState(null)
    
    //가뭄 wms 레이어
    const droughtLayer = useRef({id:''})
    
    //유역 wms 레이어
    const watershedLayer = useRef({id:''})
    //유역 wfs 레이어
    const watershedWfsLayer = useRef({id:''})

    useEffect(()=>{
        G$addWidget('BaseLegendgGradientWidget', { params: {title:'토양수분', min:10, max: 25, datas:['#FF0000', '#FFA500', '#FAFAD2', '#87CEFA', '#1E90FF']}})
        droughtLayer.current = new BaseWmsImageLayer('Drought','Drought Group') //토양수분레이어
        watershedWfsLayer.current = new WaterShedChartDataSource({name:'watershedWfs'}) //유역통계 레이어
        watershedLayer.current = new BaseWmsImageLayer('watershed_map','WKMMBSN', null, false) //유역 레이어
        watershedLayer.current.setVisible(false)
        
        G$addLayer(watershedWfsLayer.current)
        return()=>{
            G$removeWidget('BaseLegendgGradientWidget')
            G$removeLayerForId(droughtLayer.current.layer.id)
            G$removeLayerForId(watershedLayer.current.layer.id)
            G$removeLayerForId(watershedWfsLayer.current.id)            
        }
    },[])

    //수계 그룹 변경
    const watershedLayerChange = (event, type) =>{
        watershed === type ? setWatershed('') : setWatershed(type)
    }


    
    //유역통계보기 change event
    useEffect(()=>{

        let axios = new BaseGeoserverAxios()

        if(watershed){

            dispatch({type: LOADING, loading: true})

            //권역 중심점 point
            watershedWfsLayer.current.entities.removeAll()
            axios.getFeature('watershed_map','WKMMBSN',`BBSNCD='${watershed}'`).then((res)=>{

                dispatch({type: LOADING, loading: false})

                watershedLayer.current.changeParameters({cqlFilter:`BBSNCD='${watershed}'`})
                watershedLayer.current.setVisible(true)

                res.features.map((featureObj, i)=>{
                    let centroid = G$polygonToCentroid(featureObj.geometry.coordinates)
                    
                    watershedWfsLayer.current._addFeature(centroid[0],centroid[1], featureObj.properties, [])
                    
                })


                const heading = MathC.toRadians(0)
                const pitch = MathC.toRadians(-40)
                const roll = 0

                const orientation = new HeadingPitchRoll(heading, pitch, roll);
                
                let destination = watershed === '10' ? new Cartesian3(-3236232.55293577, 4165419.80060222, 3807589.6471960233) 
                    : watershed === '50'? new Cartesian3(-3183594.3901995705, 4257740.901124633, 3614567.98057984) 
                    : new Cartesian3(-3352269.5879313736, 4216380.864115685, 3647750.428951055) 


                MapManager.map.camera.flyTo({
                    destination : destination,
                    orientation : orientation
                })
                
            })

        }else{
            watershedLayer.current.setVisible(false)
            watershedWfsLayer.current.entities.removeAll()
        }

        

    },[watershed])

    const [droughtTab, setDroughtTab] = useState('soilMoisture');

    useEffect(()=>{
        droughtLayer.current.setVisible(droughtTab ? droughtTab : false)
    },[droughtTab])

    return (
        <>
            {/*  */}
            <div className="tab-float-box">
                    <ToggleButtonGroup className="tab-float-box-button-wrap" value={droughtTab} exclusive onChange={(e,newSelected)=>{setDroughtTab(newSelected)}}>
                    <ToggleButton className="tab-float-box-btn" value={'soilMoisture'}>토양수분</ToggleButton>
                    <ToggleButton className="tab-float-box-btn" value={'droughtIndex'}>가뭄지수</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div className="tab-float-box bottom-left">
                <div className="tab-float-box-list-wrap">
                    <ToggleButtonGroup className="tab-float-box-button-wrap list-main" value={watershed} exclusive onChange={watershedLayerChange}>
                        <ToggleButton className="tab-float-box-btn list-item" value={"10"}>한강 유역</ToggleButton>
                        <ToggleButton className="tab-float-box-btn list-item" value={"50"}>금강 유역</ToggleButton>
                        <ToggleButton className="tab-float-box-btn list-item" value={"20"}>낙동강 유역</ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </div>
        </>
    )
}

export default React.memo(Drought);
