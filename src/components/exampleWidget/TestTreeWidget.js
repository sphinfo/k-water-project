import React, { useReducer, useRef } from "react";
import LayerTree from "./LayerTree";
import { G$addLayer, G$getLayerForName, G$makeWmsTileInstance, G$removeLayer } from "@gis/util";
import WaterBodyTestComponent from "@cmp/biz/water-body/WaterBodyTestComponent";
import dayjs from "dayjs";
import GisLayerClickTool from "@gis/util/GisLayerClickTool";
import { useImperativeHandle } from "react";
import { useEffect } from "react";

const actions = {
    SET_START_DATE: 'SET_START_DATE',
    SET_END_DATE: 'SET_END_DATE',
}

const INIT_DATA = {
    startDate: dayjs().format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
};

const reducer = (state, {type, ...data}) => {
	if (type === actions.INIT_DATA) {
        return {...state, ...data};
    } else if(type === actions.SET_COMBO){
        return {
            ...state,
            combo: data.combo
        }
    } else if(type === actions.SET_START_DATE) {
            state.startDate = data.date
        return {...state}
    } else if(type === actions.SET_END_DATE) {
            state.endDate = data.date
        return {...state}
    }
};

const TestTreeWidget = () => {

    const treeRef = useRef({})
    const [state, dispatch] = useReducer(reducer, INIT_DATA);


    const selectRef = useRef();
    useImperativeHandle(selectRef, ()=>({
        getFeatures(f){
            console.info(f)
        }
    }));

    //초기 설정
    useEffect(()=>{
        GisLayerClickTool.addBiz('TreeWidget', selectRef, [])
        GisLayerClickTool.enable('TreeWidget')
        return ()=>{
            
        }
    },[])

    const getSelectNode = () =>{
        //체크되지 않는 레이어 끄기
        let unchecked = treeRef.current.unchecked()
        if(unchecked.length > 0){
            unchecked.map((obj)=>{
                let layer = G$getLayerForName(obj.id)
                if(layer){
                    G$removeLayer(layer)
                }
            })
        }

        if(treeRef.current.value.length > 0){
            treeRef.current.value.map((id)=>{

                //nodeInfo
                let node = treeRef.current.nodeInfo(id) 
                let layer = G$makeWmsTileInstance(id)
                if(node.opacity){
                    layer.setOpacity(node.opacity)
                }
                G$addLayer(layer)
            })
        }
    }

    return (
        <>
            <div style={{width: 350}}>
                <div style={{outline: `dashed 1px black`, margin: 5}}>
                    <LayerTree ref={treeRef} />
                </div>
                <div>
                    <button style={{width:'100%', height: 30}} onClick={getSelectNode}>Search</button>
                </div>
                <div style={{margin: 10}}>
                    <WaterBodyTestComponent dispatch={dispatch} actions={actions} state={state}/>    
                </div>
                
            </div>
            
        </>
    )
}

export default React.memo(TestTreeWidget);
