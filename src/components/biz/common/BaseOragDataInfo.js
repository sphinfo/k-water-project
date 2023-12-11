import React, {useState} from "react";
import InfoA from "./org/InfoA";
import InfoB from "./org/InfoB";
import InfoC from "./org/InfoC";
import InfoD from "./org/InfoD";

/* 원천데이터 공통 */
const BaseOragDataInfo = (props) => {

    const [visible, setVisible] = useState(false)

    const {a, b, c, d, e, ...other} = props

    return (
        <>
            <div className="map-data">
                <button className="btn btn-map-data" onClick={()=>{setVisible(!visible)}}>
                    원천 데이터 정보 {visible ? '-' : '+'}
                </button>
                <div className="map-data-list" style={{display: visible ? '' : 'none'}}>
                    <div className="map-data-list-item">{ a && <InfoA /> }</div>
                    <div className="map-data-list-item">{ b && <InfoB /> }</div>
                    <div className="map-data-list-item">{ c && <InfoC /> }</div>
                    <div className="map-data-list-item">{ d && <InfoD /> }</div>
                </div>
            </div>
            
        </>
    )
}

export default React.memo(BaseOragDataInfo);
