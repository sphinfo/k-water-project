import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SAFETY_SEARCH_ON, SAFETY_TEXT_SAFETY } from "@redux/actions";
import BaseSelectOption from "@common/util/BaseSelectOption";

const SafetyOptions = () => {

    const namesRef = useRef(['YONGDAM','DAECHEONG','ANDONG','UNMUN','YEONGCHEON','SAYEON','JUAM','CHANGNYEONG','DAEJEON','NONSAN'])


    const dispatch = useDispatch()
    const { selectBox } = useSelector(state => state.safety)
    const selectRef = useRef()

    useEffect(()=>{
        if(selectBox !== 'off'){
            selectRef.current.visibleTree = true
        }
    },[selectBox])

    return (
        <>
        <div className={"content-block"} >
            <div className="content-row">
                <div className="content-row-header">
                    <h2 className="content-row-title">검색</h2>
                </div>
                <div className="form-control">
                    <BaseSelectOption ref={selectRef} provider={namesRef.current} searchOn={(type)=>{dispatch({type: SAFETY_SEARCH_ON, searchOn: type})}}  changeItem={(item)=>{dispatch({type: SAFETY_TEXT_SAFETY, text: item})}}/>
                </div>
            </div>
        </div>
            
        </>
    )
}

export default React.memo(SafetyOptions);
