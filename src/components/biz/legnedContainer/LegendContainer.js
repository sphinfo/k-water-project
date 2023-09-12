import React, { useEffect } from "react";
import Test1Container from "./test1/Test1Container";
import Test2Container from "./test2/Test2Container";

const LegendContainer = (props) => {

    return (
        <>
            <Test1Container />
            <Test2Container />
        </>
    )
}

export default React.memo(LegendContainer);
