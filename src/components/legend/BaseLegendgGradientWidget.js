import { toJS } from "mobx";
import React, { useEffect, useState } from "react";
import LegendInfo from "./LegendInfo";

/** 범례 공통으로 사용할경우 param 받아서 범례값 title 변경 예시 230731 */
const BaseLegendGradientWidget = (props) => {

    const {params, ...other} = props
    const [title, setTitle] = useState('')
    const [datas, setDatas] = useState([])
    const [max, setMax] = useState(0)
    const [min, setMin] = useState(0)
    const [tooltip, setTooltip] = useState(false)
    useEffect(()=>{
        setTitle(params.title)
        setDatas(toJS(params.datas));
        setMin(params.min)
        setMax(params.max)
        setTooltip(params.tooltip)
    },[params.title, params.datas, params.min, params.max])

    return (
        <>
            <dl className="widget-box legend-gradient">
                <dt className="widget-header">
                    <h4 className="widget-title">{title}</h4>
                    {tooltip}
                </dt>
                <dd className="widget-body">
                    <div className="widget-legend-chip"
                         style={{background: `linear-gradient(90deg, ${datas[0]} 0%, ${datas[1]} 12.5%, ${datas[2]} 25%, ${datas[3]} 37.5%, ${datas[4]} 50%, ${datas[5]} 62.5%, ${datas[6]} 75%, ${datas[7]} 87.5%, ${datas[8]} 100%)`}}>
                    </div>
                    <ul className="widget-legend-unit">
                        <li>{min}</li>
                        <li>{max}</li>
                    </ul>
                </dd>
            </dl>
        </>
    )
}

export default React.memo(BaseLegendGradientWidget);

{/* <div className="map_widget map-basic-style" style={{bottom: '10px', right: '10px'}}>
                            <div className="widget-box">
                                <div className="widget-header">
                                    <h4 className="widget-title">범례</h4>
                                </div>
                                <div className="widget-body">max-width: 300px(fluid) <br/> min-width: unset</div>
                            </div>
                        </div> */
}
