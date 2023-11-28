import { FLOOD_RESULT_TAB } from "@redux/actions";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

/**
 * 가뭄 활용주제도 TAB
 */
const FloodResultTab = () => {

    const dispatch = useDispatch()
    const {floodResultTab} = useSelector(state => state.flood);

    return (
        <>
          <div className="content-row">
            <div className="form-control">
            <Tabs className="toggle-btn-wrap" fullWidth={true} exclusive value={floodResultTab} onChange={(e, v)=>{dispatch({type: FLOOD_RESULT_TAB, floodResultTab: v})}}>
                <Tab className="tab-item" value={"WaterBody"} label={"수체"}></Tab>
                <Tab className="tab-item" value={"WaterLevel"} label={"수위"}></Tab>
            </Tabs>
            </div>
          </div>
        </>
    )
}

export default React.memo(FloodResultTab);
