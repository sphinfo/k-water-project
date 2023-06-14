import React, { useEffect } from "react";

const SoilMoisture = () => {

    useEffect(()=>{
        console.info('SoilMoisture')
    },[])

    return (
        <>
        토양수분
        </>
    )
}

export default React.memo(SoilMoisture);
