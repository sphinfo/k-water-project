import BaseGeoserverAxios from "@common/axios/BaseGeoserverAxios";
import { G$addLayer, G$addWidget, G$flyToExtent, G$pointsToCenter, G$pointsToExtent, G$pointsToLowest, G$polygonToCentroid, G$removeLayerForId, G$removeWidget } from "@gis/util";
import React, { useEffect, useRef, useState } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import BaseCustomDataSource from "@gis/layers/BaseCustomDataSource";
import BaseWmsImageLayer from "@gis/layers/BaseWmsImageLayer";
import WaterShedDataSource from "@gis/layers/WaterShedDataSource";
import { Cartesian3, HeadingPitchRange, HeadingPitchRoll, Math as MathC } from "cesium";
import MapManager from "@gis/MapManager";

const Biz1 = () => {

    //
    const [watershed, setWatershed] = useState('')
    
    //가뭄 wms 레이어
    const droughtLayer = useRef({id:''})
    
    //유역 wms 레이어
    const watershedLayer = useRef({id:''})
    //유역 wfs 레이어
    const watershedWfsLayer = useRef({id:''})

    useEffect(()=>{
        G$addWidget('LegendWidget', { params: {title:''}})
        droughtLayer.current = new BaseWmsImageLayer('Drought','20221226_100_7629')
        //watershedWfsLayer.current = new WaterShedDataSource({name:'watershedWfs'})
        watershedWfsLayer.current = new WaterShedDataSource({name:'watershedWfs'})
        //WaterShedChartDataSource
        
        G$addLayer(watershedWfsLayer.current)
        return()=>{
            G$removeWidget('LegendWidget')
            G$removeLayerForId(droughtLayer.current.layer.id)
            //G$removeLayerForId(watershedLayer.current.id)
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

        //권역 중심점 point
        watershedWfsLayer.current.entities.removeAll()
        axios.getFeature('watershed_map','WKMMBSN',`BBSNCD='${watershed}'`).then((res)=>{

            res.features.map((featureObj)=>{
                let centroid = G$polygonToCentroid(featureObj.geometry.coordinates)
                watershedWfsLayer.current._addFeature(centroid[0],centroid[1], featureObj.properties)

                console.info(centroid)
                
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

    },[watershed])

    const [selected, setselected] = useState(true);

    useEffect(()=>{
        droughtLayer.current.setVisible(selected ? selected : false)
    },[selected])

    return (
        <>
            {/*  */}
            <div className="tab-float-box">
                    <ToggleButtonGroup className="tab-float-box-button-wrap" value={selected} exclusive onChange={(e,newSelected)=>{setselected(newSelected)}}>
                    <ToggleButton className="tab-float-box-btn" value={true}>유역별 통계 보기</ToggleButton>
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

export default React.memo(Biz1);
