import React from "react";
import Tooltip from '@mui/material/Tooltip';
import img01 from "@images/legend-img-drought01.png"
import img02 from "@images/legend-img-drought02.png"
import img03 from "@images/legend-img-drought03.png"

const LegendInfo = ({type, ...props}) => {
    return (
        <>
            <Tooltip placement="top" title={
                <React.Fragment>
                    <div className="tooltip-info-wrap">
                        {/*홍수 01*/}
                        <div className="tooltip-info">
                            <div className="tooltip-info-box">
                                <h5>피해피복 분류</h5>
                                <p>탐지된 수체 영역의 피복 종류를 건물/초지/나지/목지에 따라 분류한 값<br/>
                                    분류 기준은 환경(피복 분류)와 동일하게 사용함</p>
                            </div>

                            <div className="tooltip-info-box">
                                <h6>입력자료</h6>
                                <p>Sentinel-1 L1 GRD & L3WB_A1</p>
                            </div>

                            <div className="tooltip-info-box">
                                <h6>산출 알고리즘</h6>
                                <p>AI, zonal statistics</p>
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

                        {/*가뭄 01*/}
                        <div className="tooltip-info">
                            <div className="tooltip-info-box">
                                <h5>토양 수분(%)</h5>
                                <p>토양에 포함되어 있는 수분을 토양의 부피(체적)/무게와의 비율로 나타낸 값</p>
                            </div>

                            <div className="tooltip-info-box">
                                <h6>입력자료</h6>
                                <p>Sentinel-1 L1 GRD</p>
                            </div>

                            <div className="tooltip-info-box">
                                <h6>산출 알고리즘</h6>
                                <p>Multiple Linear Regression</p>
                            </div>

                            <div className="tooltip-info-box">
                                <h6>공간해상도(m)</h6>
                                <p>10</p>
                            </div>

                            <div className="tooltip-info-box">
                                <h6>시간해상도(day)</h6>
                                <p>12</p>
                            </div>

                            <div className="tooltip-info-box">
                                <h6>토성별 토양수 특성 (Rawl et al., 1982)</h6>
                                <picture>
                                    <img src={img01} alt=""/>
                                    <figcaption>
                                        Rawls, W. J., D. L. Brakensiek, K. E. Saxton, 1982. Estimation of soil water
                                        properties, Trans. of the ASAE, Vol(25), p.1316-1320, 1328.
                                    </figcaption>
                                </picture>
                            </div>
                        </div>

                        {/*가뭄 02*/}
                        <div className="tooltip-info">
                            <div className="tooltip-info-box">
                                <h5>SWDI(Soil Water Deficit Index)</h5>
                                <p>Martínez-Fernández et al. (2015)*에 의해 제안된 토양수분 지수로 토양속성과 시계열 토양수분을 활용해 산정</p>
                                <picture>
                                    <img src={img02} alt=""/>
                                    <figcaption className="text-right">
                                        θ_FC: 포장용수량<br/>
                                        θ_AWC: 유효토양수분량<br/>
                                        θ: 현재토양수분량<br/>
                                    </figcaption>
                                </picture>
                            </div>

                            <div className="tooltip-info-box">
                                <h6>입력자료</h6>
                                <p>Soil moisture content(%)</p>
                            </div>

                            <div className="tooltip-info-box">
                                <h6>산출 알고리즘</h6>
                                <p>Multiple Linear Regression</p>
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

                        {/*안전 01 - (상향궤도) L3TD_A1*/}
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

                        {/*안전 02 - (상향궤도) L3TD_A2*/}
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

                        {/*안전 03 - (하향궤도) L3TD_A1*/}
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

                        {/*안전 04 - (하향궤도) L3TD_A2*/}
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

                        {/*안전 05*/}
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

                        {/*안전 06*/}
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

                        {/*환경 01*/}
                        <div className="tooltip-info">
                            <div className="tooltip-info-box">
                                <h5>수변 피복</h5>
                                <p>하천의 피복을 5종류의 분류체계를 따라 분류한 값</p>
                            </div>

                            <div className="tooltip-info-box">
                                <h6>입력자료</h6>
                                <p>
                                    Sentinel-1 GRD<br/>
                                    Elevation<br/>
                                    Slope<br/>
                                    Basemap
                                </p>
                            </div>

                            <div className="tooltip-info-box">
                                <h6>산출 알고리즘</h6>
                                <p>Random Foreset(RF_A2)</p>
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

                        {/*환경 02*/}
                        <div className="tooltip-info">
                            <div className="tooltip-info-box">
                                <h5>수변 피복</h5>
                                <p>하천의 피복을 5종류의 분류체계를 따라 분류한 값</p>
                            </div>

                            <div className="tooltip-info-box">
                                <h6>입력자료</h6>
                                <p>
                                    Sentinel-1 GRD<br/>
                                    Elevation<br/>
                                    Slope<br/>
                                    Basemap
                                </p>
                            </div>

                            <div className="tooltip-info-box">
                                <h6>산출 알고리즘</h6>
                                <p>Random Foreset(LGB_A2)</p>
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

                        {/*환경 03*/}
                        <div className="tooltip-info">
                            <div className="tooltip-info-box">
                                <h5>수변 피복 변화 탐지</h5>
                                <p>하천의 피복을 5종류의 분류체계를 따라 분류한 값</p>
                            </div>

                            <div className="tooltip-info-box">
                                <h6>입력자료</h6>
                                <p>
                                    2021년 10월 수변피복(RF_A2)<br/>
                                    2021년 11월 수변피복(RF_A2)
                                </p>
                            </div>

                            <div className="tooltip-info-box">
                                <h6>산출 알고리즘</h6>
                                <p>Random Foreset(LGB_A2)</p>
                            </div>

                            <div className="tooltip-info-box">
                                <h6>공간해상도(m)</h6>
                                <p>10</p>
                            </div>

                            <div className="tooltip-info-box">
                                <h6>시간해상도(month)</h6>
                                <p>1</p>
                            </div>
                        </div>

                        {/*환경 04*/}
                        <div className="tooltip-info">
                            <div className="tooltip-info-box">
                                <h5>부유물 발생</h5>
                                <p>수체에 발생한 부유성 폐기물을 탐지한 영상</p>
                            </div>

                            <div className="tooltip-info-box">
                                <h6>입력자료</h6>
                                <p>Sentinel-1 및 수체영상</p>
                            </div>

                            <div className="tooltip-info-box">
                                <h6>산출 알고리즘</h6>
                                <p>Faster R-CNN</p>
                            </div>

                            <div className="tooltip-info-box">
                                <h6>공간해상도(m)</h6>
                                <p>10</p>
                            </div>

                            <div className="tooltip-info-box">
                                <h6>시간해상도</h6>
                                <p>비주기적(부유물 발생 탐지한 경우)</p>
                            </div>
                        </div>

                        {/*환경 05*/}
                        <div className="tooltip-info">
                            <div className="tooltip-info-box">
                                <h5>녹조 농도(ppb)</h5>
                                <p>수체에 포함된 클로로필-a 농도를 추정한 값</p>
                            </div>

                            <div className="tooltip-info-box">
                                <h6>입력자료</h6>
                                <p>Sentinel-2</p>
                            </div>

                            <div className="tooltip-info-box">
                                <h6>산출 알고리즘</h6>
                                <p>Multiple Layer Perceptron (MLP)</p>
                            </div>

                            <div className="tooltip-info-box">
                                <h6>공간해상도(m)</h6>
                                <p>10</p>
                            </div>

                            <div className="tooltip-info-box">
                                <h6>시간해상도(day)</h6>
                            <p>4 ~ 5</p>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            }>
                <span className="tooltip-icon"></span>
            </Tooltip>


        </>
    )
}

export default React.memo(LegendInfo);
