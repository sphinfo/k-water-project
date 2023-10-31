import React from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseDatePicker from "@common/datepicker/BaseDatePicker";
import { SET_END_DATE_SAFETY, SET_START_DATE_SAFETY, SET_TEXT_SAFETY } from "@redux/actions";
import TextInput from "@common/util/TextInput";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const SafetyResult = ({changeParam, ingre}) => {

    const dispatch = useDispatch()
    const state = useSelector(state => state.safety);

    return (
        <>
            <div className="tab-float-box-list-wrap">
                <h2 className="tab-float-box-list-head">검색결과</h2>
            </div>
        </>
    )
}

export default React.memo(SafetyResult);
