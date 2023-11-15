import React from "react";
import SafetyL4Comp from "./SafetyL4Comp";
import SafetyL4Tab from "./SafetyL4Tab";
import SafetyL4Result from "./SafetyL4Result";

/**
 * 활용주제도
 */
const SafetyL4 = () => {

    return (
        <>
            <div style={{position: 'absolute', top: 0, left: 305, backgroundColor: 'white', width:300, height: '100%'}}>    
                <div style={{margin: 5}}>
                    <h1 style={{fontSize: 20}}>
                        {"활용주제도"}
                    </h1>
                    <SafetyL4Tab />
                    <SafetyL4Result />
                    <SafetyL4Comp />

                    {/* 변위등급 */}
                    {/* <SafetyDisplaceLevel1 /> */}
                    {/* 데이터 원천 */}
                    {/* <SafetyDisplaceLevel2 /> */}
                </div>
            </div>
        </>
    )
}

export default React.memo(SafetyL4);
