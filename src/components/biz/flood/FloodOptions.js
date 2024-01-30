import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ENV_SET_TEXT, ENV_START_DATE, ENV_END_DATE, FLOOD_SET_TEXT, FLOOD_START_DATE, FLOOD_END_DATE, FLOOD_SEARCH_ON } from "@redux/actions";
import BaseSelectOption from "@common/util/BaseSelectOption";
import BaseDatePicker from "@common/datepicker/BaseDatePicker";
import dayjs from "dayjs";

const FloodOptions = () => {

    const namesRef = useRef(['YONGDAM','HWANGGANG','IMNAM','DAECHEONG','ANDONG','UNMUN','YEONGCHEON','SAYEON','SEOUL','DAEJEON','NAESEONGCHEON','MIHOCHEON','WYECHEON'])


    const dispatch = useDispatch()
    const { startDate, endDate, selectBox } = useSelector(state => state.flood)
    const selectRef = useRef()

    useEffect(()=>{
        if(selectBox !== 'off'){
            selectRef.current.visibleTree = selectBox
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
                    <BaseSelectOption ref={selectRef} provider={namesRef.current} searchOn={(type)=>{dispatch({type: FLOOD_SEARCH_ON, searchOn: type})}} changeItem={(item)=>{dispatch({type: FLOOD_SET_TEXT, text: item})}}/>
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



    /*const namesRef = useRef([
        {
            name:'댐', 
            code:'DAM',
            items: [ 
                {name:'용담댐', code:'YONGDAM',obscd:"3001690", x:35.9449283, y:127.5246387, z: 35000},
                {name:'황강댐', code:'HWANGGANG', x:38.3954103,  y:127.1831424, z: 35000},
                {name:'임남댐', code:'IMNAM', x:38.4222100, y:127.7908617, z: 35000},
                {name:'대청댐', code:'DAECHEONG',obscd:"3008690", x:36.4775000, y:127.4808330, z: 35000},
                {name:'안동댐', code:'ANDONG',obscd:"2001685", x:36.5848765, y:128.7739109, z: 35000},
                {name:'운문댐', code:'UNMUN',obscd:"2021620", x:35.7240461, y:128.9271935, z: 35000},
                {name:'영천댐', code:'YEONGCHEON',obscd:"2012615", x:36.0637638, y:129.0142288, z: 35000},
                {name:'사연댐', code:'SAYEON',obscd:"2201625", x:35.5800118, y:129.1957466, z: 35000},
            ]
        },{
            name:'도시', 
            code: 'CITY',
            items: [
                {name:'서울', code:'SEOUL'},
                {name:'대전', code:'DAEJEON'},
            ]
        },{
            name:'하천', 
            code: 'RIVER',
            items: [
                {name:'내성천(낙동강)', code:'NAESEONGCHEON'},
                {name:'미호강', code:'MIHOCHEON'},
                {name:'남천(위천)', code:'WYECHEON'},
            ]
        }
    ])*/