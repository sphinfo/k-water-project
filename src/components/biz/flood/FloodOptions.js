import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ENV_SET_TEXT, ENV_START_DATE, ENV_END_DATE, FLOOD_SET_TEXT, FLOOD_START_DATE, FLOOD_END_DATE } from "@redux/actions";
import BaseSelectOption from "@common/util/BaseSelectOption";
import BaseDatePicker from "@common/datepicker/BaseDatePicker";
import dayjs from "dayjs";

const FloodOptions = () => {

    const namesRef = useRef([
        {
            name:'댐', 
            code:'DAM',
            items: [ 
                {name:'용담댐', code:'YONGDAM'},//code:'YDD'},//
                {name:'황강댐', code:'HG'},
                {name:'임남댐', code:'IN'},
                {name:'대청댐', code:'DAECHEONG'},//code:'DC'},//
                {name:'안동댐', code:'ANDONG'},//code:'ADD'},//
                {name:'운문댐', code:'UNMUN'},
                {name:'영천댐', code:'YEONGCHEON'},
                {name:'사연댐', code:'SAYEON'},
            ]
        // },{
        //   name: '지역',
        //   code: 'AREA',
        //   items: [
        //     {name:'수도권', code:'ar1'},
        //     {name:'강원', code:'ar2'},
        //     {name:'충청', code:'ar3'},
        //     {name:'전라', code:'ar4'},
        //     {name:'경상', code:'ar5'},
        //   ]
        },{
            name:'도시', 
            code: 'CITY',
            items: [
                {name:'서울', code:'SEOUL'},
                {name:'대전', code:'DAEJEON'},//
            ]
        },
        {
            name:'하천', 
            code: 'RIVER',
            items: [
                {name:'내성천(낙동강)', code:'NAESEONGCHEON'},//code:'NS1'},//
                {name:'낙성천(낙동강)', code:'b1'},
                {name:'미호강', code:'MIHOCHEON'}, //code:'b2'},//
                {name:'남천(위천)', code:'WYECHEON'},//code:'b3'},//
            ]
        }
    ])

    const dispatch = useDispatch()
    const { startDate, endDate, selectBox } = useSelector(state => state.flood)
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
                    <BaseSelectOption ref={selectRef} provider={namesRef.current} changeItem={(item)=>{dispatch({type: FLOOD_SET_TEXT, text: item})}}/>
                </div>
            </div>
            
            <div className="content-row">
                <div className="content-row-header">
                    <h2 className="content-row-title">기간 설정</h2>
                </div>
                <div className="form-control group">
                    <BaseDatePicker date={dayjs('20100101')} maxDate={endDate} onchangeFromat={(date)=>{dispatch({type: FLOOD_START_DATE, date})}}/>
                    <span>~</span>
                    <BaseDatePicker minDate={startDate} onchangeFromat={(date)=>{dispatch({type: FLOOD_END_DATE, date})}}/>
                </div>
            </div>
            
        </div>
            
        </>
    )
}

export default React.memo(FloodOptions);
