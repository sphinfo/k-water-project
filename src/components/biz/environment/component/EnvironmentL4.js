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
     * landCoverDetection : 
     */

    useEffect(()=>{
        return()=>{
            G$removeWidget('EnvironmentLandCoverWidget')
            G$removeWidget('EnvironmentAraeWidget')
        }
    },[])

    useEffect(()=>{
        G$removeWidget('EnvironmentAraeWidget')
        console.info(mainLayer)
        if(mainLayer.group === 'Garbage'){
            G$addWidget('EnvironmentAraeWidget', {params:mainLayer}, {title: '부유물 정보'})
        }else{
            G$removeWidget('EnvironmentAraeWidget')
        }
    },[mainLayer])

    return (
        <>
            {
                mainLayer && mainLayer.group === 'LandCover' &&
                <EnvironmentThematic mainLayer={mainLayer}/>
            }
        </>
    )
}

export default React.memo(EnvironmentL4);
