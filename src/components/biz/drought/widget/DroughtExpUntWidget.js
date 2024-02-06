import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DroughtExpUntDatas from "../component/expUnt/DroughtExpUntDatas";


/**
 * 가뭄 표출 단위 선택
 */
const DroughtExpUntWidget = (props) => {

    const dispatch = useDispatch()
    const { selectExp } = useSelector(state => state.drought)
    

    useEffect(()=>{
        console.info(props)
    },[props])


    return (
        <>
            <div className={"content-body"}>
                <div className="content-col-group">
                    <DroughtExpUntDatas />
                </div>
            </div>
        </>
    )
}

export default React.memo(DroughtExpUntWidget);
