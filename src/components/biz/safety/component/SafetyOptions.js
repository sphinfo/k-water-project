import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseDatePicker from "@common/datepicker/BaseDatePicker";
import { SET_END_DATE_SAFETY, SET_START_DATE_SAFETY } from "@redux/actions";
import SafetyMultipleSelect from "./SafetyMultipleSelect";

const SafetyOptions = ({changeParam, ingre}) => {

    const namesRef = useRef([
        {
            name:'댐', 
            code:'a',
            items: [
                {name:'소양강댐유역', code:'a1'},
                {name:'충주댐유역', code:'a2'},
                {name:'임하댐유역', code:'a3'},
                {name:'주암댐유역', code:'a4'}
            ]
        },
        {
            name:'하천', 
            code: 'b',
            items: [
                {name:'청계천', code:'b1'},
                {name:'온천천', code:'b2'},
                {name:'미호강', code:'b3'}
            ]
        }
    ])

    const dispatch = useDispatch()
    const state = useSelector(state => state.safety);


    return (
        <>
            <div className="tab-float-box-list-wrap">
                <h2 className="tab-float-box-list-head">검색</h2>
                <SafetyMultipleSelect options={namesRef.current}/>
            </div>
            
            <div className="tab-float-box-list-wrap">
                <h2 className="tab-float-box-list-head">기간 설정</h2>
                <BaseDatePicker maxDate={state.endDate} onchangeFromat={(date)=>{dispatch({type: SET_START_DATE_SAFETY, date})}}/>
                <BaseDatePicker minDate={state.startDate} onchangeFromat={(date)=>{dispatch({type: SET_END_DATE_SAFETY, date})}}/>
            </div>
        </>
    )
}

export default React.memo(SafetyOptions);
