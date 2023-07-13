import BaseGrid from "@com/grid/BaseGrid";
import BaseCombo from "@com/manager/combo/BaseCombo";
import BaseDatePicker from "@com/manager/datepicker/BaseDatePicker";
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useMemo } from "react";

const WaterLevel = () => {

    const columns = [
        {accessor: 'mday', Header: '기준일자', width: 120, align: 'center', visible: false},
        {accessor: 'lv2_svc_nm', Header: '서비스', width: 200, align: 'center'},
        {accessor: 'avg', Header: '비율(%)', width: 200, align: 'center'},
        {accessor: 'traffic_gb', Header: '시용량(GB)', width: 200, align: 'center'},
        {accessor: 'user_cnt', Header: '사용자수', width: 120, align: 'center'},
    ]
    /*const columns = useMemo(()=>{ return [ { key: 'id', name: '일시' }, { key: 'name', name: '수위' },  { key: 'custom', name: '저수량' } ] },[]);*/
    const rows = useMemo(()=>{ return [  ] },[])
    

    const provider = useMemo(()=>{  return [{name:"연구대상지역 1", code:"a"},{name:"연구대상지역 2", code:"b"}] },[])
    const comboRef = useRef({})
    const selectRef = useRef({})
    const gridRef = useRef({})

    const dateStartPickerRef = useRef({})
    const dateEndPickerRef = useRef({})

    const [startDate, setStartDate] = useState(dayjs().format('YYYY-MM-DD'))
    const [endDate, setEndDate] = useState(dayjs().format('YYYY-MM-DD'))

    const [formats, setFormats] = useState('a');
    const handleFormat = (event, newFormats) => {
        setFormats([event.target.value]);
    };


    useEffect(()=>{
        console.info('WaterLevel')
        return()=>{
            console.info('bye')
        }
    },[])

    const handleButtonClick = () =>{
        alert(selectRef.current.textContent + "로 검색")
    }

    const onCellClick = (value, origin, ref) =>{
        console.info(value)
        console.info(origin)
        console.info(ref)

    }

    const changeStartDate = (date) =>{
        setStartDate(date)
    }

    const changeEndDate = (date) =>{
        setEndDate(date)
    }

    return (
        <div style={{width: 400}}>
            <div>
                <div>
                    <h1>수위 탐지</h1>
                </div>
                <div>
                    <BaseCombo ref={comboRef} label={'연구지역을 선택하세요'} provider={provider} />
                </div>
                <div>
                    <BaseDatePicker ref={dateStartPickerRef} maxDate={endDate} onchangeFromat={changeStartDate}/>
                    <BaseDatePicker ref={dateEndPickerRef} minDate={'2010-01-01'} onchangeFromat={changeEndDate}/>
                </div>
                <div>
                    <ToggleButtonGroup value={formats} onChange={handleFormat}>
                        <ToggleButton value="a" ref={selectRef}>
                            {'수치'}
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <ToggleButtonGroup value={formats} onChange={handleFormat}>
                        <ToggleButton value="b" ref={selectRef}>
                            {'침수'}
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <Button onClick={handleButtonClick}>{'검색'}</Button>
                </div>
            </div>
            <div>
                <div>
                    <h2>수체지도 목록</h2>
                    {/**<BaseGrid ref={gridRef} columns={columns} rows={rows} className={'testGrid'}/> */}
                    <BaseGrid ref={gridRef} columns={columns} provider={rows} onCellClick={onCellClick}/>
                </div>
            </div>
        </div>
    )
}

export default React.memo(WaterLevel);
