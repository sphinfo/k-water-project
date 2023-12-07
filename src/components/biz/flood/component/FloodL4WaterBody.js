import React, { useEffect, useRef, useState } from "react";
import { Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FLOOD_DAMAGE_LAYER } from "@redux/actions";
import BaseChart from "@common/chart/BaseChart";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import SvgIcon from "@mui/material/SvgIcon";

/**
 * 홍수 - 수체 ( 활용주제도 )
 */

const sample = {store:'WaterBody', layer: '20230718T21water_GS_RGB000102'}

const FloodL4WaterBody = () => {

    const dispatch = useDispatch()
    /**
     * selectFloodDamageLayer : 침수피해지도 
     */
    const { selectFloodDamageLayer, selectFloodLayer, selectWaterLevel } = useSelector(state => state.flood)

    const chartRef = useRef()
    const chartInfoRef = useRef({
        labels: ['목지','수체','건물','초지','나지'],
        datasets: [50,150,100,130,60],
    })

    useEffect(()=>{

        if(selectFloodDamageLayer){

            chartRef.current.updateOptions = {
                plugins: {
                    legend: {
                        display: false
                    },
                },
                scales: {
                    'y': {
                        title: {
                            display: true,
                            text: "Area(m2)",
                            font: {
                              size: 10,
                            },
                        },
                    }
                },
            }

            chartInfoRef.current.datasets = []

            //let label = []  //날짜 x 축
            let datas = [50,150,100,130,60]
            
            //chartInfoRef.current.labels = label

            chartInfoRef.current.datasets.push({
                type: 'bar',
                borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                data: datas,
            })

            chartRef.current.provider = chartInfoRef.current
        }

    }, [selectFloodDamageLayer])

    const {  } = useSelector(state => state.flood)

    //아코디언 change 
    const accordionChange = (e, v) =>{
        setExpanded(v)
    }
    
    //아코디언 on off
    const [expanded, setExpanded] = useState(true)
    useEffect(()=>{
        if(selectWaterLevel){
            setExpanded(false)
        }
    },[selectWaterLevel])

    //닫힐때 침수피해 레이어 초기화
    useEffect(()=>{
        return()=>{
            dispatch({type:FLOOD_DAMAGE_LAYER, selectFloodDamageLayer: false})
        }
    },[])


    return (
        <>
        <div className="panel side-panel">
            <div className={"panel-header"}>
                <h1 className={"panel-title"}>
                    {"활용주제도"}
                </h1>
            </div>

            <div className="control-block">
                        <h2 className="switch-label">침수피해</h2>
                        <Switch className="float-box-switch" checked={selectFloodDamageLayer ? true : false} onClick={()=>{
                            dispatch({type:FLOOD_DAMAGE_LAYER, selectFloodDamageLayer: !selectFloodDamageLayer ? sample : false})
                        }}></Switch>
            </div>

            <div className={"content-body"}>


                {
                    selectFloodDamageLayer && 

                    <div className="content-row">
                        <div className="panel-box">
                        <BaseChart width={260} height={220} ref={chartRef} chartType={'Bar'} title={''}/>
                        </div>
                    </div>

                }
                

            </div>
            <Accordion className={"control-block accordion"} defaultExpanded={true} expanded={expanded} onChange={accordionChange}>
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
              </Accordion>
        </div>
        </>
    )
}

export default React.memo(FloodL4WaterBody);
