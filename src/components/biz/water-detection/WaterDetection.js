import React, { startTransition, useEffect } from "react";
import WidgetManager from "../../../common/eventbus/manager/widget/WidgetManager";

const WaterDetection = () => {

    useEffect(()=>{
        return()=>{
            console.info('bye')
        }
        
    },[])

    const test = async () =>{
        
        WidgetManager.add('TestWidget2', {
            params: 'testParam'
        });
        
    }

    const test2 = () =>{
        WidgetManager.changeParam('TestWidget', {param2:'321'})
    }

    return (
        <>
        수체탐지
        <button onClick={test}>test</button>
        <button onClick={()=>{test2()}}>test2</button>
        </>
    )
}

export default React.memo(WaterDetection);
