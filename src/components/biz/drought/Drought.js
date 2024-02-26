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
     * layers: 등록 레이어
     */
    const { bizName, selectObs, obsrvTab, layers } = useSelector(state => state.drought)

    //가뭄 레이어 ( 4L )
    const droughtL4Layer = useRef()

    //관측소 레이어
    const droughtObsrvLayer = useRef()

    const [station, setStation] = useState(false)

    const [selectType, setSelectType] = useState({id:'test'})

    /* 레이어 선택 callback Ref */
    const layerSelectRef = useRef();
    useImperativeHandle(layerSelectRef, ()=>({
        getFeatures(features){

            if(selectType?.id === 'test'){
                //기존에 선택된 레이어가 있으면 이미지 변경
                if(selectObs){
                    selectObs.entity.billboard.image = pin
                }

                dispatch({type:DROUGHT_SELECT_FEATURE, selectObs: false})
                if(station === features[0].properties.code){
                    setStation(false)
                }else{
                    features[0].entity.billboard.image = pin2
                    dispatch({type:DROUGHT_SELECT_FEATURE, selectObs: features[0]})
                    setStation(features[0].properties.Station)
                }
            }else{
                G$removeWidget('DroughtExpUntWidget')
                if(features.length > 0){
                    G$addWidget('DroughtExpUntWidget', {params: features[0], selectType}, {subTitle:features[0].properties[selectType.nameCol]})
                }
            }            
        }
    }))

    //WIDGET 창이 닫혔을시
    useEffect(()=>{
        if(!selectObs){
            setStation(false)
        }
    },[selectObs])

    /* 초기 세팅 사항 */
    useEffect(()=>{

        //가뭄 관측소 레이어 생성
        droughtObsrvLayer.current = new BaseEntityCollection({name:'droughtObsrvLayer', image: pin, overlay: new DroughtOverlay()})

        //가뭄 메인 레이어 L4
        droughtL4Layer.current = new BaseWmsImageLayer({store:'drought',layerId:''})

        //초기 지점리스트 get
        getDroughtObs().then((response) => {
            if(response?.result?.data?.length > 0){
                response.result.data.map((obj)=>{
                    droughtObsrvLayer.current._addFeature({lng:obj.lng, lat:obj.lat, properties:obj, hover: true})
                })
            }
        })
        
        //지점 hide
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
            G$removeWidget('DroughtExpUntWidget')
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
        if(selectType?.id === 'test'){
            if(layerIdx > 0){
                droughtObsrvLayer.current.show = true
            }
        }else{
            droughtObsrvLayer.current.show = false
        }

    },[selectType, layerIdx])

    useEffect(()=>{
        //레이어가 켜저 있으면 지점 on
        G$removeWidget('BaseAddLegendWidget')
        if(layerIdx > 0){
            let tooltip = false
            if(layerIdx === 1){ tooltip = <LegendDrought type={obsrvTab} mainLayer={mainLayer}/> }

            //droughtObsrvLayer.current.show = true
            if(obsrvTab === 'soilMoisture'){
                G$addWidget('BaseAddLegendWidget',{children:[
                    <DroughtLegendgGradientWidget params={{title:'토양수분', tooltip:tooltip}}/>
                ]})
            }else if(obsrvTab === 'index'){                
                G$addWidget('BaseAddLegendWidget',{children:[
                    <BaseLegendWidget params={{ title:'가뭄지수', tooltip:tooltip, datas: [{label:'관심', color:'#3A60FB'},{label:'주의', color:'#FFFF00'},{label:'경계', color:'#FFAA01'},{label:'심각', color:'#FF0000'}]}}/>
                ]})
            }else if(obsrvTab === 'appease'){
                G$addWidget('BaseAddLegendWidget',{children:[
                    <DroughtLegendgGradientWidget params={{title:'가뭄해갈', tooltip:tooltip}}/>
                ]})
            }
            
        }else{
            //droughtObsrvLayer.current.show = false
            G$removeWidget('BaseAddLegendWidget')
        }
    },[layerIdx, obsrvTab])

    useEffect(()=>{
        if(obsrvTab === 'index' || obsrvTab === 'appease' && mainLayer){
            const {id} = mainLayer
            getL4Layers({id:id}).then((response)=>{
                if(response?.result?.data?.length > 0){

                    let store = ''
                    let layer = ''

                    //category:"L4DRA2"
                    response.result.data.map((obj)=>{
                        if(obsrvTab === 'index' && obj.category === 'L4DRA1'){
                            store = obj.dataType.toLowerCase()
                            layer = obj.name
                        }else if(obsrvTab === 'appease' && obj.category === 'L4DRA2'){
                            store = obj.dataType.toLowerCase()
                            layer = obj.name
                        }
                    })

                    droughtL4Layer.current.changeParameters({store:store, layerId:layer})
                }
            })
        }else{
            droughtL4Layer.current.remove()
        }
    },[obsrvTab])

    const expUntFeature = (layerId, item) =>{

        G$removeWidget('DroughtExpUntWidget')

        let id = layerId ? layerId : 'droughtObsrvLayer' 
        if(!layerId){    
            dispatch({type:DROUGHT_SELECT_FEATURE, selectObs: false})
        }

        GisLayerClickTool.resetLayer(bizName)
        GisLayerClickTool.addLayer(bizName, [id])
        setSelectType(item)

    }

    return (
        <>
            {/* 검색조건 영역   ex) 공토영역이 될듯 ? ( 검색 TEXT, 기간 설정 등.. )*/}
            {/* <DroughtOptions /> */}

            {/* 결과결과 영역 */}
            <div className="panel panel-left">
                <DroughtResult />
            </div>

            {/* 관측소 선택결과 ( 관측소가 선택되었을시 활용주제도 open )*/}
            

            <div className="side-content">
                <BaseSelectExpUnt baseName={'Drought'} setFeatureInfo={expUntFeature}/>
                {layerIdx === 1 && (
                    <DroughtL4/>
                )}
            </div>
        </>
    )
}

export default React.memo(Drought);
