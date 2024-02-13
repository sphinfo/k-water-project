import React, { useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";



const BaseResultCntTooltip = (props) => {

    const { resultInfos } = props

    const [resultList, setResultList] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(()=>{

        if(resultInfos?.order && resultInfos?.grouped){
            let newArray = []
            let totalCnt = 0
            resultInfos.order.map((obj, i)=>{
                if(obj){
                    newArray.push({category:obj, cnt: resultInfos.grouped[i].length})
                    totalCnt += resultInfos.grouped[i].length
                }
            })
            setResultList(newArray)
            setTotal(totalCnt)
        }else{
            setResultList([])
            setTotal(0)
        }
        
        

    },[resultInfos])

    const listComponent = (obj, i) => {
        return (
            <li key={`list-${i}`}>
                <p>{obj.category}</p> <span>{obj.cnt} 건</span>
            </li>
        );
    }

    return (
        <>
            <div className="panel-bottom">
                <div className="panel-bottom-info">
                    <p>산출물 개수</p>
                    <p className="info-number">
                        총 <span>{total}</span>건
                        <Tooltip placement="top-end" arrow id="infoNumberPop" title={
                            <React.Fragment>
                                <ul className="info-number-list">
                                    {
                                        resultList.length > 0 &&
                                        resultList.map((obj, i) => {
                                            return listComponent(obj, i);
                                        })
                                    }
                                    {
                                        resultList.length === 0 &&
                                        <li ><span>-</span></li>
                                    }
                                </ul>
                            </React.Fragment>
                        }>
                            <span className="tooltip-icon"></span>
                        </Tooltip>
                    </p>
                </div>
            </div>
        </>
    )
}

export default React.memo(BaseResultCntTooltip);
