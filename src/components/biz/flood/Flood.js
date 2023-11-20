import React, { useEffect, useRef, useState } from "react";
import FloodOptions from "./FloodOptions";

/* 가뭄 */
const Flood = () => {

    

    return (
        <>
            {/* 검색조건 영역   ex) 공토영역이 될듯 ? ( 검색 TEXT, 기간 설정 등.. )*/}
            <FloodOptions />

            {/* 결과결과 영역 */}
            {/* <FloodResult /> */}

            {/* 관측소 선택결과 ( 관측소가 선택되었을시 활용주제도 open )*/}
            {/* {selectFeature && ( <DroughtObsrv /> )} */}
        </>
    )
}

export default React.memo(Flood);
