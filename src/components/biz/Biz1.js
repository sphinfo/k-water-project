import BaseGeoserverAxios from "@common/axios/BaseGeoserverAxios";
import MapManager from "@gis/MapManager";
import BaseGeoJsonCollection from "@gis/layers/BaseGeoJsonCollection";
import BaseWmsLayer from "@gis/layers/BaseWmsLayer";
import { G$addLayer, G$addWidget, G$removeLayer, G$removeWidget } from "@gis/util";
import { ArcType, Color, DataSourceCollection, GeoJsonDataSource, PolygonGraphics, defined } from "cesium";
import React, { useEffect, useRef, useState } from "react";

const Biz1 = () => {

    const [watershed, setWatershed] = useState('')
    const bizLayer = useRef()
    const wfsLayer = useRef()

    useEffect(()=>{

        bizLayer.current = new BaseWmsLayer('WaterBody', '수체_샘플데이터')
        G$addLayer(bizLayer.current)
        G$addWidget('LegendWidget', { params: {title:''}})
        

        return()=>{
            G$removeLayer('WaterBody:수체_샘플데이터')
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

    return (
        <>
            {/*  */}
            <div className="tab-float-box">
                <div className="tab-float-box-list-wrap">
                    <h1 className="tab-float-box-list-head">
                        유역별 통계 보기
                    </h1>
                    <ul className="tab-float-box-list-main">
                        <li><button onClick={()=>{watershedLayer('hangang')}} className={watershed === 'hangang' ? "active" : ''}>한강 유역</button></li>
                        <li><button onClick={()=>{watershedLayer('geumgang')}} className={watershed === 'geumgang' ? "active" : ''}>금강 유역</button></li>
                        <li><button onClick={()=>{watershedLayer('nakdong')}} className={watershed === 'nakdong' ? "active" : ''}>낙동강 유역</button></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default React.memo(Biz1);
