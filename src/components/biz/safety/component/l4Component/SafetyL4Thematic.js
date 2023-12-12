import React, {useEffect, useState} from "react";
import { Switch } from "@mui/material";
import { SAFETY_SELECT_4_LEVEL, SAFETY_SELECT_4_LEVEL_RESET } from "@redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { getL4Layers } from "@common/axios/common";


const example = [{
    name: 'EAST-WEST',
    store: 'Safety',
    layer: 'L4TD_YONGDAM_EW',
    checked: false
},{
    name: 'UP-DOWN',
    store: 'Safety',
    layer: 'L4TD_YONGDAM_UD',
    checked: false
},{
    name: 'NORTH-SOUTH',
    store: 'Safety',
    layer: 'L4TD_YONGDAM_UD',
    checked: false
}]

/**
 * 안전 - 4LEVEL 활용주제도
 */
const SafetyL4Thematic = () => {

    const dispatch = useDispatch()
    const {detailSearchTabType, select3Level} = useSelector(state => state.safety)

    //레벨 4 리스트
    const [level4List, setLevel4List] = useState([])

    useEffect(()=>{    
        //3레벨이 선택되었으면 4레벨 reducer 초기화
        dispatch({type:SAFETY_SELECT_4_LEVEL_RESET})
        /**
         * select3Level : 3레벨값이 바뀌면 4레벨 데이터 LIST 가 변경되어야 한다 API 후 SET LIST
         * 현재는 임의로 버튼 추가
         * */
        //select3Level 레벨 값 API 확인후  (***API 필요***)
        console.info(select3Level)
        getL4Layers({id:select3Level.id}).then((response)=>{
            console.info(response.result)
        })

        setLevel4List(example)

    },[select3Level])



    //L4 선택
    const handleSwitchChange = (index) => {
        
        let select4Level = false
        const newList = level4List.map((item, i) => {
            if (index === i) {
                if(!item.checked){
                  select4Level = item
                }
                return { ...item, checked: !item.checked };
            }
            return { ...item, checked: false };
        })
        select4Level ? dispatch({type:SAFETY_SELECT_4_LEVEL, select4Level:select4Level}) : dispatch({type:SAFETY_SELECT_4_LEVEL_RESET})
        setLevel4List(newList);
    }


    //닫힐때 침수피해 레이어 초기화
    useEffect(()=>{
        
        return()=>{
    
        }
        
    },[])



    //4레벨 Switch 버튼 render
    const renderResult = (item, i) =>{
        return (
            <div className="switch-list-item">
                <span className="switch-label">{item.name}</span>
                <Switch
                    checked={item.checked}
                    onClick={(e) => handleSwitchChange(i)}
                    name={item.name}
                />
            </div>
        )
    }

    return (
        <>
            <div className="widget widget-toggle">
                <div className="widget-box">
                    <div className="widget-header">
                        <h4 className="widget-title">활용 주제도</h4>
                    </div>
                    <div className="widget-body">
                        <div className="switch-list">
                            {level4List.length > 0 && level4List.map((obj, i) => renderResult(obj, i))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default React.memo(SafetyL4Thematic);
