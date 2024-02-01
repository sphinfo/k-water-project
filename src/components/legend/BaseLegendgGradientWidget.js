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
                    {datas && datas.length > 3 ? (
                        <div className="widget-legend-chip"
                             style={{background: `linear-gradient(90deg, ${datas[0]} 0%, ${datas[1]} 25.52%, ${datas[2]} 52.08%, ${datas[3]} 77.08%, ${datas[4]} 100%)`}}>
                        </div>
                    ) : null}
                    <ul className="widget-legend-unit">
                        <li>{min}</li>
                        <li>{max}</li>
                    </ul>
                </dd>
            </dl>

            <dl className="widget-box">
                <dt className="widget-header">
                    <h4 className="widget-title">{title}</h4>
                    {tooltip}
                </dt>
                <dd className="widget-body">
                    <ul className="widget-legend-stack">
                        <li style={{background: '#c2523c'}}></li>
                        <li style={{background: '#cf6332'}}></li>
                        <li style={{background: '#de7e23'}}></li>
                        <li style={{background: '#eda113'}}></li>
                        <li style={{background: '#f2b90f'}}></li>
                        <li style={{background: '#f7d707'}}></li>
                        <li style={{background: '#ffff00'}}></li>
                        <li style={{background: '#a6f200'}}></li>
                        <li style={{background: '#4ce600'}}></li>
                        <li style={{background: '#00db00'}}></li>
                        <li style={{background: '#0ec441'}}></li>
                        <li style={{background: '#18ad72'}}></li>
                        <li style={{background: '#20998f'}}></li>
                        <li style={{background: '#1a7b8f'}}></li>
                        <li style={{background: '#135585'}}></li>
                        <li style={{background: '#0b2c7a'}}></li>
                    </ul>
                    <ul className="widget-legend-stack-unit">
                        <li>0</li>
                        <li>5</li>
                        <li>10</li>
                        <li>12.5</li>
                        <li>15</li>
                        <li>17.5</li>
                        <li>20</li>
                        <li>22.5</li>
                        <li>25</li>
                        <li>27.5</li>
                        <li>30</li>
                        <li>32.5</li>
                        <li>35</li>
                        <li>40</li>
                        <li>45</li>
                        <li>50</li>
                        <li>>50</li>
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