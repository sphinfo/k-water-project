import React, { useEffect, useState } from "react";
import Tooltip from '@mui/material/Tooltip';
import img01 from "@images/legend-img-drought01.png"
import img02 from "@images/legend-img-drought02.png"
import img03 from "@images/legend-img-drought03.png"

const LegendEnvi = ({props, ...other}) => {

    const [infoType, setInfoType] = useState(false)

    useEffect(()=>{
        setInfoType(props?.category)
    },[props])

    return (
        <>
            <Tooltip placement="top" title={
                <React.Fragment>
                    <div className="tooltip-info-wrap">
                        {/*환경 01*/}
                        {
                            infoType === 'L3LCA1' && 
                            <div className="tooltip-info">
                                <div className="tooltip-info-box">
                                    <h5>수변 피복</h5>
                                    <p>하천의 피복을 5종류의 분류체계를 따라 분류한 값</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>입력자료</h6>
                                    <p>
                                        Sentinel-1 GRD<br/>
                                        Elevation<br/>
                                        Slope<br/>
                                        Basemap
                                    </p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>산출 알고리즘</h6>
                                    <p>Random Foreset(RF_A2)</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>공간해상도(m)</h6>
                                    <p>10</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>시간해상도(day)</h6>
                                    <p>12(일부 기간 제외)</p>
                                </div>
                            </div>
                            
                        }
                        

                        {/*환경 02*/}
                        {
                            infoType === 'L3LCA2' && 
                            <div className="tooltip-info">
                                <div className="tooltip-info-box">
                                    <h5>수변 피복</h5>
                                    <p>하천의 피복을 5종류의 분류체계를 따라 분류한 값</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>입력자료</h6>
                                    <p>
                                        Sentinel-1 GRD<br/>
                                        Elevation<br/>
                                        Slope<br/>
                                        Basemap
                                    </p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>산출 알고리즘</h6>
                                    <p>Random Foreset(LGB_A2)</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>공간해상도(m)</h6>
                                    <p>10</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>시간해상도(day)</h6>
                                    <p>12(일부 기간 제외)</p>
                                </div>
                            </div>
                        }
                        

                        {/*환경 03*/}
                        {
                            infoType === 'L3LCA2?' && 
                            <div className="tooltip-info">
                                <div className="tooltip-info-box">
                                    <h5>수변 피복 변화 탐지</h5>
                                    <p>하천의 피복을 5종류의 분류체계를 따라 분류한 값</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>입력자료</h6>
                                    <p>
                                        2021년 10월 수변피복(RF_A2)<br/>
                                        2021년 11월 수변피복(RF_A2)
                                    </p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>산출 알고리즘</h6>
                                    <p>Random Foreset(LGB_A2)</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>공간해상도(m)</h6>
                                    <p>10</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>시간해상도(month)</h6>
                                    <p>1</p>
                                </div>
                            </div>

                        }
                        

                        {/*환경 04*/}
                        {
                            infoType === 'L3GA' && 
                            <div className="tooltip-info">
                                <div className="tooltip-info-box">
                                    <h5>부유물 발생</h5>
                                    <p>수체에 발생한 부유성 폐기물을 탐지한 영상</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>입력자료</h6>
                                    <p>Sentinel-1 및 수체영상</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>산출 알고리즘</h6>
                                    <p>Faster R-CNN</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>공간해상도(m)</h6>
                                    <p>10</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>시간해상도</h6>
                                    <p>비주기적(부유물 발생 탐지한 경우)</p>
                                </div>
                            </div>
                        }
                        

                        {/*환경 05*/}
                        {
                            infoType === 'L3AE' && 
                            <div className="tooltip-info">
                                <div className="tooltip-info-box">
                                    <h5>녹조 농도(ppb)</h5>
                                    <p>수체에 포함된 클로로필-a 농도를 추정한 값</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>입력자료</h6>
                                    <p>Sentinel-2</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>산출 알고리즘</h6>
                                    <p>Multiple Layer Perceptron (MLP)</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>공간해상도(m)</h6>
                                    <p>10</p>
                                </div>

                                <div className="tooltip-info-box">
                                    <h6>시간해상도(day)</h6>
                                <p>4 ~ 5</p>
                                </div>
                            </div>
                        }
                        
                    </div>
                </React.Fragment>
            }>
                <span className="tooltip-icon"></span>
            </Tooltip>


        </>
    )
}

export default React.memo(LegendEnvi);
