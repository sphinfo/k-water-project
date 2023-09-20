import BaseGeoserverAxios from "@common/axios/BaseGeoserverAxios";
import MapManager from "@gis/MapManager";
import BaseGeoJsonCollection from "@gis/layers/BaseGeoJsonCollection";
import BaseWmsLayer from "@gis/layers/BaseWmsLayer";
import { G$addLayer, G$addWidget, G$removeLayer, G$removeWidget } from "@gis/util";
import React, { useEffect, useRef, useState } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const Biz1 = () => {

    const [watershed, setWatershed] = useState('')
    const droughtLayer = useRef({id:''})
    const wfsLayer = useRef()

    const watershedLayer = useRef({id:''})

    useEffect(()=>{
        G$addWidget('LegendWidget', { params: {title:''}})
        droughtLayer.current = new BaseWmsLayer('Drought','20221226_100_7629')
        G$addLayer(droughtLayer.current)
        return()=>{
            G$removeWidget('LegendWidget')
            G$removeLayer(droughtLayer.current.id)

            G$removeLayer(watershedLayer.current.id)
            
        }

    },[])

    //수계 그룹 변경
    const watershedLayerChange = (event, type) =>{
        watershed === type ? setWatershed('') : setWatershed(type)
        sampleFeatureAdd()
    }
    

    const sampleFeatureAdd = async() =>{
        

        /*watershedLayer.current = new BaseWmsLayer('watershed_map','WKMMBSN',"BBSNCD='10'")
        G$addLayer(watershedLayer.current)*/
        
        /*let aa = new BaseGeoserverAxios()
        aa.getFeature('watershed_map','WKMMBSN',"BBSNCD='10'").then((res)=>{
            wfsLayer.current = new BaseGeoJsonCollection({name:'watershed_map:WKMMBSN'})
            wfsLayer.current.add(res)
            G$addLayer(wfsLayer.current)
        })*/
    }

    return (
        <>
            {/*  */}
            <div className="tab-float-box">

                <div className="tab-float-box-list-wrap">
                    <h1 className="tab-float-box-list-head">
                        유역별 통계 보기
                    </h1>
                    <ToggleButtonGroup className="tab-float-box-button-wrap list-main" value={watershed} exclusive onChange={watershedLayerChange}>
                        <ToggleButton className="tab-float-box-btn list-item" value={"hangang"}>한강 유역</ToggleButton>
                        <ToggleButton className="tab-float-box-btn list-item" value={"geumgang"}>금강 유역</ToggleButton>
                        <ToggleButton className="tab-float-box-btn list-item" value={"nakdong"}>낙동강 유역</ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </div>
        </>
    )
}

export default React.memo(Biz1);
