import BaseGrid from "@com/grid/BaseGrid";
import BaseCombo from "@com/manager/combo/BaseCombo";
import BaseDatePicker from "@com/manager/datepicker/BaseDatePicker";
import MainWidgetManager from "@com/manager/widget/WidgetManager";
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useReducer } from "react";

const actions = {
    INIT_DATA: 'INIT_DATA',
    SET_START_DATE: 'SET_START_DATE',
    SET_END_DATE: 'SET_END_DATE',
    SET_COMBO: 'SET_COMBO',
    SET_CATEGORY: 'SET_CATEGORY'
}

const INIT_DATA = {
    combo: null,
    startDate: dayjs().format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
    category: 'a',
};

const reducer = (state, {type, ...data}) => {
	if (type === actions.INIT_DATA) {
        return {...state, ...data};
    } else if(type === actions.SET_COMBO){
            state.combo = data.e
        return {...state}
    } else if(type === actions.SET_START_DATE) {
            state.startDate = data.date
        return {...state}
    } else if(type === actions.SET_END_DATE) {
            state.endDate = data.date
        return {...state}
    } else if(type === actions.SET_CATEGORY) {
            state.category = data.category
        return {...state}
    }
};
const GArbage = () => {

    const [state, dispatch] = useReducer(reducer, INIT_DATA);
    const provider = useMemo(()=>{  return [{name:"연구대상지역 1", code:"a"},{name:"연구대상지역 2", code:"b"}] },[])
    const [formats, setFormats] = useState('a');

    const memoizedState = useMemo(() => state, [state]);

    const handleFormat = (event, newFormats) => {
        setFormats([event.target.value]);
        let category = event.target.value
        dispatch({type: actions.SET_CATEGORY, category})
    };

    const changeStartDate = (date) =>{
        dispatch({type: actions.SET_START_DATE, date})
    }

    const changeEndDate = (date) =>{
        dispatch({type: actions.SET_END_DATE, date})
    }

    const handleButtonClick = () =>{
       
    }

    const chartWidgetOpn = () =>{
        MainWidgetManager.add('TestWidget2', {
            params: 'testParam'
        });
    }

    return (
        <div style={{width: 400}}>
            <div>
                <div>
                    <h1>부유물 탐지</h1>
                </div>
                <div>
                    <BaseCombo label={'연구지역을 선택하세요'} provider={provider} onChange={(e)=>{dispatch({type: actions.SET_COMBO, e})}}/>
                </div>
                <div>
                    <ToggleButtonGroup value={formats} onChange={handleFormat}>
                        <ToggleButton value="a">
                            {'SS'}
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <ToggleButtonGroup value={formats} onChange={handleFormat}>
                        <ToggleButton value="b">
                            {'Chl-a'}
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <div>
                    <BaseDatePicker maxDate={state.endDate} onchangeFromat={changeStartDate}/>
                    <BaseDatePicker minDate={state.startDate} onchangeFromat={changeEndDate}/>
                </div>
                <div>
                    {memoizedState.category}로 {memoizedState.startDate}와 {memoizedState.endDate} 사이의 결과 검색
                </div>
                <div>
                    <button onClick={handleButtonClick}>{'검색'}</button>
                    <button onClick={chartWidgetOpn}>{'chart'}</button>
                </div>
            </div>
        </div>
    )
}

export default React.memo(GArbage);
