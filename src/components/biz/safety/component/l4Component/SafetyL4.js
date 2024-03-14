import React, { useEffect } from "react";
import SafetyL4Thematic from "./SafetyL4Thematic";
import SafetyL4CompBtn from "./SafetyL4CompBtn";
import { useSelector } from "react-redux";

/**
 * 안전 활용주제도
 */
const SafetyL4 = ({ mainLayer, ...props}) => {

  const {selectFeature} = useSelector(state => state.safety)

    return (
        <>
          <div className="side-content-top">
            {
              //변위탐지 - 고성산란체 분산산란체 일시 && 선택된 레이어가 지점 레이어가 아닐경우
              (mainLayer?.layerId?.indexOf('L3TDA1') > -1 || mainLayer?.layerId?.indexOf('L3TDA2') > -1) && selectFeature?.id !== 'SafetyObsLayer' &&
              <SafetyL4CompBtn />
            }
          </div>
          <div className="side-content-bottom">
            {
              //변위탐지 - 고성산란체 일시 l4 검색
              mainLayer?.layerId?.indexOf('L3TDA1') > -1 &&
              <SafetyL4Thematic />
            }
          </div>
        </>
    )
}

export default React.memo(SafetyL4);
