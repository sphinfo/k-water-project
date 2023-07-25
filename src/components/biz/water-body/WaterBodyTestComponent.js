import BaseDatePicker from "@com/manager/datepicker/BaseDatePicker";
import React from "react";
import { useMemo } from "react";
import { memo } from "react";
const WaterBodyTestComponent = ({dispatch, actions, state}) => {

    const memoizedState = useMemo(() => state, [state]);
    
    const changeStartDate = (date) =>{
        dispatch({type: actions.SET_START_DATE, date})
    }

    const changeEndDate = (date) =>{
        dispatch({type: actions.SET_END_DATE, date})
    }

    return (
        <>
            <div>
                <BaseDatePicker maxDate={state.endDate} onchangeFromat={changeStartDate}/>
                <BaseDatePicker minDate={state.startDate} onchangeFromat={changeEndDate}/>
            </div>
           <div>
                {memoizedState.combo && memoizedState.combo.name}
            </div>
            <div>
                {memoizedState.startDate}
            </div>
            <div>
                {memoizedState.endDate}
            </div>
        </>
    )
}

export default memo(WaterBodyTestComponent);
