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
            <div style={{position: 'fixed', bottom: 10, left: 400, width: 600, height: 50, display: 'flex'}}>
                <h3 onClick={()=>{setVisible(!visible)}}>원천 데이터 정보 {visible ? '-' : '+'}</h3>
                <div style={{display: visible ? '' : 'none'}}>
                    { a && <InfoA /> }
                    { b && <InfoB /> }
                    { c && <InfoC /> }
                    { d && <InfoD /> }
                </div>
            </div>
            
        </>
    )
}

export default React.memo(BaseOragDataInfo);
