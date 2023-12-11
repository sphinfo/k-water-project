import React from "react";
import Tooltip from '@mui/material/Tooltip';

const InfoB = (props) => {
    return (
        <>
            <Tooltip placement="top" title={
                <React.Fragment>
                    <div className="tooltip-content-wrap">
                        <h5 className="tooltip-title">강우 해갈(drought relief)의 정의</h5>
                        <p className="tooltip-content">
                            1. 가뭄 판단 기준 심각 단계 7일 이상 <br/>
                            2. 가뭄 판단 기준 정상 단계 15일 지속
                        </p>
                    </div>
                </React.Fragment>
            }>
                <span>BASE MAP</span>
                <span className="tooltip-icon"></span>
            </Tooltip>
        </>
    )
}

export default React.memo(InfoB);
