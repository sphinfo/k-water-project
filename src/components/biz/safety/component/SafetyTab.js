import React, { useEffect } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { SAFETY_TYPE } from "@redux/actions";
import { useDispatch, useSelector } from "react-redux";

const SafetyTab = () => {

    const dispatch = useDispatch()
    const safetyType = useSelector(state => state.safety.safetyType);

    return (
        <>
            <ToggleButtonGroup className="tab-float-box-button-wrap list-main" value={safetyType} exclusive onChange={(e, v)=>{dispatch({type: SAFETY_TYPE, safetyType: v})}}>
                <ToggleButton className="tab-float-box-btn list-item" value={"displace"}>변위 등급</ToggleButton>
                <ToggleButton className="tab-float-box-btn list-item" value={"ingre"}>변위 성분</ToggleButton>
                <ToggleButton className="tab-float-box-btn list-item" value={"ingre"}>안전 지수</ToggleButton>
            </ToggleButtonGroup>
        </>
    )
}

export default React.memo(SafetyTab);
