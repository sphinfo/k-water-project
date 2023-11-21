import { toJS } from "mobx";
import React, { useEffect, useState } from "react";

/** 범례 공통으로 사용할경우 param 받아서 범례값 title 변경 예시 230731 */
const BaseLegendGradientWidget = (props) => {

    const {params, ...other} = props
    const [title, setTitle] = useState('')
    const [datas, setDatas] = useState([])
    const [max, setMax] = useState(0)
    const [min, setMin] = useState(0)

    useEffect(()=>{
        setTitle(params.title)
        setDatas(toJS(params.datas));
        setMin(params.min)
        setMax(params.max)

    },[params.title, params.datas, params.min, params.max])

    useEffect(()=>{
        console.info(datas)
    },[datas])

    return (
        <>

        <div className="map_widget map-basic-style"  >
            <dl className="widget-box legend-gradient">
                <dt className="widget-header"><h4 className="widget-title">{title}</h4></dt>
                <dd className="widget-body">
                    {datas && datas.length > 3 ? (
                      <div className="widget-legend-chip"
                           style={{background: `linear-gradient(90deg, ${datas[0]} 0%, ${datas[1]} 25.52%, ${datas[2]} 52.08%, ${datas[3]} 77.08%, ${datas[4]} 100%)`}}>
                      </div>
                    ) : null}
                    <ul className="widget-legend-unit">
                        <li>{max}</li>
                        <li>{min}</li>
                    </ul>
                </dd>
            </dl>
        </div>


            
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
                        </div> */}