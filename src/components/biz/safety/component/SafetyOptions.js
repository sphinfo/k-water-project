import React from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseDatePicker from "@common/datepicker/BaseDatePicker";
import { SET_END_DATE_SAFETY, SET_START_DATE_SAFETY, SET_TEXT_SAFETY } from "@redux/actions";
import TextInput from "@common/util/TextInput";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const SafetyOptions = ({changeParam, ingre}) => {

    const dispatch = useDispatch()
    const state = useSelector(state => state.safety);

    return (
        <>
            <div className="tab-float-box-list-wrap">
                <h2 className="tab-float-box-list-head">검색</h2>
                <TextInput
                    value={state.text}
                    className={'samplesamplesample'}
                    onChange={(e)=>{dispatch({type: SET_TEXT_SAFETY, text: e.target.value})}}
                    placeholder={"변위 등급 검색"}
                    placeholderTextColor={"#ADADAD"}
                />
            </div>
            
            <div className="tab-float-box-list-wrap">
                <h2 className="tab-float-box-list-head">기간 설정</h2>
                <BaseDatePicker maxDate={state.endDate} onchangeFromat={(date)=>{dispatch({type: SET_START_DATE_SAFETY, date})}}/>
                <BaseDatePicker minDate={state.startDate} onchangeFromat={(date)=>{dispatch({type: SET_END_DATE_SAFETY, date})}}/>
            </div>

            <div className="tab-float-box-list-wrap" style={{display: state.safetyType === 'ingre' ? '' : 'none'}}>
                <ToggleButtonGroup className="tab-float-box-button-wrap list-main" value={ingre}>
                    <ToggleButton className="tab-float-box-btn list-item" value={'L3TD_A2_YONGDAM_ASC'} onClick={()=>{changeParam('L3TD_A2_YONGDAM_ASC')}}>Ascending</ToggleButton>
                    <ToggleButton className="tab-float-box-btn list-item" value={'L3TD_A2_YONGDAM_DSC'} onClick={()=>{changeParam('L3TD_A2_YONGDAM_DSC')}}>Descending</ToggleButton>
                    <ToggleButton className="tab-float-box-btn list-item" value={'L4TD_YONGDAM_EW'} onClick={()=>{changeParam('L4TD_YONGDAM_EW')}}>East-West</ToggleButton>
                    <ToggleButton className="tab-float-box-btn list-item" value={'L4TD_YONGDAM_UD'} onClick={()=>{changeParam('L4TD_YONGDAM_UD')}}>Up-Down</ToggleButton>
                </ToggleButtonGroup>
            </div>
        </>
    )
}

export default React.memo(SafetyOptions);
