import React, { startTransition, useEffect } from "react";
import WidgetManager from "../../../common/eventbus/manager/widget/WidgetManager";

const WaterDetection = () => {

    useEffect(()=>{

        return()=>{
            WidgetManager.remove('TestWidget2', {
                params: 'testParam'
            });
        }
        
    },[])

    const test = async () =>{
        
        WidgetManager.add('TestWidget2', {
            params: 'testParam'
        });
        
    }

    return (
        <>
        수체탐지
        <button onClick={test}>testWidget</button>
        </>
    )
}

export default React.memo(WaterDetection);
