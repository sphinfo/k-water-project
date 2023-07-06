import React, { useEffect, useRef, useState } from "react";
import WidgetManager from "@com/manager/widget/WidgetManager";
import BaseCombo from "@com/manager/combo/BaseCombo";
import BaseDatePicker from "@com/manager/datepicker/BaseDatePicker";
import moment from "moment";
import { ToggleButton, ToggleButtonGroup, Button } from "@mui/material";
import BaseGrid from "@com/grid/BaseGrid";
import { useMemo } from "react";



const WaterDetection = () => {

    /* sample */
    const columns = useMemo(()=>{ return [ { key: 'id', name: '일시' }, { key: 'name', name: '수위' },  { key: 'custom', name: '저수량' } ] },[]);
    const rows = useMemo(()=>{ return [ { id: '2013.01.01', name: '12', custom: 'Custom Value 1' }, { id: '2013.01.02', name: '15', custom: 'Custom Value 2' } ] },[])
    const provider = useMemo(()=>{  return [{name:"연구대상지역", code:"a"},{name:"연구대상지역2", code:"b"}] },[])

    const dateStartPickerRef = useRef({})
    const dateEndPickerRef = useRef({})
    const gridRef = useRef({})
    const comboRef = useRef({})

    const [formats, setFormats] = useState('b');
    const handleFormat = (event, newFormats) => {
        setFormats([event.target.value]);
    };
    useEffect(()=>{

        

        return()=>{
            WidgetManager.remove('TestWidget2', {
                params: 'testParam'
            });
        }        
    },[])

    const handleButtonClick = () =>{
        console.info(dateStartPickerRef.current.value)
        console.info(comboRef.current.value)
    }


    return (
        <div style={{width: 400}}>
            <div>
                <div>
                    <h1>수체 탐지</h1>
                </div>
                <div>
                    <BaseCombo ref={comboRef} label={'연구지역을 선택하세요'} provider={provider} />
                </div>
                <div>
                    <BaseDatePicker ref={dateStartPickerRef} pickerType={'inline'} maxDate={'2025-12-31'}/>
                    <BaseDatePicker ref={dateEndPickerRef} pickerType={'inline'} maxDate={'2030-12-31'} />
                </div>
                <div>
                    <ToggleButtonGroup value={formats} onChange={handleFormat}>
                        <ToggleButton value="a">
                            {'수치'}
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <ToggleButtonGroup value={formats} onChange={handleFormat}>
                        <ToggleButton value="b">
                            {'침수'}
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <Button onClick={handleButtonClick}>{'검색'}</Button>
                </div>
            </div>
            <div>
                <div>
                    <h2>수체지도 목록</h2>
                    <BaseGrid ref={gridRef} columns={columns} rows={rows} className={'testGrid'}/>
                </div>
                <div>
                    <button onClick={handleButtonClick}>Get Selected Rows</button>
                </div>
            </div>
            
        </div>
    )
}

export default React.memo(WaterDetection);
