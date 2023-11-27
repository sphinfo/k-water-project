import { Switch } from "@mui/material";
import { ENV_LANDCOVER_DETECTION } from "@redux/actions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FloodL4WaterBody from "./FloodL4WaterBody";
import FloodL4WaterLevel from "./FloodL4WaterLevel";


/**
 * 홍수 4레벨
 */
const FloodL4 = () => {

    const dispatch = useDispatch()
    /**
     * floodResultTab : (수체 /  수위) 탭확인값
     * selectFloodLayer : 홍수 4LEVEL 선택 레이어 
     */
    const { floodResultTab, selectFloodLayer } = useSelector(state => state.flood)

    

    return (
        <>
            
            <div className={"panel-header"}>
                <h1 className={"panel-title"}>
                    {"활용주제도"}
                </h1>
            </div>

            {
                selectFloodLayer && selectFloodLayer.store === 'WaterBody' && 
                <FloodL4WaterBody />
            }
            {
                selectFloodLayer && selectFloodLayer.store === 'WaterLevel' && 
                <FloodL4WaterLevel />
            }
        </>
    )
}

export default React.memo(FloodL4);
