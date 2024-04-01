import React, {useEffect, useState} from "react";
import { Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { G$addWidget,G$paramWidget,G$removeWidget } from "@gis/util";
import { DROUGHT_OBSRV_TAB } from "@redux/actions";
import MainWidgetManager from "@common/widget/WidgetManager";



const DroughtObsrvThematic = (props) => {

    const dispatch = useDispatch()
    const {mainLayer} = props

    /**
     * selectObs : 가뭄 선택 지점
     */
    const { selectObs, obsrvTab } = useSelector(state => state.drought)

    const [level4List, setLevel4List] = useState([{name:'가뭄지수',value:'index',checked: false},{name:'가뭄 해갈 강우량',value:'appease',checked: false}])

    //닫힐때 침수피해 레이어 초기화
    useEffect(()=>{
        return()=>{
            G$removeWidget('DroughtObsrvWidget')
        }
    },[])

    useEffect(()=>{
        setLevel4List([{name:'가뭄지수',value:'index',checked: false},{name:'가뭄 해갈 강우량',value:'appease',checked: false}])
        dispatch({type: DROUGHT_OBSRV_TAB, obsrvTab: 'soilMoisture'})
    },[mainLayer])

    useEffect(()=>{
        if(selectObs){
            if(MainWidgetManager._hasInstance('DroughtObsrvWidget') ){
                G$paramWidget('DroughtObsrvWidget',{subTitle: `${selectObs?.properties?.name}`})
            }else{
                G$addWidget('DroughtObsrvWidget',{},{subTitle: `${selectObs?.properties?.name}`})
            }
            // if(obsrvTab !== 'appease'){
            //     if(MainWidgetManager._hasInstance('DroughtObsrvWidget') ){
            //         G$paramWidget('DroughtObsrvWidget',{subTitle: `${selectObs?.properties?.name}`})
            //     }else{
            //         G$addWidget('DroughtObsrvWidget',{},{subTitle: `${selectObs?.properties?.name}`})
            //     }
            // }else{
            //     G$removeWidget('DroughtObsrvWidget')    
            // }
        }else{
            G$removeWidget('DroughtObsrvWidget')
        }
    },[selectObs])
    
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
        !select4Level ? dispatch({type: DROUGHT_OBSRV_TAB, obsrvTab: 'soilMoisture'}) : dispatch({type: DROUGHT_OBSRV_TAB, obsrvTab: select4Level.value})
        setLevel4List(newList)
    }

    //4레벨 Switch 버튼 render
    const renderResult = (item, i) =>{
        return (
            <div className="switch-list-item" key={`list_${i}`}>
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

export default React.memo(DroughtObsrvThematic);