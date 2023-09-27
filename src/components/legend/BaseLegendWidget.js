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
