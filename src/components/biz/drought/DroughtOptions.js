import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DROUGHT_END_DATE, DROUGHT_START_DATE, DROUGHT_SET_TEXT } from "@redux/actions";
import BaseSelectOption from "@common/util/BaseSelectOption";
import BaseDatePicker from "@common/datepicker/BaseDatePicker";

const DroughtOptions = () => {

    const namesRef = useRef([
        {
            name:'댐', 
            code:'DAM',
            items: [
                {name:'용담댐', code:'YONGDAM'},
                {name:'황강댐', code:'a2'},
                {name:'임남댐', code:'a3'},
                {name:'대청댐', code:'a4'},
                {name:'안동댐', code:'a4'},
                {name:'운문댐', code:'a4'},
                {name:'영천댐', code:'a4'},
                {name:'사연댐', code:'a4'},
                {name:'주암댐', code:'a4'},
                {name:'소양강댐', code:'a4'}
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
            name:'하천', 
            code: 'RIVER',
            items: [
                {name:'내성천(낙동강)', code:'b1'},
                {name:'미호강', code:'b2'},
                {name:'남천(위천)', code:'b3'},
            ]
        },
        {
            name:'시설,사면', 
            code: 'SI',
            items: [
                {name:'정선 세대터널', code:'b2'},
            ]
        }
    ])

    const dispatch = useDispatch()
    const { startDate, endDate } = useSelector(state => state.drought)

    return (
        <>
        <div className={"content-block"}>
            <div className="content-row">
                <div className="content-row-header">
                    <h2 className="content-row-title">검색</h2>
                </div>
                <div className="form-control">
                    <BaseSelectOption provider={namesRef.current} changeItem={(item)=>{dispatch({type: DROUGHT_SET_TEXT, text: item})}}/>
                </div>
            </div>
            
            <div className="content-row">
                <div className="content-row-header">
                    <h2 className="content-row-title">기간 설정</h2>
                </div>
                <div className="form-control group">
                    <BaseDatePicker maxDate={endDate} onchangeFromat={(date)=>{dispatch({type: DROUGHT_START_DATE, date})}}/>
                    <span>~</span>
                    <BaseDatePicker minDate={startDate} onchangeFromat={(date)=>{dispatch({type: DROUGHT_END_DATE, date})}}/>
                </div>
            </div>
            
        </div>
            
        </>
    )
}

export default React.memo(DroughtOptions);
