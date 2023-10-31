import React, { useEffect, useRef, useState } from "react";
import { G$addLayer, G$addWidget, G$flyToPoint,G$removeLayer, G$removeWidget } from "@gis/util";

import BaseWmsImageLayer from "@gis/layers/BaseWmsImageLayer";
import Switch from "@mui/material/Switch";
import SafeLevel2DataSource from "@gis/layers/SafeLevel2DataSource";
import TestDataConfig from "@gis/config/TestDataConfig";
import SaftyLevelChartDataSource from "@gis/layers/SaftyLevelChartDataSource";
import SafetyTab from "./component/SafetyTab";
import { useSelector } from "react-redux";
import SafetyOptions from "./component/SafetyOptions";
import SafetyResult from "./component/SafetyResult";

const Safety = () => {

    /* 변위등급 / 변위성분 */
    //const [safetyTab, setSafetyTab] = useState('rating')
    const safetyTab = useSelector(state => state.safety.safetyType);
    /* 변위 성분 - 위성방향 */
    const [ingre, setIngre] = useState('L3TD_A2_YONGDAM_ASC')

    /* 변위성분 레이어 */
    const bizLayer1 = useRef()

    /* 변위 등급 레이어 */
    const bizLayer2WfsLayer = useRef()

    /* 안전등급 on / off */
    const [safeLevelSwitch, setSafeLevelSwitch] = useState(false)

    //안전등급 wfs
    const safeLevelWfsLayer = useRef()



    useEffect(()=>{

        bizLayer1.current = new BaseWmsImageLayer('Safety','L3TD_A2_YONGDAM_ASC')
        bizLayer2WfsLayer.current = new SafeLevel2DataSource({name:'biz2'})
        G$addLayer(bizLayer2WfsLayer.current)

        //safeLevelWfsLayer.current = new SafeLevelDataSource({name:'safeLevelWfs'})
        safeLevelWfsLayer.current = new SaftyLevelChartDataSource({name:'safeLevelWfs'})
        
        G$addLayer(safeLevelWfsLayer.current)

        return()=>{
            if(bizLayer1.current.layer){
                G$removeLayer(bizLayer1.current.layer)
            }
            
            G$removeLayer(safeLevelWfsLayer.current.id)
            G$removeLayer(bizLayer2WfsLayer.current.id)
            G$removeWidget('BaseLegendWidget')
            G$removeWidget('SafetyDisplaceSpeedWidget')

        }

    },[])

    useEffect(()=>{

        bizLayer1.current.setVisible(false)
        bizLayer2WfsLayer.current.entities.removeAll()

        if(safetyTab === 'displace'){
            let sampleGrid = TestDataConfig

            sampleGrid.map((gridObj)=>{
                bizLayer2WfsLayer.current._addFeature(gridObj[0], gridObj[1], gridObj[2])
            })

            G$flyToPoint(sampleGrid[0], 10000)

        }else if(safetyTab === 'ingre'){
            bizLayer1.current.setVisible(true)
        }else{

        }

    },[safetyTab])

    /* 위성방향 change */
    const changeParam = (value) =>{
        if(bizLayer1.current){
            setIngre(value)
            bizLayer1.current.changeParameters({layerId:value})
        }
    }

    // 안전등급 change
    useEffect(()=>{

        let sampleD = [[127.5250673286962,35.944192524501226],
                        [127.53529701571178,35.97097555573311],
                        [127.46753556525508,35.95249077680412],
                        [127.48402275397979,35.93312025326577],
                        [127.57799526943475,35.9944069442441]]

        if(safeLevelSwitch){
            G$addWidget('BaseLegendWidget', { params: {title:'안전 등급', datas: [{label:'안전', color:'BLUE'},{label:'보통', color:'YELLOW'},{label:'위험', color:'RED'}]} })
            sampleD.map((centroid)=>{
                safeLevelWfsLayer.current._addFeature(centroid[0],centroid[1], '')
            })

            
            G$flyToPoint([127.50843157935425, 35.863467152308926], 13000, -52)
            

        }else{
            safeLevelWfsLayer.current.entities.removeAll()
            G$removeWidget('BaseLegendWidget')
        }

    },[safeLevelSwitch])



    const openWidget = (wid) =>{
        G$addWidget('SafetyDisplaceSpeedWidget')
    }

    return (
        <>
            {/* 헤더 Tab 영역*/}
            <div className="tab-float-box">
                <SafetyTab />
            </div>

            {/* 검색조건 영역   ex) 공토영역이 될듯 ? ( 검색 TEXT, 기간 설정 등.. )*/}
            <div className="tab-float-box top-left-list">
                <SafetyOptions changeParam={changeParam} ingre={ingre}/>
            </div>


            {/* 결과결과 영역 */}
            <div className="tab-float-box top-left-list">
                <SafetyResult />
            </div>


            {/* 팝업 샘플 WIDGET ( SafetyDisplaceSpeedWidget.js ) */}
            <div className="tab-float-box top-left-list">
                <button onClick={()=>{openWidget('')}}>변위속도 팝업 ON</button>
            </div>
            
        </>
    )
}

export default React.memo(Safety);
