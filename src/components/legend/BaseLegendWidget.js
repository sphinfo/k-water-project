import { toJS } from "mobx";
import React, { useEffect, useState } from "react";

/** 범례 공통으로 사용할경우 param 받아서 범례값 title 변경 예시 230731 */
const BaseLegendWidget = (props) => {

    const {params, ...other} = props
    const [title, setTitle] = useState('')
    const [datas, setDatas] = useState([])

    useEffect(()=>{
        setTitle(params.title)

        setDatas(toJS(params.datas) );

    },[params.title, params.datas])

    useEffect(()=>{
        console.info(datas)
    },[datas])

    return (
        <>

            <div className="map_widget map-basic-style">
                <div className="widget-box">
                    <div className="widget-header">
                        <h4 className="widget-title">{title}</h4>
                    </div>
                    <div className="widget-body"></div>
                </div>
            </div>

            <dl className="widget-legend-wrap">
                <dt><h4>{title}</h4></dt>
                <dd>
                    <ul>
                        {datas.map((data, index) => (
                            <li key={index}>
                                <span className={`widget-legend-chip`} style={{backgroundColor:data.color}}></span>
                                {data.label}
                            </li>
                        ))}
                    </ul>
                </dd>
            </dl>
            
        </>
    )
}

export default React.memo(BaseLegendWidget);


{/* <div className="map_widget map-basic-style" style={{bottom: '10px', right: '10px'}}>
        <div className="widget-box">
            <div className="widget-header">
                <h4 className="widget-title">범례</h4>
            </div>
            <div className="widget-body">max-width: 300px(fluid) <br/> min-width: unset</div>
        </div>
    </div> */}