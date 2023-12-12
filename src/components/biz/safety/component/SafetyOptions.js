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
                {name:'용담댐', code:'YONGDAM'},
                {name:'대청댐', code:'DAECHEONG'},
                {name:'안동댐', code:'ANDONG'},
                {name:'운문댐', code:'a6'},
                {name:'영천댐', code:'a7'},
                {name:'사연댐', code:'a8'},
                {name:'소양강댐', code:'a10'}
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
                {name:'창녕함안보', code:'b2'}
            ]
        },
        {
            name:'도시', 
            code: 'CITY',
            items: [
                {name:'대전', code:'b2'},
            ]
        },
        {
            name:'시설,사면', 
            code: 'SI',
            items: [
                {name:'논산천제방', code:'b1'},
                {name:'정선 세대터널', code:'b2'},
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
