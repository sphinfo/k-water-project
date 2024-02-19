import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SAFETY_SEARCH_ON, SAFETY_SELECT_BOX, SAFETY_TEXT_SAFETY } from "@redux/actions";
import BaseSelectOption from "@common/util/BaseSelectOption";

const SafetyOptions = () => {

    const namesRef = useRef(['YONGDAM','DAECHEONG','ANDONG','UNMUN','YEONGCHEON','JUAM','CHANGNYEONG','NONSAN','SOYANG','SAEDAE'])


    const dispatch = useDispatch()
    const { selectBox } = useSelector(state => state.safety)
    const selectRef = useRef()

    useEffect(()=>{
        selectRef.current.visibleTree = selectBox
    },[selectBox])

    return (
        <>
        <div className={"content-block"} >
            <div className="content-row">
                <div className="content-row-header">
                    <h2 className="content-row-title">검색</h2>
                </div>
                <div className="form-control">
                    <BaseSelectOption ref={selectRef} provider={namesRef.current} searchOn={(type)=>{dispatch({type: SAFETY_SEARCH_ON, searchOn: type}); dispatch({type:SAFETY_SELECT_BOX, selectBox: !type}) }}  changeItem={(item)=>{dispatch({type: SAFETY_TEXT_SAFETY, text: item})}}/>
                </div>
            </div>
        </div>
            
        </>
    )
}

export default React.memo(SafetyOptions);
