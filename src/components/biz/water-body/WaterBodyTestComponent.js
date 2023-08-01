import BaseDatePicker from "@com/manager/datepicker/BaseDatePicker";
import React, { memo } from "react";
const WaterBodyTestComponent = ({dispatch, actions, state}) => {
    
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
        </>
    )
}

export default memo(WaterBodyTestComponent);
