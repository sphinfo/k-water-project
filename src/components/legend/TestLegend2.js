import { toJS } from "mobx";
import React, { useEffect, useState } from "react";

/**  */
const TestLegend2 = () => {

    const [title, setTitle] = useState('변위 속도2(cm/year)')
    const [datas, setDatas] = useState(['#1E90FF','#87CEFA',  '#FAFAD2', '#FFA500', '#FF0000'])

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
                        <li>{-5}</li>
                        <li>{5}</li>
                    </ul>
                </dd>
            </dl>
        </div>


            
        </>
    )
}

export default React.memo(TestLegend2)