import React from "react";
import SafetyDisplaceLevelTab from "./SafetyDisplaceLevelTab";
import SafetyDisplaceLevelComp from "./SafetyDisplaceLevelComp";
import SafetyDisplaceLevelTemp from "./SafetyDisplaceLevelTemp";

/**
 * 활용주제도
 */
const SafetyDisplaceLevel = () => {

    return (
        <>
            <div style={{position: 'absolute', top: 0, left: 305, backgroundColor: 'white', width:300, height: '100%'}}>    
                <div style={{margin: 5}}>
                    <h1 style={{fontSize: 20}}>
                        {"활용주제도"}
                    </h1>
                    <SafetyDisplaceLevelTab />
                    <SafetyDisplaceLevelTemp />
                    <SafetyDisplaceLevelComp />

                    {/* 변위등급 */}
                    {/* <SafetyDisplaceLevel1 /> */}
                    {/* 데이터 원천 */}
                    {/* <SafetyDisplaceLevel2 /> */}
                </div>
            </div>
        </>
    )
}

export default React.memo(SafetyDisplaceLevel);
