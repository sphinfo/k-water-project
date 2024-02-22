import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ENV_SET_TEXT, ENV_START_DATE, ENV_END_DATE, FLOOD_SET_TEXT, FLOOD_START_DATE, FLOOD_END_DATE, FLOOD_SEARCH_ON, FLOOD_SELECT_BOX } from "@redux/actions";
import BaseSelectOption from "@common/util/BaseSelectOption";
import BaseDatePicker from "@common/datepicker/BaseDatePicker";
import dayjs from "dayjs";

const BaseSearchOption = () => {

    const namesRef = useRef(['YONGDAM','HWANGGANG','IMNAM','DAECHEONG','ANDONG','UNMUN','YEONGCHEON','SAYEON','SEOUL','DAEJEON','NAESEONGCHEON','MIHOCHEON','WYECHEON'])

    const dispatch = useDispatch()
    const { startDate, endDate, selectBox } = useSelector(state => state.flood)
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
                    <BaseSelectOption ref={selectRef} provider={namesRef.current} searchOn={(type)=>{dispatch({type: FLOOD_SEARCH_ON, searchOn: type}); dispatch({type:FLOOD_SELECT_BOX, selectBox: !type}) }} changeItem={(item)=>{dispatch({type: FLOOD_SET_TEXT, text: item})}}/>
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

export default React.memo(BaseSearchOption)