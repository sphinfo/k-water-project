import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import img from "@images/image 51.png"
import BaseOragDataInfo from "@components/biz/common/BaseOragDataInfo";
import { G$addWidget, G$removeWidget } from "@gis/util";
import EnvironmentThematic from "./EnvironmentThematic";

/**
 * 환경 4레벨
 */
const EnvironmentL4 = () => {

    /**
     * selectEnvironmentLayer: 수변피복 레이어 선택
     */
    const { selectEnvironmentLayer } = useSelector(state => state.environment)


    useEffect(()=>{

        return()=>{
            G$removeWidget('EnvironmentLandCoverWidget')
            G$removeWidget('EnvironmentGarbageWidget')
            G$removeWidget('EnvironmentGreenWidget')
        }
    },[])


    useEffect(()=>{

        if(selectEnvironmentLayer.group === 'LandCover'){
            G$addWidget('EnvironmentLandCoverWidget')
            G$removeWidget('EnvironmentGarbageWidget')
            G$removeWidget('EnvironmentGreenWidget')
        }else if(selectEnvironmentLayer.group === 'Green'){
            //G$addWidget('EnvironmentGreenWidget')
            G$removeWidget('EnvironmentLandCoverWidget')
            //G$removeWidget('EnvironmentGarbageWidget')            
        }else if(selectEnvironmentLayer.group === 'Garbage'){
            //G$addWidget('EnvironmentGarbageWidget')
            //G$removeWidget('EnvironmentGreenWidget')
            G$removeWidget('EnvironmentLandCoverWidget')
        }

    },[selectEnvironmentLayer])



    return (
        <>
            {
                selectEnvironmentLayer && selectEnvironmentLayer.group === 'LandCover' &&
                <EnvironmentThematic />
            }
            <BaseOragDataInfo a={true} b={true}/>
        </>
    )
}

export default React.memo(EnvironmentL4);
