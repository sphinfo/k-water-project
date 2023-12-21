import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DROUGHT_END_DATE, DROUGHT_START_DATE, DROUGHT_SET_TEXT } from "@redux/actions";
import BaseSelectOption from "@common/util/BaseSelectOption";
import BaseDatePicker from "@common/datepicker/BaseDatePicker";
import dayjs from "dayjs";

const DroughtOptions = () => {

    const namesRef = useRef([
        {
            name:'댐', 
            code:'DAM',
            items: [
                {name:'용담댐', code:'YONGDAM', x:35.9449283, y:127.5246387, z: 35000},
                {name:'황강댐', code:'HWANGGANG', x:38.3954103,  y:127.1831424, z: 35000},
                {name:'임남댐', code:'IMNAM', x:38.4222100, y:127.7908617, z: 35000},
                {name:'대청댐', code:'DAECHEONG', x:36.4775000, y:127.4808330, z: 35000},
                {name:'안동댐', code:'ANDONG', x:36.5848765, y:128.7739109, z: 35000},
                {name:'운문댐', code:'UNMUN', x:35.7240461, y:128.9271935, z: 35000},
                {name:'영천댐', code:'YEONGCHEON', x:36.0637638, y:129.0142288, z: 35000},
                {name:'주암댐', code:'JUAM'},
                {name:'소양강댐', code:'SOYANG'}
            ]
        // },{
        //     name: '지역',
        //     code: 'AREA',
        //     items: [
        //       {name:'수도권', code:'ar1'},
        //       {name:'강원', code:'ar2'},
        //       {name:'충청', code:'ar3'},
        //       {name:'전라', code:'ar4'},
        //       {name:'경상', code:'ar5'},
        //     ]
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
            name:'하천', 
            code: 'RIVER',
            items: [
                {name:'내성천(낙동강)', code:'NAESEONGCHEON'},
                {name:'미호강', code:'MIHOCHEON'},
                {name:'남천(위천)', code:'NAMCHEON'},
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
    const { startDate, endDate, selectBox } = useSelector(state => state.drought)
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
                    <BaseSelectOption ref={selectRef} provider={namesRef.current} changeItem={(item)=>{dispatch({type: DROUGHT_SET_TEXT, text: item})}}/>
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
