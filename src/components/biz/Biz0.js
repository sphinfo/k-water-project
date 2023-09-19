import MainWidgetManager from "@common/widget/WidgetManager";
import BaseWmsLayer from "@gis/layers/BaseWmsLayer";
import { G$addLayer, G$addWidget, G$removeLayer, G$removeWidget } from "@gis/util";
import GisLayerClickTool from "@gis/util/click/GisLayerClickTool";
import React, { useEffect, useImperativeHandle, useRef } from "react";

const Biz0 = () => {

    const bizLayer1 = useRef()
    const bizLayer2 = useRef()
    const bizLayer3 = useRef()
    const bizLayer4 = useRef()

    useEffect(()=>{

        bizLayer1.current = new BaseWmsLayer('Safety','L3TD_A2_YONGDAM_ASC')
        G$addLayer(bizLayer1.current)

        bizLayer2.current = new BaseWmsLayer('Safety','L3TD_A2_YONGDAM_DSC')
        //G$addLayer(bizLayer2.current)

        bizLayer3.current = new BaseWmsLayer('Safety','L4TD_YONGDAM_EW')
        //G$addLayer(bizLayer3.current)

        bizLayer4.current = new BaseWmsLayer('Safety','L4TD_YONGDAM_UD')
        //G$addLayer(bizLayer4.current)

        G$addWidget('LegendWidget', { params: {title:'토양 수분량(%)'} })

        return()=>{
            G$removeLayer(bizLayer1.current.id)
            G$removeLayer(bizLayer2.current.id)
            G$removeLayer(bizLayer3.current.id)
            G$removeLayer(bizLayer4.current.id)
            G$removeWidget('LegendWidget')
            
        }

    },[])

    return (
        <>
        </>
    )
}

export default React.memo(Biz0);
