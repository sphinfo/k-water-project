import BaseWmsLayer from "@gis/layers/BaseWmsLayer";
import { G$addLayer, G$removeLayer } from "@gis/util";
import React, { useEffect, useRef } from "react";

const Biz3 = () => {

    const bizLayer = useRef()

    useEffect(()=>{

        bizLayer.current = new BaseWmsLayer('SoilMoisture', '52SCF_20230629_M')
        G$addLayer(bizLayer.current)

        return()=>{
            G$removeLayer('SoilMoisture:52SCF_20230629_M')
        }

    },[])

    return (
        <>
        </>
    )
}

export default React.memo(Biz3);
