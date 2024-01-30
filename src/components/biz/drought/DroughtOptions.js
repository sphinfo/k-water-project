import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DROUGHT_END_DATE, DROUGHT_START_DATE, DROUGHT_SET_TEXT, DROUGHT_SEARCH_ON, DROUGHT_SELECT_BOX } from "@redux/actions";
import BaseSelectOption from "@common/util/BaseSelectOption";
import BaseDatePicker from "@common/datepicker/BaseDatePicker";
import dayjs from "dayjs";

const DroughtOptions = () => {

    const namesRef = useRef(['YONGDAM','HWANGGANG','IMNAM','DAECHEONG','ANDONG','UNMUN','YEONGCHEON','JUAM','SOYANG','SEJONG','CHANGNYEONG','NAESEONGCHEON','MIHOCHEON','NAMCHEON'])
    
    const dispatch = useDispatch()
    const { startDate, endDate, selectBox } = useSelector(state => state.drought)
    const selectRef = useRef()

    useEffect(()=>{
        selectRef.current.visibleTree = selectBox
    },[selectBox])

    return (
        <>
        <div className={"content-block"}>
            <div className="content-row">
                <div className="content-row-header">
                    <h2 className="content-row-title">검색</h2>
                </div>
                <div className="form-control">
                    <BaseSelectOption ref={selectRef} provider={namesRef.current} searchOn={(type)=>{dispatch({type: DROUGHT_SEARCH_ON, searchOn: type}); dispatch({type:DROUGHT_SELECT_BOX, selectBox: !type})  }} changeItem={(item)=>{dispatch({type: DROUGHT_SET_TEXT, text: item})}}/>
                </div>
            </div>
            
            <div className="content-row">
                <div className="content-row-header">
                    <h2 className="content-row-title">기간 설정</h2>
                </div>
                <div className="form-control group">
                    <BaseDatePicker date={dayjs('20100101')} maxDate={endDate} onchangeFromat={(date)=>{dispatch({type: DROUGHT_START_DATE, date})}}/>
                    <span>~</span>
                    <BaseDatePicker minDate={startDate} onchangeFromat={(date)=>{dispatch({type: DROUGHT_END_DATE, date})}}/>
                </div>
            </div>
            
        </div>
            
        </>
    )
}

export default React.memo(DroughtOptions);
