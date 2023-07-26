import BaseCombo from "@com/manager/combo/BaseCombo";
import WidgetManager from "@com/manager/widget/WidgetManager";
import BaseDatePicker from "@com/manager/datepicker/BaseDatePicker";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import dayjs from "dayjs";
import React, { useMemo, useState, useReducer } from "react";

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
    category: 'b',
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


const WaterLevel = () => {

    const [state, dispatch] = useReducer(reducer, INIT_DATA);
    const provider = useMemo(()=>{  return [{name:"연구대상지역", code:"a"},{name:"연구대상지역2", code:"b"}] },[])
    const [formats, setFormats] = useState('b');

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
        WidgetManager.add('TestWidget2', {
            params: 'testParam'
        });
    }

    return (
        <div style={{width: 400}}>
            <div>
                <div>
                    <h1>수위 탐지</h1>
                </div>
                <div>
                    <BaseCombo label={'연구지역을 선택하세요'} provider={provider} onChange={(e)=>{dispatch({type: actions.SET_COMBO, e})}}/>
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

export default React.memo(WaterLevel);