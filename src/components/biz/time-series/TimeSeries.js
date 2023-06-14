import React, { useEffect } from "react";

const TimeSeries = () => {

    useEffect(()=>{
        console.info('TimeSeries')
    },[])

    return (
        <>
        시계열 변위 모니터링
        </>
    )
}

export default React.memo(TimeSeries);
