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
                {name:'황강댐', code:'a2'},
                {name:'임남댐', code:'a3'},
                {name:'대청댐', code:'a4'},
                {name:'안동댐', code:'a5'},
                {name:'운문댐', code:'a6'},
                {name:'영천댐', code:'a7'},
                {name:'사연댐', code:'a8'},
                {name:'주암댐', code:'a9'},
                {name:'소양강댐', code:'a10'}
            ]
        },
        {
            name:'보', 
            code: 'BO',
            items: [
                {name:'세종보', code:'b1'},
                {name:'창녕함안보', code:'b2'}
            ]
        },
        {
            name:'도시', 
            code: 'CITY',
            items: [
                {name:'서울', code:'b1'},
                {name:'대전', code:'b2'},
            ]
        },
        {
            name:'하천', 
            code: 'RIVER',
            items: [
                {name:'낙성천(낙동강)', code:'b1'},
                {name:'미호강', code:'b2'},
                {name:'남천(위천)', code:'b3'},
                {name:'단광천(황룡강)', code:'b4'}
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
