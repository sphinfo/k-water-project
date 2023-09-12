import BaseWmsLayer from "@gis/layers/BaseWmsLayer";
import { G$addLayer, G$removeLayer } from "@gis/util";
import React, { useEffect, useRef } from "react";

const Biz0 = () => {

    const bizLayer = useRef()

    useEffect(()=>{

        bizLayer.current = new BaseWmsLayer('river_M','DisplacementClass')
        G$addLayer(bizLayer.current)

        return()=>{
            G$removeLayer('DisplacementClass:river_M')
        }

    },[])

    return (
        <>
        </>
    )
}

export default React.memo(Biz0);
