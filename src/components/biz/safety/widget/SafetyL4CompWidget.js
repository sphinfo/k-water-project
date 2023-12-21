import BaseChart from "@common/chart/BaseChart";
import BaseEntityCollection from "@gis/layers/BaseEntityCollection";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import pin1 from "@images/point-icon-1.svg"
import pin2 from "@images/point-icon-2.svg"
import { G$RandomId, G$getDateType, G$removeLayer } from "@gis/util";
import { LOADING, SAFETY_CLICK_MODE } from "@redux/actions";
import BaseGrid from "@common/grid/BaseGrid";
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
        labels: [],
        //Y축
        datasets: [],
    })

    //테이블 ref
    const gridRef = useRef({})
    //데이터 ref
    const rows = useMemo(()=>{ return [  ] },[])
    const columns = [
        {accessor: 'date', Header: '관측 일자', width: 120, align: 'center'},
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
            dispatch({type: LOADING, loading: false})
        }

    },[])

    //차트데이터 기반 gtid 데이터 변환
    const createTableDatas = (dates=[], p1=[], p2=[])=>{
        const result = [];
        const minLength = Math.max(dates.length, p1.length, p2.length);

        for (let i = 0; i < minLength; i++) {
            const newObj = {
                date: dates[i] ? dates[i] : '',
                p1: p1[i] ? p1[i].toFixed(3) : '',
                p2: p2[i] ? p2[i].toFixed(3) : ''
            };
            result.push(newObj);
        }

        return result;
    }

    //grid 레이어가 선택이 되면 pinlayer 추가
    useEffect(()=>{
        if(selectFeature){
            //let coord = G$4326to3857(selectFeature.clickPosition.longitude, selectFeature.clickPosition.latitude)
            let id = select4Level ? select4Level.id : select3Level.id
            dispatch({type: LOADING, loading: true})
            getSafetyCompResult({y:parseFloat(selectFeature.clickPosition.latitude), x:parseFloat(selectFeature.clickPosition.longitude), id: Number(id)}).then((response)=>{

                dispatch({type: LOADING, loading: false})
                let datas = []
                let cols = []
                if(response.result.data.data.length > 0){
                    response.result.data.data.map((obj)=>{
                        datas.push(obj.value)
                        cols.push(G$getDateType(obj.createdAt.substring(0,8)) )
                    })
                }

                if(chartInfoRef.current.labels.length === 0){
                    chartInfoRef.current.labels = cols
                }
                addData(datas)
            })
            
            //addData()
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
    const addData = (datas=[]) =>{
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

            //차트 data push
            chartInfoRef.current.datasets.push({
                tension: 0.4,
                data: datas,
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
            removeData(datas)
        }
    }

    const [avgP1, setAvgP1] = useState(0)
    const [avgP2, setAvgP2] = useState(0)

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
        
        let tableDatas = createTableDatas( chartInfoRef.current.labels, p1, p2 )

        let aa = 0
        if(p1.length > 0){
            p1.map((val)=>{
                aa += val
            })    
            aa = (aa/p1.length).toFixed(3)
        }
        setAvgP1(aa)

        let bb = 0
        if(p2.length > 0){
            p2.map((val)=>{
                bb += val
            })    
            bb = (bb/p2.length).toFixed(3)
        }
        setAvgP2(bb)
        
        tableDatas = tableDatas.sort((a, b) => (a.date < b.date) ? 1 : -1)
        gridRef.current.provider = tableDatas

    }


    const removeData = (datas) =>{
        //하나 이상일때 제거
        if(chartInfoRef.current.datasets.length > 1){

            let removeId = chartInfoRef.current.datasets[0].id

            /* 차트 데이터 제거 */
            chartInfoRef.current.datasets = chartInfoRef.current.datasets.slice(1)
            chartRef.current.provider = chartInfoRef.current

            /* point Feature 제거 */
            safetyPinLayer.current.removeEntityById(removeId)

            addData(datas)
        }
    }


    return (
        <div className="content-body">
            <div className="content-col-group">
                <div className="content-col">
                    <div className="content-row">
                        <div className="panel-box">
                            <div className="number-dashboard">
                                {/**
                                 * <div className="nd-item">
                                    <h4 className="nd-item-title">지역 평균 변위 속도(cm/y)</h4>
                                    <div className="nd-item-body">-</div>
                                </div>
                                 */}
                                
                                <div className="nd-item">
                                    <h4 className="nd-item-title">P1 평균 변위 속도(cm/y)</h4>
                                    <div className="nd-item-body">{avgP1}</div>
                                </div>
                                <div className="nd-item">
                                    <h4 className="nd-item-title">P2 평균 변위 속도(cm/y)</h4>
                                    <div className="nd-item-body">{avgP2}</div>
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
                    <div className="content-row height-100">
                        <div className="panel-box height-100">
                            <div className="panel-box-header">
                                <h4 className="panel-box-title">변위속도 자료</h4>
                            </div>
                            <div className="table-wrap" style={{minHeight: '360px', height: '100%', overflowY: 'auto'}}>
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
