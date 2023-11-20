import React, { useEffect } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useDispatch, useSelector } from "react-redux";
import { SET_DETAIL_SEARCH_TAB_TYPE } from "@redux/actions";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const SafetyL4Tab = () => {

    const dispatch = useDispatch()
    const {detailSearchTabType} = useSelector(state => state.safety);

    return (
        <>
            <Tabs className="panel-tabs-wrap" exclusive value={detailSearchTabType} onChange={(e, v)=>{dispatch({type: SET_DETAIL_SEARCH_TAB_TYPE, detailSearchTabType: v})}}>
                <Tab className="tab-item" value={"datas"} label={"표출 데이터"}></Tab>
                <Tab className="tab-item" value={"comp"} label={"비교"}></Tab>
            </Tabs>
        </>
    )
}

export default React.memo(SafetyL4Tab);
