
import React from 'react';

import BaseWmsLayer from '@gis/layers/BaseWmsLayer';
import { G$addLayer, G$removeLayer } from '@gis/util';
import MainPanelTabComponent from './searchPanel/MainPanelTabComponent';
import BaseGeoserverAxios from '@common/axios/BaseGeoserverAxios';
import MapManager from '@gis/MapManager';
import { Color, DataSourceCollection, GeoJsonDataSource, NearFarScalar } from 'cesium';
import * as Cesium from 'cesium';
import BaseWmsGwcLayer from '@gis/layers/BaseWmsGwcLayer';


const MainSearchPanel = () => {

    const add = () =>{
        //const wmsImageryProvider = new BaseWmsLayer('수체_샘플데이터','WaterBody')
        const wmsImageryProvider = new BaseWmsGwcLayer('lv1_1980yr','EGIS', 'egisGeo')
        G$addLayer(wmsImageryProvider)
    }
    const remove = () =>{
        let id = 'EGIS:lv1_1980yr'
        G$removeLayer(id)
    }

    const sampleFeatureAdd = async() =>{
        
        let aa = new BaseGeoserverAxios()
        aa.getFeature('sckmpp','SGG_KCB_AVG_ICM',"sido_nm='경기도'").then((res)=>{

            const dataSourceCollection = new DataSourceCollection();
            const geoJsonDataSource = new GeoJsonDataSource();
            dataSourceCollection.add(geoJsonDataSource);

            GeoJsonDataSource.load(res).then((loadedDataSource) => {

                const  entities = loadedDataSource.entities.values
                entities.map((entity)=>{
                    entity.polygon = new Cesium.PolygonGraphics({
                        hierarchy: entity.polygon.hierarchy,
                        material: Cesium.Color.RED.withAlpha(0.5), // Fill color with transparency
                        outline: true,
                        outlineColor: Cesium.Color.YELLOW,
                        outlineWidth: 5
                    });
                })

                // Add the loaded data source to the DataSourceCollection
                MapManager.map.dataSources.add(loadedDataSource);
            });

        })

        
        
    }

    const test = () =>{
        

    }

    return (
        <>
            <div style={{ position: 'absolute', display: 'block', margin: 10, background: 'white', width: 380, height: 700 }}>
                <button style={{border: '1px solid', margin: 2}} onClick={add}>{`wms add`}</button>
                <button style={{border: '1px solid', margin: 2}} onClick={remove}>{`wms remove`}</button>
                <button onClick={sampleFeatureAdd}>{`sampleFeatureAdd`}</button>
                <button onClick={test}>{`test`}</button>
                
                {/* <MainPanelTabComponent /> */}
            </div>
        </>
    )
}

export default MainSearchPanel;