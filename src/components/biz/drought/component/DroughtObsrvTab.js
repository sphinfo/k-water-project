import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { DROUGHT_OBSRV_TAB } from "@redux/actions";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * 가뭄 활용주제도 TAB
 */
const DroughtObsrvTab = () => {

    const dispatch = useDispatch()
    const {obsrvTab} = useSelector(state => state.drought);

    return (
        <>
            <ToggleButtonGroup className="tab-float-box-button-wrap list-main" fullWidth={true} exclusive value={obsrvTab} onChange={(e, v)=>{dispatch({type: DROUGHT_OBSRV_TAB, obsrvTab: v})}}>
                <ToggleButton className="tab-float-box-btn list-item" value={"soilMoisture"}>토양수분</ToggleButton>
                <ToggleButton className="tab-float-box-btn list-item" value={"index"}>가뭄지수</ToggleButton>
            </ToggleButtonGroup>
        </>
    )
}

export default React.memo(DroughtObsrvTab);
