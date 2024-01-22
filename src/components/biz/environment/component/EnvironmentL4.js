import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import img from "@images/image 51.png"
import BaseOragDataInfo from "@components/biz/common/BaseOragDataInfo";
import { G$addWidget, G$removeWidget } from "@gis/util";
import EnvironmentThematic from "./EnvironmentThematic";

/**
 * 환경 4레벨
 */
const EnvironmentL4 = ({ mainLayer, ...props}) => {

    /**
     * selectEnvironmentLayer: 수변피복 레이어 선택
     */


    useEffect(()=>{
        return()=>{
            G$removeWidget('EnvironmentLandCoverWidget')
            G$removeWidget('EnvironmentGarbageWidget')
            G$removeWidget('EnvironmentGreenWidget')
        }
    },[])

    useEffect(()=>{

        if(mainLayer.group === 'LandCover'){
            G$removeWidget('EnvironmentGarbageWidget')
            G$removeWidget('EnvironmentGreenWidget')

            G$addWidget('EnvironmentLandCoverWidget')
            
        }else if(mainLayer.group === 'Green'){

            G$removeWidget('EnvironmentLandCoverWidget')   
            G$removeWidget('EnvironmentGarbageWidget')  
            
            G$addWidget('EnvironmentGreenWidget')
            
        }else if(mainLayer.group === 'Garbage'){

            G$removeWidget('EnvironmentGreenWidget')  
            G$removeWidget('EnvironmentLandCoverWidget')  

            G$addWidget('EnvironmentGarbageWidget')
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
