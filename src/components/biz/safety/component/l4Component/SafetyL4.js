import React from "react";
import SafetyL4Comp from "./SafetyL4Comp";
import SafetyL4Tab from "./SafetyL4Tab";
import SafetyL4Result from "./SafetyL4Result";
import SafetyL4Level from "./SafetyL4Level";
import SafetyL4Org from "./SafetyL4Org";

/**
 * 안전 활용주제도
 */
const SafetyL4 = () => {

    return (
        <>
            <div className={"panel side-panel"}>
                <div className={"panel-header"}>
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
                
                <div className="content-block border-top">
                    {/*변위 등급*/}
                    <SafetyL4Level />

                    {/*데이터 원천*/}
                    {/* <SafetyL4Org /> */}
                </div>
            </div>
        </>
    )
}

export default React.memo(SafetyL4);
