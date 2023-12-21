import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GisLayerClickTool from "@gis/util/click/GisLayerClickTool";
import BaseEntityCollection from "@gis/layers/BaseEntityCollection";
import DroughtResult from "./DroughtResult";
import DroughtOptions from "./DroughtOptions";
import pin from "@images/map-icon-dr.svg"
import pin2 from "@images/map-icon-dr-clicked.svg"
import { G$addWidget, G$flyToPoint, G$randomCoordinates, G$removeLayer, G$removeWidget } from "@gis/util";
import { DROUGHT_RESET, DROUGHT_SELECT_FEATURE, SET_SIDE_PANEL } from "@redux/actions";
import DroughtOverlay from "@gis/util/overlay/DroughtOverlay";
import BaseWmsImageLayer from "@gis/layers/BaseWmsImageLayer";
import DroughtL4 from "./component/DroughtL4";
import { getDroughtObs } from "@common/axios/drought";
import { getL4Layers } from "@common/axios/common";

const Drought = () => {

    const dispatch = useDispatch()

    /**
     * bizName : 메뉴 명 ( 공통으로 reducer에 사용될 예정 )
     * selectObs : 선택된 관측소 정보
     * selectDroughtLayer : 가뭄 메인 레이어
     */
    const { bizName, selectObs, selectDroughtLayer, obsrvTab, text } = useSelector(state => state.drought)
//

    //가뭄 레이어 ( 3L )
    const droughtLayer = useRef()

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

    /* 초기 세팅 사항 */
    useEffect(()=>{

        //가뭄 관측소 레이어 생성
        droughtObsrvLayer.current = new BaseEntityCollection({name:'droughtObsrvLayer', image: pin, overlay: new DroughtOverlay()})

        //가뭄 메인 레이어
        droughtLayer.current = new BaseWmsImageLayer('drought','')

        //가뭄 메인 레이어 L4
        droughtL4Layer.current = new BaseWmsImageLayer('drought','')

        //*******API*************/
        //let obsList = DroughtObsrvConfig
        getDroughtObs().then((response) => {
            if(response.result.data.length > 0){
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

            //가뭄 레이어 삭제
            G$removeLayer(droughtLayer.current.layer)
            G$removeLayer(droughtL4Layer.current.layer)

            //가뭄 reducer 초기화
            dispatch({type:DROUGHT_RESET})

            G$removeWidget('BaseLegendgGradientWidget')
            G$removeWidget('BaseLegendgGradientWidget2')
        }

    },[])


    //가뭄 레이어 선택되었을때
    useEffect(()=>{

        droughtL4Layer.current.remove()
        
        if(selectDroughtLayer){
            const {store, layer} = selectDroughtLayer
            droughtLayer.current.changeParameters({store:store, layerId:layer})

            // if(text.name.indexOf('댐') > -1){
            //     if(text.x && text.y && text.z){
            //         G$flyToPoint([text.y, text.x], text.z)
            //     }
            // }

            //범례 on
            G$addWidget('BaseLegendgGradientWidget', { params: {title:'토양수분', min:0, max: 50, datas:['#FF0000', '#FFA500', '#FAFAD2', '#87CEFA', '#1E90FF']}})

            //지점 on
            droughtObsrvLayer.current.show = true

        }else{
            //가뭄 off
            droughtLayer.current.remove()
            //지점 off
            droughtObsrvLayer.current.show = false
            //범례 off
            G$removeWidget('BaseLegendgGradientWidget')
            G$removeWidget('BaseLegendgGradientWidget2')
        }

    },[selectDroughtLayer])

    useEffect(()=>{

        if(obsrvTab === 'index'){
            if(selectDroughtLayer){
                const {id} = selectDroughtLayer
                getL4Layers({id:id}).then((response)=>{
                    if(response.result.data.length > 0){
                        let store = response.result.data[0].dataType.toLowerCase()
                        let layer = response.result.data[0].name
                        droughtL4Layer.current.changeParameters({store:store, layerId:layer})
                    }
                })
            }
        }else{
            droughtL4Layer.current.remove()
        }
        

    },[obsrvTab])

    //사이드 위치 조정 on
    useEffect(()=>{
        selectObs ? dispatch({type: SET_SIDE_PANEL, panelSide: true}) : dispatch({type: SET_SIDE_PANEL, panelSide: false})
    },[selectObs])

    return (
        <>
            {/* 검색조건 영역   ex) 공토영역이 될듯 ? ( 검색 TEXT, 기간 설정 등.. )*/}
            <DroughtOptions />

            {/* 결과결과 영역 */}
            <DroughtResult />

            {/* 관측소 선택결과 ( 관측소가 선택되었을시 활용주제도 open )*/}
            {selectObs && (
                <div className="side-content">
                    <DroughtL4/>
                </div>
            )}
        </>
    )
}

export default React.memo(Drought);
