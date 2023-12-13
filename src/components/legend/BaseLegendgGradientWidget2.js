import { toJS } from "mobx";
import React, { useEffect, useState } from "react";

/** 범례 공통으로 사용할경우 param 받아서 범례값 title 변경 예시 230731 */
const BaseLegendgGradientWidget2 = (props) => {

    const {params, ...other} = props
    const [title, setTitle] = useState('')

    // useEffect(()=>{
    //     console.info(datas)
    // },[datas])

    return (
        <>

        <div className="map_widget map-basic-style">
            <dl className="widget-box legend-gradient">
                <dt className="widget-header"><h4 className="widget-title">{title}</h4></dt>
                <dd className="widget-body">
                    <table className="table-basic table-tooltip">
                        <colgroup>
                            <col style={{width: "20%"}}/>
                            <col style={{width: "20%"}}/>
                            <col style={{width: "20%"}}/>
                            <col style={{width: "20%"}}/>
                            <col style={{width: "20%"}}/>
                        </colgroup>
                        <thead>
                        <tr>
                            <th>
                                <span className="table-legend-chip" style={{backgroundColor: "rgb(0, 176, 80)"}}></span>
                                <span>정상</span>
                            </th>
                            <th>
                                <span className="table-legend-chip" style={{backgroundColor: "rgb(255, 241, 113)"}}></span>
                                <span>관심</span>
                            </th>
                            <th>
                                <span className="table-legend-chip" style={{backgroundColor: "rgb(255, 183, 80)"}}></span>
                                <span>주의</span>
                            </th>
                            <th>
                                <span className="table-legend-chip" style={{backgroundColor: "rgb(237, 115, 110)"}}></span>
                                <span>경계</span>
                            </th>
                            <th>
                                <span className="table-legend-chip" style={{backgroundColor: "rgb(92, 5, 5)"}}></span>
                                <span>심각</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>0 초과</td>
                            <td>-0.5  0.0</td>
                            <td>-1.0 ~ -0.5</td>
                            <td>-1.5 ~ -1.0</td>
                            <td>-1.5 이하</td>
                        </tr>
                        </tbody>
                    </table>
                </dd>
            </dl>
        </div>


            
        </>
    )
}

export default React.memo(BaseLegendgGradientWidget2);

{/* <div className="map_widget map-basic-style" style={{bottom: '10px', right: '10px'}}>
                            <div className="widget-box">
                                <div className="widget-header">
                                    <h4 className="widget-title">범례</h4>
                                </div>
                                <div className="widget-body">max-width: 300px(fluid) <br/> min-width: unset</div>
                            </div>
                        </div> */}