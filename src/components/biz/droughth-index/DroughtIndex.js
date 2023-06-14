import React, { useEffect } from "react";

const DroughtIndex = () => {

    useEffect(()=>{
        console.info('DroughtIndex')
    },[])

    return (
        <>
        가뭄지수
        </>
    )
}

export default React.memo(DroughtIndex);
