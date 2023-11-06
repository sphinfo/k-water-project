import React, { useEffect } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { SAFETY_TYPE } from "@redux/actions";
import { useDispatch, useSelector } from "react-redux";

const SafetyDisplaceLevel = () => {

    const dispatch = useDispatch()
    const safetyType = useSelector(state => state.safety.safetyType);

    return (
        <>
            <div style={{position: 'absolute', top: 0, left: 305, backgroundColor: 'white', width:300, height: '100%'}}>
                <div>
                    <h2 style={{color:'black'}}>활용 주제도</h2>
                </div>
                <div>
                    변위 등급
                </div>
                
                <button>설정값 변경</button>
            </div>
        </>
    )
}

export default React.memo(SafetyDisplaceLevel);
