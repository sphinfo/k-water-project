import React from "react";
import BaseOragDataInfo from "@components/biz/common/BaseOragDataInfo";
import SafetyL4Thematic from "./SafetyL4Thematic";
import SafetyL4CompBtn from "./SafetyL4CompBtn";

/**
 * 안전 활용주제도
 */
const SafetyL4 = ({ mainLayer, ...props}) => {

    return (
        <>
          <div className="side-content-top">
            {
              //변위탐지 - 고성산란체 분산산란체 일시
              (mainLayer?.layerId?.indexOf('L3TDA1') > -1 || mainLayer?.layerId?.indexOf('L3TDA2') > -1) &&
              <SafetyL4CompBtn />
            }
            
          </div>
          <div className="side-content-bottom">
            {
              //변위탐지 - 고성산란체 일시 l4 검색
              mainLayer?.layerId?.indexOf('L3TDA1') > -1 &&
              <SafetyL4Thematic />
            }
            
            {/* <BaseOragDataInfo a={true} b={true}/> */}
          </div>
        </>
    )
}

export default React.memo(SafetyL4);
