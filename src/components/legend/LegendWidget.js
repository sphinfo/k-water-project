import React, { useEffect, useState } from "react";

/** 범례 공통으로 사용할경우 param 받아서 범례값 title 변경 예시 230731 */
const LegendWidget = (props) => {

    const {params, ...other} = props
    const [title, setTitle] = useState('')

    useEffect(()=>{
        setTitle(params.title)
    },[params.title])

    return (
        <>
            <div>
                <h4>범례: {title}</h4>
            </div>
            
        </>
    )
}

export default React.memo(LegendWidget);
