import React, { useEffect, useState } from "react";
import { Switch } from "@mui/material";

const SafetyL4Org = () => {


    return (
        <>
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
        </>
    )
}

export default React.memo(SafetyL4Org);
