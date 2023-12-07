import React from "react";
import Tooltip from '@mui/material/Tooltip';
import IconButton from "@mui/material/IconButton";

const InfoB = (props) => {
    return (
        <>
            <div>
                BASE MAP
                <Tooltip placement="right-start" title={
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
                    <IconButton className={'tooltip-icon'}></IconButton>
                </Tooltip>
            </div>
        </>
    )
}

export default React.memo(InfoB);
