import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SafetyDisplaceLevelTab from "./SafetyDisplaceLevelTab";
import SafetyDisplaceLevelComp from "./SafetyDisplaceLevelComp";
import SafetyDisplaceLevelTemp from "./SafetyDisplaceLevelTemp";

const SafetyDisplaceLevel = () => {

    const dispatch = useDispatch()
    const safetyType = useSelector(state => state.safety.safetyType);

    return (
        <>
            <div style={{position: 'absolute', top: 0, left: 305, backgroundColor: 'white', width:300, height: '100%'}}>
                <SafetyDisplaceLevelTab />

                <SafetyDisplaceLevelTemp />
                <SafetyDisplaceLevelComp />
            </div>
        </>
    )
}

export default React.memo(SafetyDisplaceLevel);
