import React from "react";
import Tooltip from '@mui/material/Tooltip';
import img01 from "@images/legend-img-drought01.png"
import img02 from "@images/legend-img-drought02.png"
import img03 from "@images/legend-img-drought03.png"

const LegendDrought = ({type, ...props}) => {
    return (
        <>
            <Tooltip placement="top" title={
                <React.Fragment>
                    <div className="tooltip-info-wrap">
                        
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
                    </div>
                </React.Fragment>
            }>
                <span className="tooltip-icon"></span>
            </Tooltip>


        </>
    )
}

export default React.memo(LegendDrought);
