import React, {useEffect, useRef, useState} from "react";
import { Switch, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { SAFETY_SELECT_4_LEVEL, SAFETY_SELECT_4_LEVEL_RESET, SAFETY_SELECT_DISPLACE_LEVEL } from "@redux/actions";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import img from "@images/Safety-20231114_L4TD_YONGDAM_UD.jpg"
import BaseChart from "@common/chart/BaseChart";
import "chartjs-plugin-annotation";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FloodL4WaterLevelArea from "./waterLevel/FloodL4WaterLevelArea";
import FloodL4WaterLevelChange from "./waterLevel/FloodL4WaterLevelChange";
import { G$getDateType, G$setNumberFixedKomma } from "@gis/util";
import FloodWaterLevelChartDatas from "@gis/config/flood/FloodWaterLevelChartDatas";


const FloodL4WaterLevel = () => {

    /**
     * selectWaterLevel: 수위 지점 정보
     */
    const { selectWaterLevel } = useSelector(state => state.flood)

    //차트 ref
    const chartRef = useRef({})

    //차트 dataRef
    const chartInfoRef = useRef({
        labels: [],
        datasets: [],
        backgroundColor: '#C5DCFF'
    })

    /** 초기설정 **/
    useEffect(()=>{

        setLeveltChange(false)

        chartRef.current.updateOptions = {
            layout: {
                padding: -8
            },
            plugins: {
                tooltip: {
                mode: 'index', // 인덱스별로 툴팁 보이기
                intersect: false, // 마우스 포인터와 각 선의 교차점에 툴팁 표시
                },
                annotation: {
                annotations: {
                    minLine: {
                    type: 'line',
                    borderColor: '#DD4747',
                    borderWidth: 2,
                    label: {
                        display: true,
                        backgroundColor: '#DD4747',
                        borderRadius: 5,
                        content: '저수위(' + ')',
                        rotation: 'auto',
                        position: 'start'
                    },
                    },
                    maxLine: {
                    type: 'line',
                    borderColor: '#47BFD9',
                    borderWidth: 2,
                    label: {
                        display: true,
                        backgroundColor: '#47BFD9',
                        borderRadius: 5,
                        content: '만수위(' + ')',
                        rotation: 'auto',
                        position: 'start'
                    },
                    },
                    nowLine: {
                    type: 'line',
                    borderColor: '#FF9E2B',
                    borderWidth: 2,
                    label: {
                        display: true,
                        backgroundColor: '#FF9E2B',
                        borderRadius: 5,
                        content: '현수위(' + ')',
                        rotation: 'auto',
                        position: 'start'
                    },
                    }
                }
                }
            },
            scales: {
                y: {
                border: {
                    display: false
                },
                grid: {
                    display: false
                },
                stack: true,
                ticks: {
                    display: false,
                    padding: 0
                }
                },
                x: {
                border: {
                    display: false
                },
                grid: {
                    display: false//격자 제거
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 5, //x축 tick 제거
                    padding: 0
                },
                barPercentage: 1,
                categoryPercentage: 1
                }
            },
        }

        return()=>{

        }

    }, [])

    //수위변화 on off
    const [levelChange, setLeveltChange] = useState(false)

    const [minDate, setMinDate] = useState('-')
    const [maxDate, setMaxDate] = useState('-')
    const [avg, setAvg] = useState(0)

    //수위 레이어 선택이 되었을시
    useEffect(()=>{

        //수위 지점 select get Feature
        if(selectWaterLevel){
            setLeveltChange(false)

            let sampleDatas = FloodWaterLevelChartDatas[selectWaterLevel.name]

            let date = []  //날짜
            let estWl = [] //위성기반 계측수위
            let obsWl = [] //실제계측수위

            let avgEst = 0

            if(sampleDatas && sampleDatas.length > 0){
                sampleDatas.map((obj)=>{
                    date.push(obj.Date)
                    estWl.push(obj.estWl  === '' ? NaN : Number(obj.estWl))
                    obsWl.push(obj.obsWl  === '' ? NaN : Number(obj.obsWl))

                    if(obj.estWl !== ''){
                        avgEst += Number(obj.estWl)
                    }

                })

                setMinDate(date[0])
                setMaxDate(date[date.length-1])
                setAvg(avgEst/(date.length-1))

            }else{
                setMinDate('-')
                setMaxDate('-')
                setAvg(0)
            }



        }


    },[selectWaterLevel])

  

    return (
        <>
            {/**
             * <div className="control-block" >
                    <h2 className="switch-label">수위변화</h2>
                    <Switch disabled={selectWaterLevel ? false : true} value={levelChange} className="float-box-switch" ></Switch>
                </div>
             */}
            
            
            <div className="content-body" style={{display: selectWaterLevel ? '' : 'none'}}>

              <div className="content-row">
                <div className="content-row-header">
                  <h2 className="content-row-title">지점 정보</h2>
                </div>
                <div className="panel-box info-head">
                    <div className="panel-box-header box-title">
                        <h3 className="panel-box-title">{selectWaterLevel && selectWaterLevel.title}</h3>
                    </div>
                    <div className="table-frame-wrap">
                    <div className="frame-thead">
                        <div className="frame-th">날짜</div>
                        <div className="frame-th">위성 계측 수위</div>
                    </div>
                    <div className="frame-tbody">
                        {/* <div className="frame-td">{selectWaterLevel && G$getDateType(selectWaterLevel.date)}</div> */}
                        <div className="frame-td">{selectWaterLevel && G$getDateType(minDate)+'~'+ G$getDateType(maxDate)}</div>
                        <div className="frame-td">{selectWaterLevel && G$setNumberFixedKomma(avg, 1)}<span className="unit">{selectWaterLevel && selectWaterLevel.unit}</span></div>
                    </div>
                    </div>
                </div>
              </div>
                <Tabs className="panel-tabs-wrap" exclusive fullWidth value={levelChange}>
                    <Tab className="tab-item" label={"수위수준"} value={false} onClick={()=>{setLeveltChange(false)}}></Tab>
                    <Tab className="tab-item" label={"수위변화"} value={true} onClick={()=>{setLeveltChange(true)}}></Tab>
                </Tabs>
              {/* 수위변화 OFF : 지역구성 */}
              <div className="content-row" style={{display: levelChange ? 'none' : ''}}>
                {levelChange && <FloodL4WaterLevelArea />}
              </div>
                
              {/* 수위변화 ON : 수위변화 그래프 */}
              <div className="content-row" style={{display: !levelChange ? 'none' : ''}}>
                {!levelChange && <FloodL4WaterLevelChange />}
              </div>
            </div>
        </>
    )
}

export default React.memo(FloodL4WaterLevel);
