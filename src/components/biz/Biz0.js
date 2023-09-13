import BaseWmsLayer from "@gis/layers/BaseWmsLayer";
import { G$addLayer, G$removeLayer } from "@gis/util";
import GisLayerClickTool from "@gis/util/click/GisLayerClickTool";
import React, { useEffect, useImperativeHandle, useRef } from "react";

const Biz0 = () => {

    const bizLayer = useRef()

    useEffect(()=>{

        bizLayer.current = new BaseWmsLayer('DisplacementClass','river_M')
        G$addLayer(bizLayer.current)


        return()=>{
            G$removeLayer(bizLayer.current.id)
        }

    },[])

    return (
        <>
        </>
    )
}

export default React.memo(Biz0);
