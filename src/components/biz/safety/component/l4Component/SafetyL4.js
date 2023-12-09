import React from "react";
import BaseOragDataInfo from "@components/biz/common/BaseOragDataInfo";
import SafetyL4Thematic from "./SafetyL4Thematic";
import SafetyL4CompBtn from "./SafetyL4CompBtn";

/**
 * 안전 활용주제도
 */
const SafetyL4 = () => {

    return (
        <>

            <SafetyL4CompBtn />
            <SafetyL4Thematic />
            <BaseOragDataInfo a={true} b={true}/>
            
        </>
    )
}

export default React.memo(SafetyL4);
