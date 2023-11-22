import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DROUGHT_SELETE_FEATURE } from "@redux/actions";
import DroughtObsrvTab from "./DroughtObsrvTab";
import DroughtObsrvSoilMoisture from "./DroughtObsrvSoilMoisture";
import DroughtObsrvIndex from "./DroughtObsrvIndex";


/**
 * 가뭄 활용주제도
 */
const DroughtObsrv = () => {

    const dispatch = useDispatch()
    const { selectFeature, obsrvTab } = useSelector(state => state.drought)
    

    useEffect(()=>{
        return()=>{
            //선택레이어 삭제
            dispatch({type:DROUGHT_SELETE_FEATURE, selectFeature: false})
        }
    },[])

    useEffect(()=>{
        console.info(selectFeature)
    },[selectFeature])

    return (
        <>
            <div className={"panel side-panel"}>
                <div className={"panel-header"}>
                    <h1 className={"panel-title"}>
                        {"활용주제도"}
                    </h1>
                </div>
                <div className="content-block pb-0">
                    <DroughtObsrvTab />
                </div>

                <div className={"content-body"}>
                    <h1>관측 정보</h1>
                    {selectFeature.properties.Station}
                </div>
                <div style={{display: obsrvTab === 'soilMoisture' ? '' : 'none'}}>
                    <DroughtObsrvSoilMoisture />
                </div>
                <div style={{display: obsrvTab === 'index' ? '' : 'none'}}>
                    <DroughtObsrvIndex />
                </div>
                </div>


            </div>
        </>
    )
}

export default React.memo(DroughtObsrv);
