import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_START_DATE, SET_END_DATE } from "@redux/actions";
import BaseSelectOption from "@common/util/BaseSelectOption";
import BaseDatePicker from "@common/datepicker/BaseDatePicker";
import dayjs from "dayjs";
import BaseDateRangePicker from "@common/datepicker/BaseDateRangePicker";

const BaseSearchOption = () => {

    const namesRef = useRef(['YONGDAM','HWANGGANG','IMNAM','DAECHEONG','ANDONG','UNMUN','YEONGCHEON','SAYEON','SEOUL','DAEJEON','NAESEONGCHEON','MIHOCHEON','WYECHEON'])

    const dispatch = useDispatch()
    const { startDate, endDate, selectBox } = useSelector(state => state.main)
    const selectRef = useRef()

    useEffect(()=>{
        //selectRef.current.visibleTree = selectBox
    },[selectBox])

    return (
        <div className="base-search-wrap">
            <div className="content-row">
                <div className="form-control">
                    <BaseSelectOption ref={selectRef} provider={namesRef.current} />
                </div>
            </div>

            <div className="content-row">
                <div className="form-control group">
                    <BaseDateRangePicker onchangeFromat={(date)=>{dispatch({type: SET_START_DATE, date:date[0]}); dispatch({type: SET_END_DATE, date:date[1]})}}/>
                    {/**
                     * <BaseDatePicker date={dayjs('20100101')} maxDate={endDate} onchangeFromat={(date)=>{dispatch({type: SET_START_DATE, date})}}/>
                        <span>~</span>
                        <BaseDatePicker minDate={startDate} onchangeFromat={(date)=>{dispatch({type: SET_END_DATE, date})}}/>
                     */}

                </div>
            </div>
            <div className="content-row">
                <div className="base-btn-wrap">
                    <div className="form-control">
                        <input type="checkbox" id="checkbox"/>
                        <label htmlFor="checkbox">
                            현 지도 내 검색
                        </label>
                    </div>
                    <button className="btn">적용</button>
                </div>
            </div>

        </div>
    )
}

export default React.memo(BaseSearchOption)
