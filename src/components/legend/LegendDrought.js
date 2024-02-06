import React from "react";
import Tooltip from '@mui/material/Tooltip';
import img01 from "@images/legend-img-drought01.png"
import img02 from "@images/legend-img-drought02.png"
import img03 from "@images/legend-img-drought03.png"

const LegendDrought = ({type, mainLayer, ...props}) => {
    return (
        <>
            <Tooltip placement="top" title={
                <React.Fragment>
                    <div className="tooltip-info-wrap">
                        
                        {
                            type === 'soilMoisture' &&
                            <div className="tooltip-info">
                                <div className="tooltip-info-box">
                                    <h5>토양 수분(%)</h5>
                                    <p>토양에 포함되어 있는 수분을 토양의 부피(체적)/무게와의 비율로 나타낸 값</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>입력자료</h6>
                                    {
                                        mainLayer?.category === 'L3SMA1' &&
                                        <p>Sentinel-1 VV편파 후방산란계수</p>
                                    }
                                    {
                                        mainLayer?.category === 'L3SMA2' &&
                                        <>
                                            <p>L3SM_A1 산출물</p>
                                            <p>SAR 기반 식생 지수</p>
                                            <p>1~5일 전 선행 강우량</p>
                                            <p>지형 정보</p>
                                        </>
                                    }
                                    {
                                        mainLayer?.category === 'L3SMA3' &&
                                        <>
                                            <p>L3SM_A1 산출물</p>
                                            <p>SAR 기반 식생 지수</p>
                                            <p>1~5일 전 선행 강우량</p>
                                            <p>지형 정보</p>
                                            <p>토양 정보</p>
                                        </>

                                    }
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>산출 알고리즘</h6>
                                    {
                                        mainLayer?.category === 'L3SMA1' &&
                                        <>
                                            <p>TU-wien change detection algorithm</p>
                                        </>
                                    }
                                    {
                                        mainLayer?.category === 'L3SMA2' &&
                                        <>
                                            <p>Random forest</p>
                                        </>
                                    }
                                    {
                                        mainLayer?.category === 'L3SMA3' &&
                                        <>
                                            <p>Random forest</p>
                                        </>
                                    }

                                </div>

                                <div className="tooltip-info-box">
                                    <h6>공간해상도(m)</h6>
                                    <p>10</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>시간해상도(day)</h6>
                                    <p>12</p>
                                </div>
                            </div>
                        }

                        {
                            /*L4DR_A1 - 가뭄지수 레전드 인포*/
                            type === 'index' &&
                            <div className="tooltip-info">
                                <div className="tooltip-info-box">
                                    <h5>가뭄지수</h5>
                                    <p>Martínez-Fernández et al. (2015)*에 의해 제안된 토양수분기반 가뭄지수</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>입력자료</h6>
                                    <p>L3SM_A3 토양수분 산출물</p>
                                    <p>토양정보</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>산출 알고리즘</h6>
                                    <picture>
                                        <img src={img02} alt=""/>
                                        <figcaption className="text-right">
                                            θ_FC: 포장용수량<br/>
                                            θ_AWC: 유효토양수분량<br/>
                                            θ: 현재토양수분량<br/>
                                        </figcaption>
                                    </picture>
                                    <table className="table-basic table-tooltip">
                                        <colgroup>
                                            <col width="50%"/>
                                            <col width="50%"/>
                                        </colgroup>
                                        <thead>
                                        <tr>
                                            <th>SWDI value</th>
                                            <th>Drought Level</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>SWDI &gt; 0</td>
                                            <td>No drought</td>
                                        </tr>
                                        <tr>
                                            <td>0 &gt; SWDI &gt; -2</td>
                                            <td>Mild</td>
                                        </tr>
                                        <tr>
                                            <td>-2 &gt; SWDI &gt; -5</td>
                                            <td>Moderate</td>
                                        </tr>
                                        <tr>
                                            <td>-5 &gt; SWDI &gt; -10</td>
                                            <td>Servere</td>
                                        </tr>
                                        <tr>
                                            <td>-10 &gt; SWDI</td>
                                            <td>Extreme</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>공간해상도(m)</h6>
                                    <p>10</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>시간해상도(day)</h6>
                                    <p>12</p>
                                </div>
                            </div>
                        }

                        {
                            /*L4DR_A2 - 가뭄해갈 강우량 레전드 인포*/
                            type === 'appease' &&
                            <div className="tooltip-info">
                                <div className="tooltip-info-box">
                                    <h5>가뭄해갈 강우량</h5>
                                    <p>생장저해수분점*을 기준으로 현재 토양수분과의 차이를 계산하여 가뭄의 해갈에 필요한 토양수분량을 계산한 결과</p>
                                    <ul className="info-annotation">
                                        <li>* 생장저해수분점: 식물이 더 이상 흡수할
                                            물이 없을 정도의 토양 수분 함유량
                                        </li>
                                        <li>* 강수량의 차단량, 증발산량 등 외부요인에 대한
                                            고려는 하지 않고 현재 토양수분의 부족량을 표출
                                        </li>
                                    </ul>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>입력자료</h6>
                                    <p>L3SM_A3 산출물</p>
                                    <p>토양정보</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>산출 알고리즘</h6>
                                    <p>(생장저해수분점 - 현재토양수분 ) X 유효토심</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>공간해상도(m)</h6>
                                    <p>10</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>시간해상도(day)</h6>
                                    <p>12</p>
                                </div>
                            </div>
                        }
                    </div>
                </React.Fragment>
            }>
                <span className="tooltip-icon"></span>
            </Tooltip>


        </>
    )
}

export default React.memo(LegendDrought);
