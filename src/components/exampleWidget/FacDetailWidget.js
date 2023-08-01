import BaseChart from "@com/manager/chart/BaseChart";
import { G$removeWidget } from "@gis/util";
import React, { useEffect, useReducer, useRef } from "react";
import { useState } from "react";
import FacDetailWidgetInfo from "./FacDetailWidgetInfo";
import FacDetailWidgetData from "./FacDetailWidgetData";
import { Provider } from "react-redux";
const name = 'FacDetailWidget'


const actions = {
    GET_DATA: 'GET_DATA',
    SET_DATA: 'SET_DATA',
    SET_DATA2: 'SET_DATA2',
}

const INIT_DATA = {
    data: [],
    stor_cd: null
};

const sample1 = [{ aa: '2000.06', bb: '100', cc: '50' }, { aa: '2000.07', bb: '265', cc: '121' }, { aa: '2000.08', bb: '233', cc: '101' }, { aa: '2000.09', bb: '223', cc: '151' }, { aa: '2000.10', bb: '42', cc: '110' }, { aa: '2000.11', bb: '235', cc: '139' }, { aa: '2000.12', bb: '201', cc: '131' } ]
const sample2 = [{ aa: '2000.06', bb: '300', cc: '10' }, { aa: '2000.07', bb: '125', cc: '21' }, { aa: '2000.08', bb: '23', cc: '56' }, { aa: '2000.09', bb: '45', cc: '95' }, { aa: '2000.10', bb: '42', cc: '10' }, { aa: '2000.11', bb: '74', cc: '61' }, { aa: '2000.12', bb: '31', cc: '39' } ]

const reducer = (state, {type, ...data}) => {
	if (type === actions.GET_DATA) {
        return {...state};
    }else if (type === actions.SET_DATA) {
        state.data = sample1
        return {...state, ...data};
    }else if (type === actions.SET_DATA2) {
        state.data = sample2
        return {...state, ...data};
    }
};

/** 시설 상세 정보 */
const FacDetailWidget = (props) => {
    const close = () =>{ G$removeWidget(name) }

    const [state, dispatch] = useReducer(reducer, INIT_DATA);

    useEffect(()=>{
        return()=>{
            console.info('bye')
        }
    },[])

    useEffect(()=>{

    },[props.param])

    const [activeTab, setActiveTab] = useState(0);
    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <>
            <div>
                <h1>시설상세정보</h1>
                <button onClick={close}>close</button>
                <button onClick={()=>{dispatch({type: actions.SET_DATA})}}>setData1</button>
                <button onClick={()=>{dispatch({type: actions.SET_DATA2})}}>setData2</button>
                <div>
                    <div>
                        <button onClick={() => handleTabClick(0)}>계측정보</button>
                        <button onClick={() => handleTabClick(1)}>실시간 계측 수위</button>
                    </div>
                    <div>
                        {activeTab === 0 && <FacDetailWidgetInfo dispatch={dispatch} actions={actions} state={state}/>}
                        {activeTab === 1 && <FacDetailWidgetData dispatch={dispatch} actions={actions} state={state}/>}
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default React.memo(FacDetailWidget);
