import BaseGeoserverAxios from "@common/axios/BaseGeoserverAxios";
import { G$addLayer, G$addWidget, G$flyToExtent, G$pointsToCenter, G$pointsToExtent, G$polygonToCentroid, G$removeLayerForId, G$removeWidget } from "@gis/util";
import React, { useEffect, useRef, useState } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import BaseCustomDataSource from "@gis/layers/BaseCustomDataSource";
import BaseWmsImageLayer from "@gis/layers/BaseWmsImageLayer";
import WaterShedDataSource from "@gis/layers/WaterShedDataSource";
import { Cartesian3, HeadingPitchRoll, Math as MathC } from "cesium";
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
        watershedWfsLayer.current = new WaterShedDataSource({name:'watershedWfs'})
        
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

        //수계 중심점 point
        watershedWfsLayer.current.entities.removeAll()
        axios.getFeature('watershed_map','WKMMBSN',`BBSNCD='${watershed}'`).then((res)=>{

            let points = []

            res.features.map((featureObj)=>{
                //console.info(featureObj)
                let centroid = G$polygonToCentroid(featureObj.geometry.coordinates)
                watershedWfsLayer.current._addFeature(Math.abs(centroid[0]),Math.abs(centroid[1]), featureObj.properties)

                //console.info(centroid)
                points.push({y:Math.abs(centroid[0]), x: Math.abs(centroid[1]), z: 0})
                
            })

            if(points.length > 0){

                let center = G$pointsToCenter(points)


                const heading = MathC.toRadians(0); // 방향 (90도, 동쪽을 바라봄)
                const pitch = MathC.toRadians(-75); // 경사 (-45도, 아래를 바라봄)
                const roll = 0; // 롤 (0도, 수평)

                const orientation = new HeadingPitchRoll(heading, pitch, roll);
                
                MapManager.map.camera.flyTo({
                    destination : Cartesian3.fromDegrees(center.y, center.x, 195000),
                    orientation : orientation
                })
            }
            
        })

    },[watershed])

    const [selected, setselected] = React.useState('0');

    const handleSelected = (event, newSelected) => {
        setselected(newSelected);
    };

    return (
        <>
            {/*  */}
            <div className="tab-float-box">
                    <ToggleButtonGroup className="tab-float-box-button-wrap" value={selected} exclusive onChange={handleSelected}>
                    <ToggleButton className="tab-float-box-btn" value={'0'}>유역별 통계 보기</ToggleButton>
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
