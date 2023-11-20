import React from "react";
import SafetyL4Comp from "./SafetyL4Comp";
import SafetyL4Tab from "./SafetyL4Tab";
import SafetyL4Result from "./SafetyL4Result";
import Switch from "@mui/material/Switch";

/**
 * 활용주제도
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
                {/*변위 등급 + 데이터 원천*/}
                <div className="content-block border-top">
                    <div className="content-row">
                        <div className="content-row-header">
                            <h2 className="content-row-title">변위등급</h2>
                        </div>
                        <div className="content-list-wrap">
                            <div className="content-list">
                                <div className={`content-list-item`} /*  ${dButton ? 'item-on' : ''} */>
                                    <div className="list-title-wrap">
                                        <div className="list-title">North-South</div>
                                    </div>
                                    <div className="list-body">
                                        <div className="list-shadow"></div>
                                        <div className="img-box"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-row">
                        <div className="content-row-header">
                            <h2 className="content-row-title">데이터 원천</h2>
                        </div>
                        <div className="control-box-wrap">
                            <ul className="control-box">
                                <li className="switch-item">
                                    <span className="switch-label">수자원위성</span>
                                    <Switch className="float-box-switch"></Switch>
                                </li>
                                <li className="switch-item">
                                    <span className="switch-label">Sentinel - 1</span>
                                    <Switch className="float-box-switch"></Switch>
                                </li>
                                <li className="switch-item">
                                    <span className="switch-label">ALOS - 2</span>
                                    <Switch className="float-box-switch"></Switch>
                                </li>
                                <li className="switch-item">
                                    <span className="switch-label">TerraSAR - X</span>
                                    <Switch className="float-box-switch"></Switch>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                    {/* 변위등급 */}
                    {/* <SafetyDisplaceLevel1 /> */}
                    {/* 데이터 원천 */}
                    {/* <SafetyDisplaceLevel2 /> */}
            </div>
        </>
    )
}

export default React.memo(SafetyL4);
