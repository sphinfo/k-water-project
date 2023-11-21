import React, { useEffect, useState } from "react";
import { SAFETY_SELECT_DISPLACE_LEVEL } from "@redux/actions";
import { useDispatch, useSelector } from "react-redux";

const displaceLevelData = {name:'변위등급', store:'Safety', layer: '20231114_SAFETY_YONGDAM'}

const SafetyL4Level = () => {

    const [dButton, setDButton] = useState(false)

    const dispatch = useDispatch()
    const {select4Level} = useSelector(state => state.safety)

    //변위등급 레이어 on / off
    useEffect(()=>{
        dButton ? dispatch({type:SAFETY_SELECT_DISPLACE_LEVEL, displaceLevel: displaceLevelData}) : dispatch({type:SAFETY_SELECT_DISPLACE_LEVEL, displaceLevel: false})
    },[dButton])

    useEffect(()=>{
        if(select4Level){
            setDButton(false)
        }
    },[select4Level])

    return (
        <>
            <div className="content-row" style={{cursor: 'pointer'}}>
                <div className="content-row-header">
                    <h2 className="content-row-title">변위등급</h2>
                </div>
                <div className="content-list-wrap" onClick={()=>{setDButton(!dButton)}}>
                    <div className="content-list">
                        <div className={`content-list-item ${dButton ? 'item-on' : ''}`} /*  ${dButton ? 'item-on' : ''} */>
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
        </>
    )
}

export default React.memo(SafetyL4Level);
