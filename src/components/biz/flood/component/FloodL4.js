import { Switch } from "@mui/material";
import { ENV_LANDCOVER_DETECTION } from "@redux/actions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FloodL4WaterBody from "./FloodL4WaterBody";
import FloodL4WaterLevel from "./FloodL4WaterLevel";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import SvgIcon from "@mui/material/SvgIcon";

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

            <Accordion className={"control-block accordion"}>
                <AccordionSummary className="accordion-header" expandIcon={<SvgIcon>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 1V6M6 11V6M6 6H11M6 6H1" stroke="#454545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </SvgIcon>}>
                    <h3 className="accordion-title">데이터 원천</h3>
                </AccordionSummary>
                <AccordionDetails className={"accordion-content"}>
                    <dl>
                    <dt>C-Band SAR</dt>
                    <dd>Lorem ipsum dolor sit amet consectetur.</dd>
                    </dl>
                    <dl>
                    <dt>다중 분광 위성영상</dt>
                    <dd>Lorem ipsum dolor sit amet consectetur.</dd>
                    </dl>
                    <dl>
                    <dt>지형정보 (DEM, Slope)</dt>
                    <dd>Lorem ipsum dolor sit amet consectetur.</dd>
                    </dl>
                    <dl>
                    <dt>Basemap</dt>
                    <dd>Lorem ipsum dolor sit amet consectetur.</dd>
                    </dl>
                    <dl>
                    <dt>현장관측 영상</dt>
                    <dd>Lorem ipsum dolor sit amet consectetur.</dd>
                    </dl>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default React.memo(FloodL4);
