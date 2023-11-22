import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { DROUGHT_OBSRV_TAB } from "@redux/actions";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

/**
 * 가뭄 활용주제도 TAB
 */
const DroughtObsrvTab = () => {

    const dispatch = useDispatch()
    const {obsrvTab} = useSelector(state => state.drought);

    return (
        <>
            <Tabs className="panel-tabs-wrap" fullWidth={true} exclusive value={obsrvTab} onChange={(e, v)=>{dispatch({type: DROUGHT_OBSRV_TAB, obsrvTab: v})}}>
                <Tab className="tab-item" value={"soilMoisture"} label={"토양수분"}></Tab>
                <Tab className="tab-item" value={"index"} label={"가뭄지수"}></Tab>
            </Tabs>
        </>
    )
}

export default React.memo(DroughtObsrvTab);
