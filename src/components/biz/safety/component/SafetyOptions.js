import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SAFETY_TEXT_SAFETY } from "@redux/actions";
import BaseSelectOption from "@common/util/BaseSelectOption";

const SafetyOptions = () => {

    const namesRef = useRef([
        {
            name:'댐', 
            code:'DAM',
            items: [
                {name:'용담댐', code:'YONGDAM', x:35.9449283, y:127.5246387, z: 35000},
                {name:'대청댐', code:'DAECHEONG', x:36.4775000, y:127.4808330, z: 35000},
                {name:'안동댐', code:'ANDONG', x:36.5848765, y:128.7739109, z: 35000},
                {name:'운문댐', code:'UNMUN', x:35.7240461, y:128.9271935, z: 35000},
                {name:'영천댐', code:'YEONGCHEON', x:36.0637638, y:129.0142288, z: 35000},
                {name:'사연댐', code:'SAYEON', x:35.5800118, y:129.1957466, z: 35000},
                {name:'주암댐', code:'JUAM'},
                {name:'소양강댐', code:'SOYANG'}
            ]
        // },{
        //     name: '지역',
        //     code: 'AREA',
        //     items: [
        //         {name:'강원', code:'ar1'},
        //         {name:'충남', code:'ar2'},
        //         {name:'충청', code:'ar3'},
        //         {name:'전라', code:'ar4'},
        //         {name:'경상', code:'ar5'},
        //     ]
        },
        {
            name:'보', 
            code: 'BO',
            items: [
                {name:'창녕함안보', code:'CHANGNYEONG'}
            ]
        },
        {
            name:'도시', 
            code: 'CITY',
            items: [
                {name:'대전', code:'DAEJEON'},
            ]
        },
        {
            name:'시설,사면', 
            code: 'SI',
            items: [
                {name:'논산천제방', code:'NONSAN'},
                {name:'정선 세대터널', code:'b7'},
            ]
        }
    ])

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
                    <BaseSelectOption ref={selectRef} provider={namesRef.current} changeItem={(item)=>{dispatch({type: SAFETY_TEXT_SAFETY, text: item})}}/>
                </div>
            </div>
            {/*
            <div className="content-row">
                <div className="content-row-header">
                    <h2 className="content-row-title">기간 설정</h2>
                </div>
                <div className="form-control group">
                <BaseDatePicker maxDate={state.endDate} onchangeFromat={(date)=>{dispatch({type: SAFETY_START_DATE, date})}}/>
                    <span>~</span>
                <BaseDatePicker minDate={state.startDate} onchangeFromat={(date)=>{dispatch({type: SAFETY_END_DATE, date})}}/>
                </div>
            </div>
             */}
        </div>
            
        </>
    )
}

export default React.memo(SafetyOptions);
