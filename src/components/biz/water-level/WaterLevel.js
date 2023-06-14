import React, { useEffect } from "react";

const WaterLevel = () => {

    useEffect(()=>{
        console.info('WaterLevel')
        return()=>{
            console.info('bye')
        }
    },[])

    return (
        <>
        수위탐지
        </>
    )
}

export default React.memo(WaterLevel);
