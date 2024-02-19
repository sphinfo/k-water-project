import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DroughtExpUntDatas from "../component/expUnt/DroughtExpUntDatas";


/**
 * 가뭄 표출 단위 선택
 */
const DroughtExpUntWidget = (props) => {

    const [selectInfo, setSelectInfo] = useState(false)

    const {params, selectType} = props

    useEffect(()=>{
        setSelectInfo(params)
    },[props])


    return (
        <>
            <div className={"content-body"}>
                <div className="content-col-group">
                    <DroughtExpUntDatas params={params} selectType={selectType}/>
                </div>
            </div>
        </>
    )
}

export default React.memo(DroughtExpUntWidget);
