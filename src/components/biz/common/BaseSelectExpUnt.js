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

        let expArray = [{name:'테스트 베드', id:'test', checked: true, children:[{name: '테스트 베드', parent:'test', checked:true}]}]
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
        console.info(item)
        if(item){
            selectLayerRef.current.changeParameters({store:item.store, layerId:item.id})
        }else{
            selectLayerRef.current.remove()
        }
    }

    const [selectedParent, setSelectedParent] = useState('테스트 베드')
    const [childrenButtons, setChildrenButtons] = useState([])


    const handleParentChange = (event) => {
        const selectedParentId = event.target.value
        const selectedData = expList.find(item => item.id === selectedParentId)
    
        if (selectedData) {
          setSelectedParent(selectedParentId)
          const children = selectedData.children.map(child => (
            <button className="btn btn-round" key={child.id} onClick={() => handleButtonClick(child)}>
              {child.name}
            </button>
          ));
          setChildrenButtons(children)
        } else {
          setSelectedParent('')
          setChildrenButtons([])
        }
    }

    const handleButtonClick = (child) => {
        setLayer(child)
    };

    return (
        <div className="widget widget-toggle">
            <div className="widget-box">
                <div className="widget-header">
                    <h4 className="widget-title">표츌 단위 선택</h4>
                    <select className="select-control" value={selectedParent} onChange={handleParentChange}>
                        {
                            expList.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="widget-body">
                    <div className="widget-btn-wrap">
                        {childrenButtons}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(BaseSelectExpUnt);
