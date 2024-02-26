import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_START_DATE, SET_END_DATE, SEARCH_START, GEO_SEARCH, HOLD_MAP } from "@redux/actions";
import BaseSelectOption from "@common/util/BaseSelectOption";
import BaseDatePicker from "@common/datepicker/BaseDatePicker";
import dayjs from "dayjs";
import BaseDateRangePicker from "@common/datepicker/BaseDateRangePicker";
import { G$flyToPoint } from "@gis/util";

const BaseSearchOption = () => {

    const namesRef = useRef(['YONGDAM','HWANGGANG','IMNAM','DAECHEONG','ANDONG','UNMUN','YEONGCHEON','SAYEON','SEOUL','DAEJEON','NAESEONGCHEON','MIHOCHEON','WYECHEON'])

    const dispatch = useDispatch()
    const { selectBox, mainOptions } = useSelector(state => state.main)
    const selectRef = useRef()

    useEffect(()=>{
        //selectRef.current.visibleTree = selectBox
    },[selectBox])

    const searchClick = () =>{
        dispatch({type: SEARCH_START})
        if(mainOptions.length === 1){
            dispatch({type:HOLD_MAP, holdMap: true})
            G$flyToPoint([mainOptions[0].y, mainOptions[0].x], mainOptions[0].z, undefined, true)
          }else{
            dispatch({type:HOLD_MAP, holdMap: false})
          }
    }

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
                </div>
            </div>
            <div className="content-row">
                <div className="base-btn-wrap">
                    <div className="form-control">
                        <input type="checkbox" id="checkbox" onChange={(e)=>{dispatch({type: GEO_SEARCH, geoSearch:e.target.checked})}}/>
                        <label htmlFor="checkbox" >
                            현 지도 내 검색
                        </label>
                    </div>
                    <button className="btn" onClick={()=>{searchClick()}}>적용</button>
                </div>
            </div>

        </div>
    )
}

export default React.memo(BaseSearchOption)
