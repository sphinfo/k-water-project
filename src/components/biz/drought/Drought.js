import React, { useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GisLayerClickTool from "@gis/util/click/GisLayerClickTool";
import BaseEntityCollection from "@gis/layers/BaseEntityCollection";
import DroughtResult from "./DroughtResult";
import DroughtOptions from "./DroughtOptions";
import pin from "@images/map-icon-dr.svg"
import pin2 from "@images/map-icon-dr-clicked.svg"
import { G$RandomId, G$addWidget, G$cartesianToLongLat, G$flyToPoint, G$randomCoordinates, G$removeLayer, G$removeWidget } from "@gis/util";
import { DROUGHT_CLEAR_LAEYRS, DROUGHT_RESET, DROUGHT_SELECT_FEATURE, SET_SIDE_PANEL } from "@redux/actions";
import DroughtOverlay from "@gis/util/overlay/DroughtOverlay";
import BaseWmsImageLayer from "@gis/layers/BaseWmsImageLayer";
import DroughtL4 from "./component/DroughtL4";
import { getDroughtObs } from "@common/axios/drought";
import { getL4Layers } from "@common/axios/common";
import BaseSelectExpUnt from "../common/BaseSelectExpUnt";
import BaseLegendgGradientWidget from "@components/legend/BaseLegendgGradientWidget";
import BaseLegendgGradientWidget2 from "@components/legend/BaseLegendgGradientWidget2";
import LegendDrought from "@components/legend/LegendDrought";
import BasePolygonEntityCollection from "@gis/layers/BasePolygonEntityCollection";
import DroughtLegendgGradientWidget from "@components/legend/DroughtLegendgGradientWidget";
import BaseLegendWidget from "@components/legend/BaseLegendWidget";

const Drought = () => {

    const dispatch = useDispatch()

    /**
     * bizName : 메뉴 명 ( 공통으로 reducer에 사용될 예정 )
     * selectObs : 선택된 관측소 정보
     * selectDroughtLayer : 가뭄 메인 레이어
     * layers: 등록 레이어
     */
    const { bizName, selectObs, selectDroughtLayer, obsrvTab, layers } = useSelector(state => state.drought)

    //가뭄 레이어 ( 4L )
    const droughtL4Layer = useRef()

    //관측소 레이어
    const droughtObsrvLayer = useRef()

    const [station, setStation] = useState(false)

    /* 레이어 선택 callback Ref */
    const layerSelectRef = useRef();
    useImperativeHandle(layerSelectRef, ()=>({
        getFeatures(features){

            //기존에 선택된 레이어가 있으면 이미지 변경
            if(selectObs){
                selectObs.entity.billboard.image = pin
            }

            if(station === features[0].properties.Station){
                dispatch({type:DROUGHT_SELECT_FEATURE, selectObs: false})
                setStation(false)
            }else{
                features[0].entity.billboard.image = pin2
                dispatch({type:DROUGHT_SELECT_FEATURE, selectObs: features[0]})
                setStation(features[0].properties.Station)
            }
        }
    }));

    //WIDGET 창이 닫혔을시
    useEffect(()=>{
        if(!selectObs){
            setStation(false)
        }
    },[selectObs])

    const [obsList, setObseList] = useState([])

    //const areaLayer = useRef()

    /* 초기 세팅 사항 */
    useEffect(()=>{

        //가뭄 관측소 레이어 생성
        droughtObsrvLayer.current = new BaseEntityCollection({name:'droughtObsrvLayer', image: pin, overlay: new DroughtOverlay()})

        //가뭄 메인 레이어 L4
        droughtL4Layer.current = new BaseWmsImageLayer({store:'drought',layerId:''})

        //areaLayer.current = new BasePolygonEntityCollection({name:'l3aeLayer'})

        //*******API*************/
        //let obsList = DroughtObsrvConfig
        getDroughtObs().then((response) => {
            if(response?.result?.data?.length > 0){
                //areaLayer.current._addFeature({xmin: 127.50600844103556, ymin: 34.3913015352451, xmax: 130.64136019478192, ymax: 36.53665712523854, properties:{id:G$RandomId()}})
                setObseList(response?.result?.data)
                response.result.data.map((obj)=>{
                    droughtObsrvLayer.current._addFeature({lng:obj.lng, lat:obj.lat, properties:obj, hover: true})
                })
            }
        })
        
        droughtObsrvLayer.current.show = false

        //레이어 클릭 callback 등록
        GisLayerClickTool.addBiz(bizName, layerSelectRef, ['droughtObsrvLayer'])
        //레이어 클릭 callback 활성화
        GisLayerClickTool.enable(bizName)

        return()=>{

            //레이어 클릭 callback 비활성화
            GisLayerClickTool.destroyBiz(bizName)
            
            //관측소 레이어 삭제
            G$removeLayer(droughtObsrvLayer.current.layer)
            if(droughtObsrvLayer.current.hoverHandler){
                droughtObsrvLayer.current.hoverHandler.destroy()
                droughtObsrvLayer.current.hoverHandler = undefined
            }

            if(droughtObsrvLayer.current?.overlay){
                droughtObsrvLayer.current.overlay.removeAll()
            }

            //removeAll

            //가뭄 레이어 삭제
            G$removeLayer(droughtL4Layer.current.layer)

            //가뭄 reducer 초기화
            dispatch({type:DROUGHT_RESET})
            dispatch({type:DROUGHT_CLEAR_LAEYRS})

            G$removeWidget('BaseAddLegendWidget')
        }

    },[])

    const [layerIdx, setLayerIdx] = useState(0)
    const [mainLayer, setMainLayer] = useState(false)

    

    useEffect(()=>{
        let layerCnt = Object.keys(layers).length
        setLayerIdx(layerCnt)

        if(layerCnt === 1){
            Object.keys(layers).map((layerId, i)=>{
              const { store, layer, ...other } = layers[layerId]?.props
              if(i === 0){
                  setMainLayer(other)
              }
          })
            
        }else{
            droughtL4Layer.current.remove()
            setMainLayer(false)
        }

        
    },[layers])

    useEffect(()=>{
        //레이어가 켜저 있으면 지점 on
        G$removeWidget('BaseAddLegendWidget')
        if(layerIdx > 0){
            let tooltip = false
            if(layerIdx === 1){ tooltip = <LegendDrought type={obsrvTab} mainLayer={mainLayer}/> }

            droughtObsrvLayer.current.show = true
            if(obsrvTab === 'soilMoisture'){
                G$addWidget('BaseAddLegendWidget',{children:[
                    <DroughtLegendgGradientWidget params={{title:'토양수분', min:0, max: 50, datas:['#FF0000', '#FFA500', '#FAFAD2', '#87CEFA', '#1E90FF'], tooltip:tooltip}}/>
                ]})
            }else if(obsrvTab === 'index'){                
                G$addWidget('BaseAddLegendWidget',{children:[
                    <BaseLegendWidget params={{ title:'가뭄지수', tooltip:tooltip, datas: [{label:'관심', color:'#3A60FB'},{label:'주의', color:'#FFFF00'},{label:'경계', color:'#FFAA01'},{label:'심각', color:'#FF0000'}]}}/>
                ]})
            }
            
        }else{
            droughtObsrvLayer.current.show = false
            G$removeWidget('BaseAddLegendWidget')
        }
    },[layerIdx, obsrvTab])

    useEffect(()=>{
        if(obsrvTab === 'index' && mainLayer){
            const {id} = mainLayer
            getL4Layers({id:id}).then((response)=>{
                if(response?.result?.data?.length > 0){
                    let store = response.result.data[0].dataType.toLowerCase()
                    let layer = response.result.data[0].name
                    droughtL4Layer.current.changeParameters({store:store, layerId:layer})
                }
            })
        }else{
            droughtL4Layer.current.remove()
        }
    },[obsrvTab])

    return (
        <>
            {/* 검색조건 영역   ex) 공토영역이 될듯 ? ( 검색 TEXT, 기간 설정 등.. )*/}
            <DroughtOptions />

            {/* 결과결과 영역 */}
            <DroughtResult />

            {/* 관측소 선택결과 ( 관측소가 선택되었을시 활용주제도 open )*/}
            {layerIdx === 1 && (
                <div className="side-content">
                    {
                        obsrvTab === 'soilMoisture' &&
                        <BaseSelectExpUnt baseName={'Drought'}/>
                    }
                    
                    <DroughtL4/>
                </div>
            )}
        </>
    )
}

export default React.memo(Drought);
