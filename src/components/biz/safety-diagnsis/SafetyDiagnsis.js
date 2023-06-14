import React, { useEffect } from "react";

const SafetyDiagnsis = () => {

    useEffect(()=>{
        console.info('SafetyDiagnsis')
    },[])

    return (
        <>
        안전진단지수
        </>
    )
}

export default React.memo(SafetyDiagnsis);
