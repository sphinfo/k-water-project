import React, { useEffect } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const SafetyTab = () => {

    // const dispatch = useDispatch()
    // const safetyType = useSelector(state => state.safety.safetyType);

    return (
        <>
            {/* <ToggleButtonGroup className="tab-float-box-button-wrap list-main" value={safetyType} exclusive onChange={(e, v)=>{dispatch({type: SAFETY_TYPE, safetyType: v})}}> */}
            <ToggleButtonGroup className="tab-float-box-button-wrap list-main" exclusive >
                <ToggleButton className="tab-float-box-btn list-item" value={"2D"}>2D</ToggleButton>
                <ToggleButton className="tab-float-box-btn list-item" value={"3D"}>3D</ToggleButton>
            </ToggleButtonGroup>
        </>
    )
}

export default React.memo(SafetyTab);
