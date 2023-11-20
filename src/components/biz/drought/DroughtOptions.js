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
                {name:'용담댐유역', code:'YONGDAM'},
                {name:'충주댐유역', code:'a2'},
                {name:'임하댐유역', code:'a3'},
                {name:'주암댐유역', code:'a4'}
            ]
        },
        {
            name:'하천', 
            code: 'RIVER',
            items: [
                {name:'청계천', code:'b1'},
                {name:'온천천', code:'b2'},
                {name:'미호강', code:'b3'}
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
