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
    const bizLayer = useRef()
    const wfsLayer = useRef()

    useEffect(()=>{
        G$addWidget('LegendWidget', { params: {title:''}})
        return()=>{
            G$removeWidget('LegendWidget')
        }

    },[])

    const watershedLayer = (type) =>{
        watershed === type ? setWatershed('') : setWatershed(type)
        return
        sampleFeatureAdd()
    }

    useEffect(()=>{
        console.info(watershed)
    },[watershed])

    

    const sampleFeatureAdd = async() =>{
        
        let aa = new BaseGeoserverAxios()
        aa.getFeature('sckmpp','BND_ADM_SIDO',"").then((res)=>{
            console.info(res)

            wfsLayer.current = new BaseGeoJsonCollection({name:'sckmpp:BND_ADM_SIDO'})
            wfsLayer.current.add(res)
            G$addLayer(wfsLayer.current)

        })
    }

    const [selected, setselected] = React.useState();

    const handleSelcted = (event, newSelected) => {
        setselected(newSelected);
    };

    return (
        <>
            {/*  */}
            <div className="tab-float-box">

                <div className="tab-float-box-list-wrap">
                    <h1 className="tab-float-box-list-head">
                        유역별 통계 보기
                    </h1>
                    <ToggleButtonGroup className="tab-float-box-button-wrap list-main" value={selected} exclusive onChange={handleSelcted}>
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
