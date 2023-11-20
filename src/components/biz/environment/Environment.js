import React, { useEffect, useRef, useState } from "react";
import EnvironmentOptions from "./EnvironmentOptions";
import EnvironmentResult from "./EnvironmentResult";

/* 환경 */
const Environment = () => {

  return (
    <>
      {/* 검색조건 영역   ex) 공토영역이 될듯 ? ( 검색 TEXT, 기간 설정 등.. )*/}
      <EnvironmentOptions />

      {/* 결과결과 영역 */}
      <EnvironmentResult />

      {/* 관측소 선택결과 ( 관측소가 선택되었을시 활용주제도 open )*/}
      {/* {selectFeature && ( <DroughtObsrv /> )} */}
    </>
)
}

export default React.memo(Environment);
