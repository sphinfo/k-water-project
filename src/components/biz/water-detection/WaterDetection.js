import React, { useEffect, useRef, useState , useMemo} from "react";
import WidgetManager from "@com/manager/widget/WidgetManager";
import BaseCombo from "@com/manager/combo/BaseCombo";
import BaseDatePicker from "@com/manager/datepicker/BaseDatePicker";
import { ToggleButton, ToggleButtonGroup, Button } from "@mui/material";
import BaseGrid from "@com/grid/BaseGrid";
import TestTileLayer from "@gis/layers/tileLayer/TestTileLayer";
import { G$addLayer, G$removeLayer } from "@gis/util";
import dayjs from 'dayjs';


const WaterDetection = () => {

    /* sample */
    const columns = [
        {accessor: 'mday', Header: '기준일자', width: 120, align: 'center', visible: false},
        {accessor: 'lv2_svc_nm', Header: '서비스', width: 200, align: 'center'},
        {accessor: 'avg', Header: '비율(%)', width: 200, align: 'center'},
        {accessor: 'traffic_gb', Header: '시용량(GB)', width: 200, align: 'center'},
        {accessor: 'user_cnt', Header: '사용자수', width: 120, align: 'center'},
    ]
    /*const columns = useMemo(()=>{ return [ { key: 'id', name: '일시' }, { key: 'name', name: '수위' },  { key: 'custom', name: '저수량' } ] },[]);*/
    const rows = useMemo(()=>{ return [  ] },[])
    const provider = useMemo(()=>{  return [{name:"연구대상지역", code:"a"},{name:"연구대상지역2", code:"b"}] },[])

    const dateStartPickerRef = useRef({})
    const dateEndPickerRef = useRef({})
    const [startDate, setStartDate] = useState(dayjs().format('YYYY-MM-DD'))
    const [endDate, setEndDate] = useState(dayjs().format('YYYY-MM-DD'))
    const gridRef = useRef({})
    const comboRef = useRef({})

    const testLayerRef = useRef()

    const [formats, setFormats] = useState('b');
    const handleFormat = (event, newFormats) => {
        setFormats([event.target.value]);
    };
    useEffect(()=>{

        // WidgetManager.add('TestWidget2', {
        //     params: 'testParam'
        // });

        return()=>{
            WidgetManager.remove('TestWidget2', {
                params: 'testParam'
            });

            G$removeLayer(testLayerRef.current)
        }        
    },[])

    const handleButtonClick = () =>{
        comboRef.current.provider = [{name:"123a", code:"123"},{name:"321b", code:"321"}]
        gridRef.current.provider = [{ mday: '123', lv2_svc_nm: '4421', avg: '24323 Value 1' }, { mday: '1234.01.02', lv2_svc_nm: '232', avg: '4545 Value 2' } ]
    }

    const onCellClick = (value, origin, ref) =>{
        console.info(value)
        console.info(origin)
        console.info(ref)

    }

    const addLayer = () =>{
        testLayerRef.current = new TestTileLayer()
        G$addLayer(testLayerRef.current)
    }

    const removeLayer = () =>{
        if(testLayerRef.current){
            G$removeLayer(testLayerRef.current)
        }
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
                    <h1>수체 탐지</h1>
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
                        <ToggleButton value="a">
                            {'수치'}
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <ToggleButtonGroup value={formats} onChange={handleFormat}>
                        <ToggleButton value="b">
                            {'침수'}
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <button onClick={handleButtonClick}>{'검색'}</button>
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

export default React.memo(WaterDetection);
