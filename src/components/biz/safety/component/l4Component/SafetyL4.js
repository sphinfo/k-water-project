import React from "react";
import SafetyL4Comp from "./SafetyL4Comp";
import SafetyL4Tab from "./SafetyL4Tab";
import SafetyL4Result from "./SafetyL4Result";
import SafetyL4Level from "./SafetyL4Level";
import SafetyL4Org from "./SafetyL4Org";
import BaseOragDataInfo from "@components/biz/common/BaseOragDataInfo";
import SafetyL4Thematic from "./SafetyL4Thematic";
import SafetyL4CompBtn from "./SafetyL4CompBtn";

/**
 * 안전 활용주제도
 */
const SafetyL4 = () => {

    return (
        <>
            {/**
             * <div className={"panel-header"}>
                <h1 className={"panel-title"}>
                    {"활용주제도"}
                </h1>
            </div>
            <div className="content-block pb-0">
                <SafetyL4Tab />
            </div>
            <div className="content-body">
                <SafetyL4Result />
                <SafetyL4Comp />
            </div>
             */}

            <SafetyL4CompBtn />
            <SafetyL4Thematic />
            <BaseOragDataInfo a={true} b={true}/>
            
        </>
    )
}

export default React.memo(SafetyL4);
