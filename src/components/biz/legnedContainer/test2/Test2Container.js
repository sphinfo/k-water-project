import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Test2Container = () => {
    const state = useSelector(state => state.main)
    useEffect(()=>{
        return()=>{
        }
    },[])

    return (
        <>
            <div style={{display: state.lengedPanel.Test2Container ? '' : 'none', width:200, height:200, background:'white'}}>
                <button>TestWidget222</button>
            </div>
            
        </>
    )
}

export default React.memo(Test2Container);
