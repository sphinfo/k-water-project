import React, { useEffect, useState } from "react";
import Tooltip from '@mui/material/Tooltip';
import img01 from "@images/legend-img-drought01.png"
import img02 from "@images/legend-img-drought02.png"
import img03 from "@images/legend-img-drought03.png"

const LegendSafety = ({props, ...other}) => {

    const [infoType, setInfoType] = useState(false)

    useEffect(()=>{
        setInfoType(`${props?.category}_${props?.udew}`)
    },[props])

    return (
        <>
            <Tooltip placement="top" title={
                <React.Fragment>
                    <div className="tooltip-info-wrap">
                        {/*안전 01 - (상향궤도) L3TD_A1*/}
                        {
                            infoType === 'L3TDA1_ASC' && 
                            <div className="tooltip-info">
                                <div className="tooltip-info-box">
                                    <h5>LOS 변위 속도(cm/year)</h5>
                                    <p>위성의 상향 궤도에서 PSInSAR 기법으로 산출된 레이더 관측 방향(Line Of Sight; LOS)으로의 연평균 변위 속도</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>입력자료</h6>
                                    <p>Sentinel-1 L1 SLC</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>산출 알고리즘</h6>
                                    <p>Permanent Scatter Interferometric Synthetic Aperture Radar (PSInSAR)</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>공간해상도(m)</h6>
                                    <p>10</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>시간해상도(day)</h6>
                                    <p>12(일부 기간 제외)</p>
                                </div>
                            </div>
                        }
                        

                        {/*안전 02 - (상향궤도) L3TD_A2*/}
                        {
                            infoType === 'L3TDA2_ASC' && 
                            <div className="tooltip-info">
                                <div className="tooltip-info-box">
                                    <h5>LOS 변위 속도(cm/year)</h5>
                                    <p>위성의 상향 궤도에서 SBAS 기법으로 산출된 레이더 관측 방향(Line Of Sight; LOS)으로의 연평균 변위 속도</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>입력자료</h6>
                                    <p>Sentinel-1 L1 SLC</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>산출 알고리즘</h6>
                                    <p>Small BAseline Subset (SBAS)</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>공간해상도(m)</h6>
                                    <p>10</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>시간해상도(day)</h6>
                                    <p>12(일부 기간 제외)</p>
                                </div>
                            </div>
                        }
                        

                        {/*안전 03 - (하향궤도) L3TD_A1*/}
                        {
                            infoType === 'L3TDA1_DESC' && 
                            <div className="tooltip-info">
                                <div className="tooltip-info-box">
                                    <h5>LOS 변위 속도(cm/year)</h5>
                                    <p>위성의 하향 궤도에서 PSInSAR 기법으로 산출된 레이더 관측 방향(Line Of Sight; LOS)으로의 연평균 변위 속도</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>입력자료</h6>
                                    <p>Sentinel-1 L1 SLC</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>산출 알고리즘</h6>
                                    <p>Permanent Scatter Interferometric Synthetic Aperture Radar (PSInSAR)</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>공간해상도(m)</h6>
                                    <p>10</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>시간해상도(day)</h6>
                                    <p>12(일부 기간 제외)</p>
                                </div>
                            </div>

                        }
                        

                        {/*안전 04 - (하향궤도) L3TD_A2*/}
                        {
                            infoType === 'L3TDA2_DESC' && 
                            <div className="tooltip-info">
                                <div className="tooltip-info-box">
                                    <h5>LOS 변위 속도(cm/year)</h5>
                                    <p>위성의 하향 궤도에서 SBAS 기법으로 산출된 레이더 관측 방향(Line Of Sight; LOS)으로의 연평균 변위 속도</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>입력자료</h6>
                                    <p>Sentinel-1 L1 SLC</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>산출 알고리즘</h6>
                                    <p>Small BAseline Subset (SBAS)</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>공간해상도(m)</h6>
                                    <p>10</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>시간해상도(day)</h6>
                                    <p>12(일부 기간 제외)</p>
                                </div>
                            </div>

                        }
                        

                        {/*안전 05 L4DC*/}
                        {
                            infoType === 'L4DC_undefined' && 
                            <div className="tooltip-info">
                                <div className="tooltip-info-box">
                                    <h5>변위등급</h5>
                                    <p>수평 및 수직 방향의 누적 변위를 기반으로 구분한 변위의 등급</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>입력자료</h6>
                                    <p>수평 및 수직 방향의 누적 변위</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>산출 알고리즘</h6>
                                    <table className="table-basic table-tooltip">
                                        <colgroup>
                                            <col width="75%"/>
                                            <col width="25%"/>
                                        </colgroup>
                                        <thead>
                                        <tr>
                                            <th>평가 기준</th>
                                            <th>평가 등급</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>누적 수평 및 수직 변위 &le; ±10 cm</td>
                                            <td>1(안전)</td>
                                        </tr>
                                        <tr>
                                            <td>±10 cm &lt; 누적 수직 변위 &le; ±30 cm 또는 ±10 cm &lt; 누적 수평 변위 &le; ±50 cm</td>
                                            <td>2(보통)</td>
                                        </tr>
                                        <tr>
                                            <td>누적 수직 변위 &gt; ±30 cm 또는 누적 수평 변위 &gt; ±50 cm</td>
                                            <td>3(위험)</td>
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
                                    <p>12(일부 기간 제외)</p>
                                </div>
                            </div>

                        }
                        

                        {/*안전 06*/}
                        {
                            infoType === 'undefined' && 
                            <div className="tooltip-info">
                                <div className="tooltip-info-box">
                                    <h5>2차원 변위 속도(cm/year)</h5>
                                    <p>수평 및 수직 방향의 연평균 변위 속도</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>입력자료</h6>
                                    <p>위성의 상향 및 하향 궤도에서 PSInSAR 기법으로 관측된 시계열 LOS 변위</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>산출 알고리즘</h6>
                                    <picture>
                                        <img src={img03} alt=""/>
                                        <figcaption className="text-right">
                                            d_(los_asc ), d_(los_dsc ): 상향 및 하향 궤도 LOS 변위<br/>
                                            θ_asc, θ_dsc: 상향 및 하향 궤도 위성의 레이더 입사각<br/>
                                            α_asc, α_dsc: 상향 및 하향 궤도 위성의 진행 방향각<br/>
                                            d_h, d_v: 수평 및 수직 변위<br/>
                                        </figcaption>
                                    </picture>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>공간해상도(m)</h6>
                                    <p>10</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>시간해상도(day)</h6>
                                    <p>12(일부 기간 제외)</p>
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

export default React.memo(LegendSafety);
