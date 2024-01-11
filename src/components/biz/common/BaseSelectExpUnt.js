import React, {useEffect, useRef, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseWmsImageLayer from "@gis/layers/BaseWmsImageLayer";
import BaseOverlay from "@gis/util/overlay/BaseOverlay";
import ThematicTreeConfig from '@gis/config/ThematicTreeConfig';

const BaseSelectExpUnt = (props) => {

    //초기 입력값
    const { baseName='', ...other } = props
    const dispatch = useDispatch()
    const [expList, setExpList] = useState([])

    //ref
    const selectLayerRef = useRef()

    useEffect(()=>{

        let expArray = [{name:'테스트 베드', id:'test', checked: true, children:[{name: '테스트 베드', id:'test', parent:'test', checked:true}]}]
        ThematicTreeConfig.map((thematicObj)=>{
            if(thematicObj.expUse){
                expArray.push(thematicObj)
            }
        })
        setExpList(expArray)
        
        //단위선택레이어 생성
        selectLayerRef.current = new BaseWmsImageLayer({store:'',layerId:'', subId:baseName, overlay: new BaseOverlay(), fly:false})
        return()=>{
            selectLayerRef.current.remove()
        }
    },[])

    
    const setLayer = (item)=>{
        if(item && item.id !== 'test'){
            selectLayerRef.current.changeParameters({store:item.store, layerId:item.id, col:item.nameCol})
        }else{
            selectLayerRef.current.remove()
        }
    }

    const [selectedParent, setSelectedParent] = useState('test')
    const [selectButton, setSelectButton] = useState('test')

    const renderButton = (item) => {
        return item.children.map((child) => (
          <button className={`btn btn-widget ${selectButton === child.id ? 'active' : ''}`} key={child.id} style={{display: selectedParent === child.parent ? '' : 'none'}} onClick={() => handleButtonClick(child)}>
            {child.name}
          </button>
        ))
    }

    const handleParentChange = (event) => {
        const selectedParentId = event.target.value
        const selectedData = expList.find(item => item.id === selectedParentId)
    
        if (selectedData) {
          setSelectedParent(selectedParentId)
        }
    }

    const handleButtonClick = (child) => {
        setSelectButton(child.id)
        setLayer(child)
    }

    return (
        <div className="widget widget-toggle" style={{bottom: 155}}>
            <div className="widget-box">
                <div className="widget-header">
                    <h4 className="widget-title">표츌 단위 선택</h4>
                    <select className={'select-control'} value={selectedParent} onChange={handleParentChange}>
                        {
                            expList.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="widget-body">
                    <div className="widget-btn-wrap">
                        {
                            expList.map((item)=>{
                                return renderButton(item)
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(BaseSelectExpUnt);
