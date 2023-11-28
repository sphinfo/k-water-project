import React, { useEffect, useState } from "react";
import { Switch, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { SAFETY_SELECT_4_LEVEL, SAFETY_SELECT_4_LEVEL_RESET, SAFETY_SELECT_DISPLACE_LEVEL } from "@redux/actions";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import img from "@images/Safety-20231114_L4TD_YONGDAM_UD.jpg"


const FloodL4WaterLevel = () => {

    const { selectWaterLevel } = useSelector(state => state.flood)

    return (
        <>
            <div className={"content-body"}>
                <div className="content-row">
                    <div className="content-row-header">
                        <h2 className="content-row-title">수위변화</h2>
                        {/* <Switch className="float-box-switch" checked={detailLandCover} onClick={()=>{setDetailLandCover(!detailLandCover)}}></Switch> */}
                        <Switch className="float-box-switch" ></Switch>
                    </div>
                </div>
            </div>
        </>
    )
}

export default React.memo(FloodL4WaterLevel);
