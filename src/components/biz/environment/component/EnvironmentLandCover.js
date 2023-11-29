import BaseChart from "@common/chart/BaseChart";
import { Accordion, AccordionDetails, AccordionSummary, SvgIcon, Switch } from "@mui/material";
import { ENV_LANDCOVER_DETECTION } from "@redux/actions";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseChart from "@common/chart/BaseChart";

import img from "@images/image 51.png"

/**
 * 환경 수변피복 레이어 변화탐지
 */
const EnvironmentLandCover = () => {

    const dispatch = useDispatch()
    /**
     * selectEnvironmentLayer: 수변피복 레이어 선택
     */
    const { selectEnvironmentLayer } = useSelector(state => state.environment)
    
    //변화탐지
    const [detailLandCover, setDetailLandCover] = useState(false)

    //차트 정보
    const chartRef = useRef()
    const chartInfoRef = useRef({
        labels: ['목지','수체','건물','초지','나지'],
        datasets: [50,150,100,130,60],
    })

    useEffect(()=>{
        dispatch({type:ENV_LANDCOVER_DETECTION, landCoverDetection: detailLandCover})
    },[detailLandCover])

    //레이어 변경시 reset
    useEffect(()=>{
        setDetailLandCover(false)

        if(selectEnvironmentLayer){

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

    },[selectEnvironmentLayer])


    return (
        <>
            
            <div className={"panel-header"}>
                <h1 className={"panel-title"}>
                    {"활용주제도"}
                </h1>
            </div>

            <div className={"content-body"}>
                <div className="control-block">
                        <h2 className="switch-label">변화탐지</h2>
                        <Switch className="float-box-switch" checked={detailLandCover} onClick={()=>{setDetailLandCover(!detailLandCover)}}></Switch>
                </div>

                <div className="content-row">
                    <div className="content-row-header">
                        <h2 className="content-row-title">지역 구성</h2>
                    </div>
                    <div className="panel-box">
                        <BaseChart width={260} height={220} ref={chartRef} chartType={'Bar'} title={''}/>
                    </div>
                </div>


                <div className="content-row" style={{display: detailLandCover? '' : 'none'}}>
                    <div className="content-row-header">
                        <h2 className="content-row-title">변화 수치</h2>
                    </div>
                    <div className="panel-box">
                        <img src={img} />
                    </div>
                </div>
            </div>

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

export default React.memo(EnvironmentLandCover);
