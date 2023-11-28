import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DROUGHT_SELETE_FEATURE } from "@redux/actions";
import DroughtObsrvTab from "./DroughtObsrvTab";
import DroughtObsrvSoilMoisture from "./DroughtObsrvSoilMoisture";
import DroughtObsrvIndex from "./DroughtObsrvIndex";
import { G$GetPointToDetail } from "@gis/util";


/**
 * 가뭄 활용주제도
 */
const DroughtObsrv = () => {

    const dispatch = useDispatch()
    const { selectObs, obsrvTab } = useSelector(state => state.drought)
    

    useEffect(()=>{
        return()=>{
            //선택레이어 삭제
            dispatch({type:DROUGHT_SELETE_FEATURE, selectObs: false})
        }
    },[])

    const [dms, setDms] = useState()

    useEffect(()=>{
        console.info(selectObs)
        setDms(G$GetPointToDetail(selectObs.properties.Lon, selectObs.properties.Lat))
        //G$GetPointToDetail(selectObs.properties.Lon, selectObs.properties.Lat).lonDms
    },[selectObs])

    return (
        <>
            
            <div className={"panel-header"}>
                <h1 className={"panel-title"}>
                    {"활용주제도"}
                </h1>
            </div>
            <div className="content-block pb-0">
                <DroughtObsrvTab />
            </div>

            <div className={"content-body"}>
                <div className="content-row">
                    <div className="content-row-header">
                        <h2 className="content-row-title">관측 정보</h2>
                    </div>
                    <div className="panel-box info-head">
                      <div className="panel-box-header box-title">
                      <h3 className="panel-box-title">
                        {selectObs.properties.Station}
                      </h3>
                      </div>
                      <table className="panel-table">
                        <colgroup>
                          <col style={{width: '50px'}}/>
                          <col style={{width: 'auto'}}/>
                        </colgroup>
                        <tbody>
                        <tr>
                          <th>경도</th>
                          <td>{ dms ? dms.lonDms : ''}</td>
                        </tr>
                        <tr>
                          <th>위도</th>
                          <td>{ dms ? dms.latDms : ''}</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                </div>

            <div className={"content-row"} style={{display: obsrvTab === 'soilMoisture' ? '' : 'none'}}>
                <DroughtObsrvSoilMoisture />
            </div>
            <div style={{display: obsrvTab === 'index' ? '' : 'none'}}>
                <DroughtObsrvIndex />
            </div>
            </div>
        </>
    )
}

export default React.memo(DroughtObsrv);
