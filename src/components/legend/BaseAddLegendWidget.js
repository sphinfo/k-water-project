import { toJS } from "mobx";
import React, { useEffect, useState } from "react";

/**  */
const BaseAddLegendWidget = (props) => {
    const { children, params, ...other } = props
    return (
        <>
            {React.Children.map(children, (child, index) => (
                <div className="widget widget-legend" key={index}>{child}</div>
            ))}
        </>
    )
}

export default React.memo(BaseAddLegendWidget)