import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ENV_SET_TEXT, ENV_START_DATE, ENV_END_DATE } from "@redux/actions";
import BaseSelectOption from "@common/util/BaseSelectOption";
import BaseDatePicker from "@common/datepicker/BaseDatePicker";
import dayjs from "dayjs";

const EnvironmentOptions = () => {

    const namesRef = useRef([
        {
            name:'댐', 
            code:'DAM',
            items: [
                {name:'용담댐', code:'YONGDAM'},
                {name:'대청댐', code:'DAECHEONG'},
                {name:'안동댐', code:'ANDONG'},
                {name:'운문댐', code:'UNMUN'},
                {name:'사연댐', code:'SAYEON'},
                {name:'소양강댐', code:'SOYANG'}
            ]
        },
        {
            name:'보', 
            code: 'BO',
            items: [
                {name:'세종보', code:'SEJONG'},
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
            name:'하천', 
            code: 'RIVER',
            items: [
                {name:'미호강', code:'MIHOCHEON'},
            ]
        // },{
        //     name: '지역',
        //     code: 'AREA',
        //     items: [
        //         {name:'충청', code:'ar3'},
        //         {name:'경상', code:'ar5'},
        //         {name:'전라', code:'ar4'},
        //         {name:'강원', code:'ar2'},
        //     ]
          }
    ])

    const dispatch = useDispatch()
    const { startDate, endDate, selectBox } = useSelector(state => state.environment)
    const selectRef = useRef()

    useEffect(()=>{
        if(selectBox !== 'off'){
            selectRef.current.visibleTree = true
        }
    },[selectBox])
    return (
        <>
        <div className={"content-block"}>
            <div className="content-row">
                <div className="content-row-header">
                    <h2 className="content-row-title">검색</h2>
                </div>
                <div className="form-control">
                    <BaseSelectOption ref={selectRef} provider={namesRef.current} changeItem={(item)=>{dispatch({type: ENV_SET_TEXT, text: item})}}/>
                </div>
            </div>
            
            <div className="content-row">
                <div className="content-row-header">
                    <h2 className="content-row-title">기간 설정</h2>
                </div>
                <div className="form-control group">
                    <BaseDatePicker date={dayjs('20100101')} maxDate={endDate} onchangeFromat={(date)=>{dispatch({type: ENV_START_DATE, date})}}/>
                    <span>~</span>
                    <BaseDatePicker minDate={startDate} onchangeFromat={(date)=>{dispatch({type: ENV_END_DATE, date})}}/>
                </div>
            </div>
            
        </div>
            
        </>
    )
}

export default React.memo(EnvironmentOptions);
