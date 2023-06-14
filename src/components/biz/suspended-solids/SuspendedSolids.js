import React, { useEffect } from "react";

const SuspendedSolids = () => {

    useEffect(()=>{
        console.info('SuspendedSolids')
    },[])

    return (
        <>
        부유물탐지
        </>
    )
}

export default React.memo(SuspendedSolids);
