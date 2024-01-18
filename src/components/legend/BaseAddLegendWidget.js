import { toJS } from "mobx";
import React, { useEffect, useState } from "react";

/**  */
const BaseAddLegendWidget = (props) => {

    const { children, params, ...other } = props

    useEffect(()=>{
        console.info(props)
    },[props])

    return (
        <>
            {React.Children.map(children, (child, index) => (
                <div key={index}>{child}</div>
            ))}
        </>
    )
}

export default React.memo(BaseAddLegendWidget)