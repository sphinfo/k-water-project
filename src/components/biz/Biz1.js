import BaseGeoserverAxios from "@common/axios/BaseGeoserverAxios";
import MapManager from "@gis/MapManager";
import BaseGeoJsonCollection from "@gis/layers/BaseGeoJsonCollection";
import BaseWmsLayer from "@gis/layers/BaseWmsLayer";
import { G$addLayer, G$removeLayer } from "@gis/util";
import { ArcType, Color, DataSourceCollection, GeoJsonDataSource, PolygonGraphics, defined } from "cesium";
import React, { useEffect, useRef, useState } from "react";

const Biz1 = () => {

    const [watershed, setWatershed] = useState('')
    const bizLayer = useRef()
    const wfsLayer = useRef()

    useEffect(()=>{

        bizLayer.current = new BaseWmsLayer('WaterBody', '수체_샘플데이터')
        G$addLayer(bizLayer.current)

        return()=>{
            G$removeLayer('WaterBody:수체_샘플데이터')
        }

    },[])

    


    const watershedLayer = (type) =>{
        watershed === type ? setWatershed('') : setWatershed(type)
        sampleFeatureAdd()
    }

    useEffect(()=>{
        console.info(watershed)
    },[watershed])

    const test = () =>{
        MapManager.map.dataSources.add(GeoJsonDataSource.load('https://gist.githubusercontent.com/ezze/98a77f60cab8d24613f440599bece3a5/raw/9ac4498a1f0d3f3c80792a73a52672f1c847f43d/russia.json'));
        // var dataSource = GeoJsonDataSource.load('https://gist.githubusercontent.com/ezze/98a77f60cab8d24613f440599bece3a5/raw/9ac4498a1f0d3f3c80792a73a52672f1c847f43d/russia.json');
        // dataSource.then(function(data) {
        //     // Change the arcType to GEODESIC, which is what it was in CesiumJS 1.53.
        //     for (var i = 0; i < data.entities.values.length; i++) {
        //         var entity = data.entities.values[i];
        //         if (defined(entity.polygon)) {
        //             entity.polygon.arcType = ArcType.GEODESIC;
        //         }
        //     }
        //     MapManager.map.dataSources.add(dataSource);
        // });
    }

    const sampleFeatureAdd = async() =>{
        
        let aa = new BaseGeoserverAxios()
        aa.getFeature('sckmpp','BND_ADM_SIDO',"").then((res)=>{
            console.info(res)

            wfsLayer.current = new BaseGeoJsonCollection({name:'sckmpp:BND_ADM_SIDO'})
            wfsLayer.current.add(res)
            G$addLayer(wfsLayer.current)

            // let datasource = GeoJsonDataSource.load( res,
            //     {
            //       stroke: Color.HOTPINK,
            //       fill: Color.PINK.withAlpha(0.5),
            //       strokeWidth: 3,
            //     }
            // )

            // let layer = dataSourceCollection.add(datasource)
            // MapManager.map.dataSources.add(layer)
            //MapManager.map.dataSources.add(dataSourceCollection)


            // GeoJsonDataSource.load(res).then((loadedDataSource) => {

            //     const  entities = loadedDataSource.entities.values
            //     entities.map((entity)=>{
            //         entity.polygon = new PolygonGraphics({
            //             hierarchy: entity.polygon.hierarchy,
            //             material: Color.RED.withAlpha(0.2), // Fill color with transparency
            //             outline: true,
            //             outlineColor: Color.YELLOW,
            //             outlineWidth: 5
            //         });
            //     })

            //     // Add the loaded data source to the DataSourceCollection
            //     G$addLayer(loadedDataSource)
            //     MapManager.map.dataSources.add(loadedDataSource);
            // });

        })
    }

    return (
        <>
            {/*  */}
            <div className="tab-float-box">
                <div className="tab-float-box-list-wrap">
                    {/* <button onClick={()=>{sampleFeatureAdd()}}>유역별통계보기</button> */}
                    <h1 className="tab-float-box-list-head">
                        유역별 통계 보기
                    </h1>
                    <ul className="tab-float-box-list-main">
                        <li><button onClick={()=>{test('hangang')}} className={watershed === 'hangang' ? "active" : ''}>한강 유역</button></li>
                        <li><button onClick={()=>{watershedLayer('geumgang')}} className={watershed === 'geumgang' ? "active" : ''}>금강 유역</button></li>
                        <li><button onClick={()=>{watershedLayer('nakdong')}} className={watershed === 'nakdong' ? "active" : ''}>낙동강 유역</button></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default React.memo(Biz1);
