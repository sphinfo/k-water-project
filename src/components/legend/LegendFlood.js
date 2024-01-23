import React from "react";
import Tooltip from '@mui/material/Tooltip';

const LegendFlood = ({type, ...props}) => {
    return (
        <>
            <Tooltip placement="top" title={
                <React.Fragment>
                    <div className="tooltip-info-wrap">
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
                    </div>
                </React.Fragment>
            }>
                <span className="tooltip-icon"></span>
            </Tooltip>


        </>
    )
}

export default React.memo(LegendFlood);
