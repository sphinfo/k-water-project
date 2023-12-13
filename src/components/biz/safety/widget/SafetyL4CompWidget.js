import BaseChart from "@common/chart/BaseChart";
import BaseEntityCollection from "@gis/layers/BaseEntityCollection";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import pin from "@images/point-icon.png"
import IconButton from '@mui/material/IconButton';
import pin1 from "@images/point-icon-1.svg"
import pin2 from "@images/point-icon-2.svg"
import { G$4326to3857, G$RandomId, G$removeLayer } from "@gis/util";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import SafetyChartConfig from "@gis/config/SafetyChartConfig";
import { SAFETY_CLICK_MODE } from "@redux/actions";
import BaseGrid from "@common/grid/BaseGrid";
import { Cartesian3, Cartographic, Ellipsoid, WebMercatorProjection } from "cesium";
import { getSafetyCompResult } from "@common/axios/safety";

const SafetyL4CompWidget = () => {

    /**
     * selectFeature : feature 선택정보
     * select3Level : 3레벨 선택정보
     * select4Level : 4레벨 선택정보
     * displaceLevel : 변위성분 
     */
    const { selectFeature, select3Level, select4Level, displaceLevel } = useSelector(state => state.safety)
    const dispatch = useDispatch()

    //Chart Ref
    const chartRef = useRef({})

    //차트 데이터 Ref 
    const chartInfoRef = useRef({
        //X축 
        labels: ['2017-0308','2017-0320','2017-0401','2017-0413','2017-0425','2017-0507','2017-0519','2017-0531','2017-0612','2017-0624','2017-0706','2017-0718','2017-0730','2017-0811','2017-0823','2017-0904','2017-0916','2017-0928','2017-1010','2017-1022','2017-1103','2017-1115','2017-1209','2017-1221','2018-0102','2018-0114','2018-0126','2018-0207','2018-0619','2018-0701','2018-0713','2018-0725','2018-0806','2018-0818','2018-0830','2018-0911','2018-0923','2018-1005','2018-1017','2018-1029','2018-1110','2018-1122','2018-1204','2018-1216','2018-1228','2019-0109','2019-0121','2019-0202','2019-0214','2019-0226','2019-0310','2019-0322','2019-0403','2019-0415','2019-0427','2019-0509','2019-0521','2019-0602','2019-0614','2019-0626','2019-0708','2019-0720','2019-0813','2019-0825','2019-0906','2019-0918','2019-0930','2019-1012','2019-1024','2019-1105','2019-1117','2019-1129','2019-1211','2019-1223','2020-0104','2020-0116','2020-0128','2020-0209','2020-0221','2020-0304','2020-0316','2020-0328','2020-0409','2020-0421','2020-0503','2020-0515','2020-0527','2020-0608','2020-0620','2020-0702','2020-0714','2020-0726','2020-0807','2020-0819','2020-0831','2020-0912','2020-0924','2020-1006','2020-1018','2020-1030','2020-1111','2020-1123','2020-1205','2020-1217','2020-1229','2021-0110','2021-0122','2021-0203','2021-0215','2021-0227','2021-0311','2021-0323','2021-0404','2021-0416','2021-0428','2021-0510','2021-0522','2021-0603','2021-0615','2021-0627','2021-0709','2021-0721','2021-0802','2021-0814','2021-0826','2021-0907','2021-0919','2021-1001','2021-1013','2021-1025','2021-1106','2021-1118','2021-1130','2021-1212','2021-1224'],
        //Y축
        datasets: [],
    })

    //테이블 ref
    const gridRef = useRef({})
    //데이터 ref
    const rows = useMemo(()=>{ return [  ] },[])
    const columns = [
        {accessor: 'date', Header: '관측일자', width: 120, align: 'center'},
        {accessor: 'p1', Header: '변위속도 (p1)', width: 200, align: 'center'},
        {accessor: 'p2', Header: '변위속도 (p2)', width: 200, align: 'center'},
    ]
    

    //지점 pin 레이어
    const safetyPinLayer = useRef()

    //초기 옵션 추가
    useEffect(()=>{
        safetyPinLayer.current = new BaseEntityCollection({name:'safetyPinLayer', image: pin1})
        /** example 옵션 생성 */
        chartRef.current.updateOptions = {
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 18,
                        boxHeight: 3,
                        useBorderRadius: true,
                        borderRadius: 1.5
                    }
                },
                tooltip: {
                    mode: 'index', // 인덱스별로 툴팁 보이기
                    intersect: false, // 마우스 포인터와 각 선의 교차점에 툴팁 표시
                },
                zoom: {
                    pan: {
                        enabled: true, // 이동 가능하도록 설정
                        mode: 'x', // x축으로만 이동할 수 있도록 설정
                    },
                    zoom: {
                      wheel: {
                        enabled: true,
                      },
                      mode: 'x', // x축만 확대/축소 가능하도록 설정
                    },
                },
            },
            scales: {
                y: {
                    grid: {
                        display: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 4
                    }
                }
            }
        }
        
        //창이 닫히면 pinlayer 제거
        return()=>{
            G$removeLayer(safetyPinLayer.current.layer)
            dispatch({type: SAFETY_CLICK_MODE, compLayerClick: false})
        }

    },[])

    //차트데이터 기반 gtid 데이터 변환
    const createTableDatas = (dates=[], p1=[], p2=[])=>{
        const result = [];
        const minLength = Math.max(dates.length, p1.length, p2.length);

        for (let i = 0; i < minLength; i++) {
            const newObj = {
                date: dates[i] ? dates[i] : '',
                p1: p1[i] ? p1[i] : '',
                p2: p2[i] ? p2[i] : ''
            };
            result.push(newObj);
        }

        return result;
    }

    //grid 레이어가 선택이 되면 pinlayer 추가
    useEffect(()=>{
        if(selectFeature){

            console.info(selectFeature)
            let coord = G$4326to3857(selectFeature.clickPosition.longitude, selectFeature.clickPosition.latitude)
            //getSafetyCompResult({lng:coord.y, lat:coord.x}).then((response)=>{
                //addData()
            //})
            
            addData()
            //레이어가 선택되면 API 통하여 데이터 가져오기
            
        }
    },[selectFeature])


    //다른 레이어가 선택이 되면 비교값 초기화  ( pin layer / point text / chart dadta)
    useEffect(()=>{
        safetyPinLayer.current.entities.removeAll()
        chartRef.current.provider = chartInfoRef.current.datasets = []
        gridRef.current.provider = []
    },[select4Level, select3Level, displaceLevel])


    //데이터 추가
    const addData = () =>{
        let {clickPosition, properties} = selectFeature

        //차트에 데이터 Max 2개
        if(chartInfoRef.current.datasets.length < 2){

            //P1 / P2
            let pointNm = ''

            //누적데이터가 없을시 P1
            if(chartInfoRef.current.datasets.length === 0){
                pointNm = `P1`
            }else{
                //두개만 들어가야 해서 하나만 있음
                pointNm = chartInfoRef.current.datasets[0].label === 'P1' ? 'P2' : 'P1'
            }

            //geoserver 에서 가지고온 데이터 random id 생성
            properties = {...properties, ...{id:G$RandomId(), pointNm: pointNm}}

            //비교 point layer 등록
            safetyPinLayer.current._addFeature({
                lng:clickPosition.longitude,
                lat:clickPosition.latitude,
                properties,
                img:pointNm === `P1` ? pin1 : pin2
            })

            let sampleDatas = SafetyChartConfig
            const random = Math.floor(Math.random() * sampleDatas.length)

            //차트 data push
            chartInfoRef.current.datasets.push({
                tension: 0.4,
                data:sampleDatas[random],
                label: pointNm,
                id: properties.id,
                pointRadius: 1,
                borderWidth: 1,
                borderColor: pointNm === 'P1' ? '#54A6E7' : '#FF9933',
                backgroundColor: pointNm === 'P1' ? '#54A6E7' : '#FF9933',
            })
            chartRef.current.provider = chartInfoRef.current

            setTableData()

        }else if(chartInfoRef.current.datasets.length === 2){
            //데이터가 두개 있을경우 첫번째 point를 지우고 다시 데이터를 넣기
            removeData()
        }
    }

    //테이블 데이터 생성및 추가
    const setTableData = () =>{
        
        let p1 = []
        let p2 = []

        chartInfoRef.current.datasets.map((obj)=>{
            if (obj.label === 'P1') {
                p1 = obj.data
            } else {
                p2 = obj.data
            }
        })
        
        const tableDatas = createTableDatas( chartInfoRef.current.labels, p1, p2 )
        gridRef.current.provider = tableDatas

    }


    const removeData = (removeObj) =>{
        //하나 이상일때 제거
        if(chartInfoRef.current.datasets.length > 1){

            let removeId = chartInfoRef.current.datasets[0].id

            /* 차트 데이터 제거 */
            chartInfoRef.current.datasets = chartInfoRef.current.datasets.slice(1)
            chartRef.current.provider = chartInfoRef.current

            /* point Feature 제거 */
            safetyPinLayer.current.removeEntityById(removeId)

            addData()
        }
    }

    return (
        <div className="content-body">
            <div className="content-col-group">
                <div className="content-col">
                    <div className="content-row">
                        <div className="panel-box">
                            <div className="number-dashboard">
                                <div className="nd-item">
                                    <h4 className="nd-item-title">지역 평균 변위 속도(cm/y)</h4>
                                    <div className="nd-item-body">0.0507</div>
                                </div>
                                <div className="nd-item">
                                    <h4 className="nd-item-title">P1 평균 변위 속도(cm/y)</h4>
                                    <div className="nd-item-body">-</div>
                                </div>
                                <div className="nd-item">
                                    <h4 className="nd-item-title">P2 평균 변위 속도(cm/y)</h4>
                                    <div className="nd-item-body">-</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="content-row">
                        <div className="panel-box">
                            <BaseChart width={'100%'} height={300} ref={chartRef} chartType={'Line'} title={''}/>
                        </div>
                    </div>
                </div>

                <div className="content-col">
                    <div className="content-row">
                        <div className="panel-box">
                            <div className="panel-box-header">
                                <h4 className="panel-box-title">변위속도 자료</h4>
                            </div>
                            <div className="table-wrap" style={{height: 360, overflowY: 'auto'}}>
                                <BaseGrid ref={gridRef} columns={columns} provider={rows} className={'table-basic'}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default React.memo(SafetyL4CompWidget);
