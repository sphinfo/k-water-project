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
        <div className="tab-float-box">
            <div className="tab-float-box-list-wrap">
                <h1 className="tab-float-box-list-head">
                    유역별 통계 보기
                </h1>
                <ul className="tab-float-box-list-main">
                    <li><button>한강 유역</button></li>
                    <li><button>금강 유역</button></li>
                    <li><button className="active">낙동강 유역</button></li>
                </ul>
            </div>
        </div>
    )
}

export default React.memo(Biz1);
