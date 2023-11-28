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
            <div className="control-block" >
                    <h2 className="switch-label">수위변화</h2>
                    {/* <Switch className="float-box-switch" checked={detailLandCover} onClick={()=>{setDetailLandCover(!detailLandCover)}}></Switch> */}
                    <Switch disabled={true} className="float-box-switch" ></Switch>
            </div>
            <div className="content-body">

            {/*    content    */}

            </div>
        </>
    )
}

export default React.memo(FloodL4WaterLevel);
