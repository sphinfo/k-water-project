import React, { useEffect, useRef, useState } from "react";
import { G$addLayer, G$addWidget, G$flyToPoint,G$removeLayer, G$removeWidget } from "@gis/util";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import BaseWmsImageLayer from "@gis/layers/BaseWmsImageLayer";
import Switch from "@mui/material/Switch";
import SafeLevel2DataSource from "@gis/layers/SafeLevel2DataSource";
import TestDataConfig from "@gis/config/TestDataConfig";
import SaftyLevelChartDataSource from "@gis/layers/SaftyLevelChartDataSource";

const Safety = () => {

    /* 변위등급 / 변위성분 */
    const [safetyTab, setSafetyTab] = useState('rating')
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

        }

    },[])

    const safetyTabChange = (event, value) => {
        setSafetyTab(value)
    }

    useEffect(()=>{

        bizLayer1.current.setVisible(false)
        bizLayer2WfsLayer.current.entities.removeAll()

        if(safetyTab === 'rating'){
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

    return (
        <>
            <div className="tab-float-box">
                <ToggleButtonGroup className="tab-float-box-button-wrap list-main" value={safetyTab} exclusive onChange={safetyTabChange}>
                    <ToggleButton className="tab-float-box-btn list-item" value={"rating"}>변위 등급</ToggleButton>
                    <ToggleButton className="tab-float-box-btn list-item" value={"ingre"}>변위 성분</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div className="tab-float-box top-left-list" style={{display: safetyTab === 'ingre' ? '' : 'none'}}>
                <div className="tab-float-box-list-wrap">
                    <h2 className="tab-float-box-list-head">위성방향</h2>
                    <ToggleButtonGroup className="tab-float-box-button-wrap list-main" value={ingre}>
                        <ToggleButton className="tab-float-box-btn list-item" value={'L3TD_A2_YONGDAM_ASC'} onClick={()=>{changeParam('L3TD_A2_YONGDAM_ASC')}}>Ascending</ToggleButton>
                        <ToggleButton className="tab-float-box-btn list-item" value={'L3TD_A2_YONGDAM_DSC'} onClick={()=>{changeParam('L3TD_A2_YONGDAM_DSC')}}>Descending</ToggleButton>
                        <ToggleButton className="tab-float-box-btn list-item" value={'L4TD_YONGDAM_EW'} onClick={()=>{changeParam('L4TD_YONGDAM_EW')}}>East-West</ToggleButton>
                        <ToggleButton className="tab-float-box-btn list-item" value={'L4TD_YONGDAM_UD'} onClick={()=>{changeParam('L4TD_YONGDAM_UD')}}>Up-Down</ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </div>
            <div className="tab-float-box bottom-left">
                <div className="tab-float-box-button-wrap">
                    <button className="tab-float-box-btn btn-round">
                        안전등급
                        <Switch className="float-box-switch" value={safeLevelSwitch} onChange={()=>{setSafeLevelSwitch(!safeLevelSwitch)}}/>
                    </button>
                </div>
            </div>
            <div className="widget-legend safety" style={{width: 70, top:safetyTab === 'rating' ? 100 : 265}}>
                <dl className="widget-legend-wrap legend-vertical">
                    <dt>
                        <h4>변위 {safetyTab === 'rating' ? '등급' : '성분'}</h4>
                    </dt>
                    <dd>
                        <div className="widget-legend-chip e-w-velocity"></div>
                        <ul className="widget-legend-unit">
                                <li>3</li>
                                <li>1</li>
                        </ul>
                    </dd>
                </dl>
            </div>
        </>
    )
}

export default React.memo(Safety);
