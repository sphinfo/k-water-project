import React, { useEffect, useState } from "react";

/** 범례 공통으로 사용할경우 param 받아서 범례값 title 변경 예시 230731 */
const LegendWidget = (props) => {

    const {params, ...other} = props
    const [title, setTitle] = useState('')

    useEffect(()=>{
        setTitle(params.title)
    },[params.title])

    return (
        <>
            <dl className="widget-legend-wrap">
                <dt><h4>(범례 title){title}</h4></dt>
                <dd>
                    <ul>
                        <li><span className="widget-legend-chip legend-test-1"></span>Wet</li>
                        <li><span className="widget-legend-chip legend-test-2"></span>Normal</li>
                        <li><span className="widget-legend-chip legend-test-3"></span>Mild</li>
                        <li><span className="widget-legend-chip legend-test-4"></span>Moderate</li>
                        <li><span className="widget-legend-chip legend-test-5"></span>Server</li>
                        <li><span className="widget-legend-chip legend-test-6"></span>Extreme</li>
                    </ul>
                </dd>
            </dl>
            
        </>
    )
}

export default React.memo(LegendWidget);
