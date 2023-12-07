import { Switch } from "@mui/material";
import { ENV_LANDCOVER_DETECTION, FLOOD_SELECT_WATER_LEVEL } from "@redux/actions";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FloodL4WaterLevel from "./FloodL4WaterLevel";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import SvgIcon from "@mui/material/SvgIcon";
import { G$addWidget, G$removeWidget } from "@gis/util";
import FloodL4WaterBody from "./waterBody/FloodL4WaterBodyThematic";
import FloodL4WaterBodyThematic from "./waterBody/FloodL4WaterBodyThematic";
import FloodL4WaterBodyDataInfo from "./waterBody/FloodL4WaterBodyDataInfo";
import FloodL4WaterLevelDataInfo from "./waterLevel/FloodL4WaterLevelDataInfo";

/**
 * 홍수 4레벨
 */
const FloodL4 = () => {

    const dispatch = useDispatch()
    /**
     * floodResultTab : (수체 /  수위) 탭확인값
     * selectFloodLayer : 홍수 4LEVEL 선택 레이어 
     * selectWaterLevel: 홍수 수위 지점 선택
     */
    const { selectFloodLayer, selectWaterLevel } = useSelector(state => state.flood)

    //수위 지점 선택 초기화
    useEffect(()=>{
        return()=>{
            //초기화
            dispatch({type: FLOOD_SELECT_WATER_LEVEL, selectWaterLevel: false})
            G$removeWidget('FloodL4WaterLevelWidget')
        }
    },[])


    {/* 수위 선택시 pooup widget 생성 */}
    useEffect(()=>{

        if(selectWaterLevel){
            console.info(selectFloodLayer)
            G$addWidget('FloodL4WaterLevelWidget')
        }else{
            G$removeWidget('FloodL4WaterLevelWidget')
        }

    },[selectWaterLevel])


    return (
        <>
            {/* 수체 선택시 */}
            {
                selectFloodLayer && selectFloodLayer.store === 'WaterBody' && 
                <>
                    <FloodL4WaterBodyDataInfo />
                    <FloodL4WaterBodyThematic />
                </>
            }

            {/* 수위 선택시 */}
            {
                selectFloodLayer && selectFloodLayer.store === 'WaterLevel' && 
                <>
                    <FloodL4WaterLevelDataInfo />
                </>
            }


            

            {/* <Accordion className={"control-block accordion"} defaultExpanded={true} expanded={expanded} onChange={accordionChange}>
                <AccordionSummary className="accordion-header" 
                    expandIcon={
                        <SvgIcon fontSize={'small'}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 1V6M6 11V6M6 6H11M6 6H1" stroke="#454545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </SvgIcon>
                    }
                >
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
              </Accordion> */}
        </>
    )
}

export default React.memo(FloodL4);
