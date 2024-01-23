import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import img from "@images/image 51.png"
import BaseOragDataInfo from "@components/biz/common/BaseOragDataInfo";
import { G$RandomId, G$addWidget, G$flyToPoint, G$paramWidget, G$removeWidget } from "@gis/util";
import EnvironmentThematic from "./EnvironmentThematic";
import BasePolygonEntityCollection from "@gis/layers/BasePolygonEntityCollection";

/**
 * 환경 4레벨
 */
const EnvironmentL4 = ({ mainLayer, ...props}) => {

    /**
     * selectEnvironmentLayer: 수변피복 레이어 선택
     */

    const areaLayer = useRef()

    useEffect(()=>{
        areaLayer.current = new BasePolygonEntityCollection({name:'enviAreaLayer'})
        return()=>{
            G$removeWidget('EnvironmentLandCoverWidget')
            G$removeWidget('EnvironmentAraeWidget')
        }
    },[])

    useEffect(()=>{
        G$removeWidget('EnvironmentLandCoverWidget')
        G$removeWidget('EnvironmentAraeWidget')
        if(mainLayer.group === 'LandCover'){
            G$removeWidget('EnvironmentAraeWidget')
            G$addWidget('EnvironmentLandCoverWidget')
            
        }else if(mainLayer.group === 'Green' || mainLayer.group === 'Garbage'){
            G$removeWidget('EnvironmentLandCoverWidget')   
            

            /*let params = {type:'environment'}
            getAreaInfo(params).then((response) => {
                if(response?.result?.data?.length > 0){
                    test = {latitudeMin:35.31521099,  longitudeMin: 125.9539446,   latitudeMax:35.31179739,    longitudeMin: 125.9558311}
                    areaLayer.current._addFeature({xmin: test.longitudeMin, ymin: test.latitudeMin, xmax: test.longitudeMin, ymax: test.latitudeMax, properties:{id:G$RandomId()}})
                    G$flyToPoint([test.longitudeMin, test.latitudeMin], 46000)
                    let datas = [{area:3, x:1, x:2},{area:5, x:1, x:2},{area:1, x:1, x:2},{area:7, x:1, x:2},{area:3, x:1, x:2},{area:2, x:1, x:2}]
                    G$addWidget('EnvironmentAraeWidget', {params:datas}, {subTitle: mainLayer.group === 'Green' ? '녹조 정보' : '부유물 부유물'})

                    G$GetPointToDetail(longitude, latitude)

                }
            })*/

            let datas = [{area:3, x:1, x:2},{area:5, x:1, x:2},{area:1, x:1, x:2},{area:7, x:1, x:2},{area:3, x:1, x:2},{area:2, x:1, x:2}]
            G$addWidget('EnvironmentAraeWidget', {params:datas}, {subTitle: mainLayer.group === 'Green' ? '녹조 정보' : '부유물 정보'})
        }



    },[mainLayer])



    return (
        <>
            {
                mainLayer && mainLayer.group === 'LandCover' &&
                <EnvironmentThematic />
            }
            <BaseOragDataInfo a={true} b={true}/>
        </>
    )
}

export default React.memo(EnvironmentL4);
