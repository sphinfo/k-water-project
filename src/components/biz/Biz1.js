import BaseWmsLayer from "@gis/layers/BaseWmsLayer";
import { G$addLayer, G$removeLayer } from "@gis/util";
import React, { useEffect, useRef } from "react";

const Biz1 = () => {

    const bizLayer = useRef()

    useEffect(()=>{

        bizLayer.current = new BaseWmsLayer('WaterBody', '수체_샘플데이터')
        G$addLayer(bizLayer.current)

        return()=>{
            G$removeLayer('WaterBody:수체_샘플데이터')
        }

    },[])

    return (
        <>
        </>
    )
}

export default React.memo(Biz1);
