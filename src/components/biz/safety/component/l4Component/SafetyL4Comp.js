import BaseChart from "@common/chart/BaseChart";
import BaseEntityCollection from "@gis/layers/BaseEntityCollection";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import pin from "@images/point-icon.png"
import IconButton from '@mui/material/IconButton';
import pin1 from "@images/point-icon-1.svg"
import pin2 from "@images/point-icon-2.svg"
import { G$RandomId, G$removeLayer } from "@gis/util";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import SafetyChartConfig from "@gis/config/SafetyChartConfig";

const SafetyL4Comp = () => {

    /**
     * detailSearchTabType : 탭 정보
     * selectFeature : feature 선택정보
     * select3Level : 3레벨 선택정보
     * select4Level : 4레벨 선택정보
     * displaceLevel : 변위성분 
     */
    const { detailSearchTabType, selectFeature, select3Level, select4Level, displaceLevel } = useSelector(state => state.safety)

    //Chart Ref
    const chartRef = useRef({})

    //차트 데이터 Ref 
    const chartInfoRef = useRef({
        //X축 
        labels: ['2017-0308','2017-0320','2017-0401','2017-0413','2017-0425','2017-0507','2017-0519','2017-0531','2017-0612','2017-0624','2017-0706','2017-0718','2017-0730','2017-0811','2017-0823','2017-0904','2017-0916','2017-0928','2017-1010','2017-1022','2017-1103','2017-1115','2017-1209','2017-1221','2018-0102','2018-0114','2018-0126','2018-0207','2018-0619','2018-0701','2018-0713','2018-0725','2018-0806','2018-0818','2018-0830','2018-0911','2018-0923','2018-1005','2018-1017','2018-1029','2018-1110','2018-1122','2018-1204','2018-1216','2018-1228','2019-0109','2019-0121','2019-0202','2019-0214','2019-0226','2019-0310','2019-0322','2019-0403','2019-0415','2019-0427','2019-0509','2019-0521','2019-0602','2019-0614','2019-0626','2019-0708','2019-0720','2019-0813','2019-0825','2019-0906','2019-0918','2019-0930','2019-1012','2019-1024','2019-1105','2019-1117','2019-1129','2019-1211','2019-1223','2020-0104','2020-0116','2020-0128','2020-0209','2020-0221','2020-0304','2020-0316','2020-0328','2020-0409','2020-0421','2020-0503','2020-0515','2020-0527','2020-0608','2020-0620','2020-0702','2020-0714','2020-0726','2020-0807','2020-0819','2020-0831','2020-0912','2020-0924','2020-1006','2020-1018','2020-1030','2020-1111','2020-1123','2020-1205','2020-1217','2020-1229','2021-0110','2021-0122','2021-0203','2021-0215','2021-0227','2021-0311','2021-0323','2021-0404','2021-0416','2021-0428','2021-0510','2021-0522','2021-0603','2021-0615','2021-0627','2021-0709','2021-0721','2021-0802','2021-0814','2021-0826','2021-0907','2021-0919','2021-1001','2021-1013','2021-1025','2021-1106','2021-1118','2021-1130','2021-1212','2021-1224'],
        //Y축
        datasets: [],
    })

    //비교 포인트 info list
    const [compList, setCompList] = useState([])

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
        }

    },[])

    //grid 레이어가 선택이 되면 pinlayer 추가
    useEffect(()=>{
        if(selectFeature){

            //properties 의 값으로 CSV값을 가져와야 하는데 매핑되는 지점이 없음
            //feature 에서 id가 존재하는지 모르겠음
            // const findData = chartInfoRef.current.datasets.some(item => item.label === selectFeature.featureId)
            // if(!findData){
            //     //데이터 추가
            //     addData()
            // }

            addData()
        }
    },[selectFeature])


    //다른 레이어가 선택이 되면 비교값 초기화  ( pin layer / point text / chart dadta)
    useEffect(()=>{
        safetyPinLayer.current.entities.removeAll()
        chartRef.current.provider = chartInfoRef.current.datasets = []
        setCompList([])
    },[select4Level, select3Level, displaceLevel])

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

            /* 샘플 데이터 */
            // let dataset = [10, 13, 17, 18, 23, 20, 18, 17, 21, 23]
            // let updatedDataset = dataset.map(value => {
            //     let multiplier = Math.random() < 0.5 ? 1 : 5;
            //     return value + multiplier;
            // });

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

            //setCompList(prevList => [...prevList, selectFeature])
            setCompList(prevList => [...prevList, {clickPosition, properties}])

        }


    }

    const removeData = (removeObj) =>{
        //하나 이상일때 제거
        if(chartInfoRef.current.datasets.length > 1){
            /* 차트 데이터 제거 */
            chartInfoRef.current.datasets = chartInfoRef.current.datasets.filter(obj => obj.id !== removeObj.properties.id)
            chartRef.current.provider = chartInfoRef.current

            /* point text 데이터 제거 */
            setCompList(prevList => prevList.filter(item => item.properties.id !== removeObj.properties.id))

            /* point Feature 제거 */
            safetyPinLayer.current.removeEntityById(removeObj.properties.id)
        }
    }

    const renderPointInfo = (obj, i) =>{
        return (
            <div className={`panel-box point-box ${obj.properties.pointNm === 'P1' ? 'point-1' : 'point-2'}`}/* point-1 ~ point-5 개별 색상 클래스*/ style={{color:'black'}} key={i}>
                <div className="panel-box-header">
                    <div className="point-icon"></div>
                    <h2 className={"panel-box-title"}>{obj.properties.pointNm}</h2>
                    <IconButton onClick={()=>{removeData(obj)}} className={"popup-close-btn"}></IconButton>
                </div>
                <div className={"panel-body"}>
                    <div className="table-frame-wrap">
                        <div className="frame-thead">
                            <div className="frame-th">lat</div>
                            <div className="frame-th">lon</div>
                        </div>
                        <div className="frame-tbody">
                            <div className="frame-td">{obj.clickPosition.latitude}</div>
                            <div className="frame-td">{obj.clickPosition.longitude}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div style={{display: detailSearchTabType === 'comp' ? '' : 'none'}}>
                <div className="content-row">
                    <div className="content-row-header">
                        <h2 className={"content-row-title"}>그래프</h2>
                    </div>
                    <div className="panel-box mb-0">
                        <BaseChart width={260} height={270} ref={chartRef} chartType={'Line'} title={''}/>
                    </div>
                </div>
                <div className={"content-row"}>
                    <div className="content-row-header">
                        <h2 className={"content-row-title"}>Point</h2>
                    </div>
                    <div className="content-row-body">
                        {compList.map((obj, i)=> renderPointInfo(obj, i) )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default React.memo(SafetyL4Comp);
