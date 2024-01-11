import React, { forwardRef, useImperativeHandle, useState } from "react";
import { TreeItem, TreeView } from "@mui/lab";
import { Checkbox } from "@mui/material";
import { useSelector } from "react-redux";
import { G$removeLayer } from "@gis/util";
import BaseWmsImageLayer from "@gis/layers/BaseWmsImageLayer";

const data = []

/* tree layer 관리 */
const ThematicLayerCheckBoxList = ({}, ref) => {

    const state = useSelector(state => state.layer)

    const [selectedNodes, setSelectedNodes] = useState([]);

    //체크박스 클릭
    const handleNodeSelect = (event, node) => {
        //tree hide / show 막기
        event.stopPropagation();

        const nodeIndex = selectedNodes.indexOf(node.id);
        setSelectedNodes((prevSelectedNodes) => nodeIndex === -1 ? [...prevSelectedNodes, node.id] : prevSelectedNodes.filter((id) => id !== node.id) );

        // 임시 로직 새로 만들기 instance 등록하고 기존에 만들어놨으면 instacne 다시 만들지 않게 수정하기
        if(event.target.checked){
          new BaseWmsImageLayer({store:node.store, layerId:node.id})
        }else{
          G$removeLayer(`${node.store}:${node.id}`)
        }
    };

    const renderTree = (node) => (
        <TreeItem
            key={node.id}
            nodeId={node.id}
            label={
                <>
                  <div >
                    <Checkbox
                          checked={selectedNodes.indexOf(node.id) !== -1}
                          tabIndex={-1}
                          disableRipple
                          onClick={(event) => handleNodeSelect(event, node)}
                      />
                      {node.name} 
                  </div>
                    
                </>
            }
        >
        </TreeItem>
  );


  // BaseDatePicker 레퍼런스 API
  useImperativeHandle(ref, () => ({
    get value() {
	    return selectedNodes
    },

    //체크 되지 않은 노드 
    unchecked: function getAllUncheckedNodes() {
        const uncheckedItems = [];
    
        function traverse(node) {
          if (!selectedNodes.includes(node.id)) {
            uncheckedItems.push(node);
          }
    
          if (node.children) {
            node.children.forEach(traverse);
          }
        }
    
        data.forEach(traverse);
    
        return uncheckedItems;
      },
  }));


    return (
        <>
          <div>
            <TreeView
                multiSelect
            >
              {state.layerList.map((obj)=> renderTree(obj) )}
            </TreeView >
          </div>
        </>

    )
}

export default forwardRef(ThematicLayerCheckBoxList);
