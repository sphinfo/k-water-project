import BaseGeoserverAxios from "@common/axios/BaseGeoserverAxios";
import MapManager from "@gis/MapManager";
import BaseWmsLayer from "@gis/layers/BaseWmsLayer";
import { G$addLayer, G$removeLayer } from "@gis/util";
import { Color, DataSourceCollection, GeoJsonDataSource, PolygonGraphics } from "cesium";
import React, { useEffect, useRef } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const Biz1 = () => {

    const bizLayer = useRef()

    useEffect(()=>{

        bizLayer.current = new BaseWmsLayer('WaterBody', '수체_샘플데이터')
        G$addLayer(bizLayer.current)

        return()=>{
            G$removeLayer('WaterBody:수체_샘플데이터')
        }

    },[])

    const sampleFeatureAdd = async() =>{
        
        let aa = new BaseGeoserverAxios()
        aa.getFeature('sckmpp','SGG_KCB_AVG_ICM',"sido_nm='전라남도'").then((res)=>{

            const dataSourceCollection = new DataSourceCollection();
            const geoJsonDataSource = new GeoJsonDataSource();
            dataSourceCollection.add(geoJsonDataSource);

            GeoJsonDataSource.load(res).then((loadedDataSource) => {

                const  entities = loadedDataSource.entities.values
                entities.map((entity)=>{
                    entity.polygon = new PolygonGraphics({
                        hierarchy: entity.polygon.hierarchy,
                        material: Color.RED.withAlpha(0.2), // Fill color with transparency
                        outline: true,
                        outlineColor: Color.YELLOW,
                        outlineWidth: 5
                    });
                })

                // Add the loaded data source to the DataSourceCollection
                G$addLayer(loadedDataSource)
                MapManager.map.dataSources.add(loadedDataSource);
            });

        })
        
    }

    const [selected, setselected] = React.useState();

    const handleSelcted = (event, newSelected) => {
        setselected(newSelected);
    };

    return (
        <>
            <button onClick={()=>{sampleFeatureAdd()}}>유역별통계보기</button>
            <div className="tab-float-box">

                <div className="tab-float-box-list-wrap">
                    <h1 className="tab-float-box-list-head">
                        유역별 통계 보기
                    </h1>
                    <ToggleButtonGroup className="tab-float-box-button-wrap list-main" value={selected} exclusive onChange={handleSelcted}>
                        <ToggleButton className="tab-float-box-btn list-item" value="0">
                            한강 유역</ToggleButton>
                        <ToggleButton className="tab-float-box-btn list-item" value="1">
                            금강 유역</ToggleButton>
                        <ToggleButton className="tab-float-box-btn list-item" value="2">
                            낙동강 유역</ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </div>
        </>
    )
}

export default React.memo(Biz1);
