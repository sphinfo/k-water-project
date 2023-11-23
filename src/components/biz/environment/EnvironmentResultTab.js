import {  ENV_RESULT_TAB } from "@redux/actions";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

/**
 * 가뭄 활용주제도 TAB
 */
const EnvironmentResultTab = () => {

    const dispatch = useDispatch()
    const {environmentResultTab} = useSelector(state => state.environment);

    return (
        <>
            <Tabs className="panel-tabs-wrap" style={{width: 200}} fullWidth={true} exclusive value={environmentResultTab} onChange={(e, v)=>{dispatch({type: ENV_RESULT_TAB, environmentResultTab: v})}}>
                <Tab className="tab-item" value={"LandCover"} label={"수변피복"}></Tab>
                <Tab className="tab-item" value={"Garbage"} label={"부유물"}></Tab>
                <Tab className="tab-item" value={""} label={"녹조"}></Tab>
            </Tabs>
        </>
    )
}

export default React.memo(EnvironmentResultTab);
