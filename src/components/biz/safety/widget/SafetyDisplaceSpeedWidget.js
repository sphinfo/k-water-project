import { G$removeWidget } from "@gis/util";
import React, { useEffect, useRef } from "react";

//변위 속도
const name = 'SafetyDisplaceSpeedWidget'
const SafetyDisplaceSpeedWidget = (props) => {

    const close = () =>{
        G$removeWidget(name)
    }

    useEffect(()=>{
        return()=>{
            
        }
    },[])

    return (
        <>
            <div className="map-popup-box">
                <div className="map-popup-box-header">
                    <h1 className="map-popup-box-title">변위 속도</h1>
                <button onClick={close} className="popup-close-btn"></button>
                </div>
                <div className="map-popup-box-body">
                    <div className="img-wrap">
                        
                    </div>
                    <div className="table-wrap">
                    <table className="popup-table">
                        <thead>
                        <tr>
                            <th>일시</th>
                            <th>수위<span className="th-unit">(EL.m)</span></th>
                            <th>저수량<span className="th-unit">(백만㎡)</span></th>
                            <th>저수율<span className="th-unit">(%)</span></th>
                            <th>강우량<span className="th-unit">(mm)</span></th>
                            <th>유입량<span className="th-unit">(㎡/s)</span></th>
                            <th>총방류량<span className="th-unit">(㎡/s)</span></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>01.12 13:20</td>
                            <td>187.2795</td>
                            <td>13.7462</td>
                            <td>28.2</td>
                            <td>0.0</td>
                            <td>0.000</td>
                            <td>0.228</td>
                        </tr>
                        <tr>
                            <td>01.12 13:10</td>
                            <td>187.2800</td>
                            <td>13.7469</td>
                            <td>28.2</td>
                            <td>0.0</td>
                            <td>0.000</td>
                            <td>0.228</td>
                        </tr>
                        <tr>
                            <td>01.12 13:20</td>
                            <td>187.2800</td>
                            <td>13.7469</td>
                            <td>28.2</td>
                            <td>0.0</td>
                            <td>0.000</td>
                            <td>0.228</td>
                        </tr>
                        <tr>
                            <td>01.12 13:20</td>
                            <td>187.2800</td>
                            <td>13.7469</td>
                            <td>28.2</td>
                            <td>0.0</td>
                            <td>0.000</td>
                            <td>0.225</td>
                        </tr>
                        <tr>
                            <td>01.12 13:20</td>
                            <td>187.2800</td>
                            <td>13.7469</td>
                            <td>28.2</td>
                            <td>0.0</td>
                            <td>0.000</td>
                            <td>0.226</td>
                        </tr>
                        <tr>
                            <td>01.12 13:20</td>
                            <td>187.2805</td>
                            <td>13.7476</td>
                            <td>28.2</td>
                            <td>0.0</td>
                            <td>0.000</td>
                            <td>0.226</td>
                        </tr>
                        <tr>
                            <td>01.12 13:20</td>
                            <td>187.2810</td>
                            <td>13.7483</td>
                            <td>28.2</td>
                            <td>0.0</td>
                            <td>0.000</td>
                            <td>0.226</td>
                        </tr>
                        <tr>
                            <td>01.12 13:20</td>
                            <td>187.2810</td>
                            <td>13.7483</td>
                            <td>28.2</td>
                            <td>0.0</td>
                            <td>0.000</td>
                            <td>0.226</td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default React.memo(SafetyDisplaceSpeedWidget);
