import React, { useMemo } from "react";
import BaseCombo from "@com/manager/combo/BaseCombo";
import dayjs from "dayjs";
import { useReducer } from "react";
import { useCallback } from "react";
import WaterBodyTestComponent from "./WaterBodyTestComponent";
import { useState } from "react";
import BaseDatePicker from "@com/manager/datepicker/BaseDatePicker";

const actions = {
    INIT_DATA: 'INIT_DATA',
    SET_START_DATE: 'SET_START_DATE',
    SET_END_DATE: 'SET_END_DATE',
    SET_COMBO: 'SET_COMBO',
}

const INIT_DATA = {
    combo: null,
    startDate: dayjs().format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
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
    }
};

/* 수체 탐지 component */
const WaterBody = () => {

    const [state, dispatch] = useReducer(reducer, INIT_DATA);

    const provider = useMemo(()=>{  return [{name:"연구대상지역", code:"a"},{name:"연구대상지역2", code:"b"}] },[])

    return (
        <div style={{width: 400}}>
            <div>
                <div className="red">
                    <h1>수체 탐지</h1>
                </div>
                <div>
                    <BaseCombo label={'연구지역을 선택하세요'} provider={provider} onChange={(e)=>{dispatch({type: actions.SET_COMBO, e})}}/>
                </div>
                <WaterBodyTestComponent dispatch={dispatch} actions={actions} state={state}/>
            </div>
        </div>
    )
}

export default React.memo(WaterBody);
