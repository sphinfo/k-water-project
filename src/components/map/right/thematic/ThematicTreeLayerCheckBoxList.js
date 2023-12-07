import BaseWmsImageLayer from "@gis/layers/BaseWmsImageLayer";
import { TreeItem, TreeView } from "@mui/lab";
import {Checkbox, SvgIcon} from "@mui/material";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useSelector } from "react-redux";

const bfsSearch = (graph, targetId) => {
    const queue = [...graph];

    while (queue.length > 0) {
        const currNode = queue.shift();

        if (currNode.id === targetId) {
            return currNode;
        }

        if (currNode.children) {
            queue.push(...currNode.children);
        }
    }

    return [];
};


/* tree layer 관리 */
const ThematicTreeLayerCheckBoxList = ({}, ref) => {
  const state = useSelector(state => state.layer)
  const [selectedNodes, setSelectedNodes] = useState([]);
  useEffect(() => {
      //console.info(selectedNodes);
  }, [selectedNodes]);


  function getAllIds(node, idList = []) {
      idList.push(node.id)
      if (node.children) {
          node.children.forEach((child) => getAllIds(child, idList));
      }
      return idList;
  }

  const getAllChild = (id) => {
      return getAllIds(bfsSearch(state.layerList, id));
  };

  const getAllFathers = (id, list = []) => {
      const node = bfsSearch(state.layerList, id);
      if (node.parent) {
          list.push(node.parent);
          return getAllFathers(node.parent, list);
      }

      return list;
  };

  function isAllChildrenChecked(node, list) {
      const allChild = getAllChild(node.id);
      const nodeIdIndex = allChild.indexOf(node.id);
      allChild.splice(nodeIdIndex, 1);

      return allChild.every((nodeId) =>
          selectedNodes.concat(list).includes(nodeId)
      );
  }

  //체크박스 클릭
  const handleNodeSelect = (event, nodeId) => {

      //tree hide / show 막기
      event.stopPropagation();
      const allChild = getAllChild(nodeId)
      const fathers = getAllFathers(nodeId)

      if (selectedNodes.includes(nodeId)) {
        visibleLayers(allChild, false)
        setSelectedNodes((prevSelectedNodes) => prevSelectedNodes.filter((id) => !allChild.concat(fathers).includes(id)) );
      } else {
        const ToBeChecked = allChild;
        for (let i = 0; i < fathers.length; ++i) {
            if (isAllChildrenChecked(bfsSearch(state.layerList, fathers[i]), ToBeChecked)) {
                ToBeChecked.push(fathers[i]);
            }
        }
        visibleLayers(ToBeChecked, true)
        setSelectedNodes((prevSelectedNodes) => [...prevSelectedNodes].concat(ToBeChecked) );
      }
  };


  //레이어 on/off *instance(레이어) 없으면 생성 / 있으면 visible 
  const visibleLayers = (layerIds, visible) =>{
    if(layerIds.length > 0){
        layerIds.map((id)=>{
            let layerInfo = bfsSearch(state.layerList, id)
            if(!layerInfo.children){
                if(layerInfo.instance){
                    layerInfo.instance.setVisible(visible)
                }else{
                    layerInfo.instance = new BaseWmsImageLayer(layerInfo.store, layerInfo.id, null, false)
                    //layerInfo.instance.setOpacity(0.4)
                }
            }
        })
    }

  }

  const changeOpacity = (event, nodes) =>{
      if(nodes.instance){
        nodes.instance.setOpacity(event.target.value / 10)
      }
  }

  const renderTree = (nodes) => (
      <TreeItem
          key={nodes.id}
          nodeId={nodes.id}
          className={'thematic-layer-item'}
          onClick={(event)=>{event.stopPropagation()}}
          label={
              <>
                  <Checkbox
                      checked={selectedNodes.indexOf(nodes.id) !== -1}
                      //indeterminate={/*하위아이템이 체크되면 부모아이템에 별도의 표시를 주는 옵션..*/ 0 && (nodes.id) }
                      tabIndex={-1}
                      disableRipple
                      className={'check-box'}
                      onClick={(event) => handleNodeSelect(event, nodes.id)}
                  />
                  <span>{nodes.name}</span>
                  
                  {/*{!nodes.children ? ( <input */}
                  {/*    style={{float: 'right', marginTop: 10, marginRight: 10}} */}
                  {/*    type="range"*/}
                  {/*    min={0} */}
                  {/*    max={10} */}
                  {/*    defaultValue={10}*/}
                  {/*    onClick={(event)=>{event.stopPropagation()}}*/}
                  {/*    onChange={(event)=> changeOpacity(event, nodes)}*/}
                  {/*/> */}
                  {/*) : null}*/}
              </>
          }
      >
          {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
      </TreeItem>
  );


  // BaseDatePicker 레퍼런스 API
  useImperativeHandle(ref, () => ({
    get value() {
	    return selectedNodes
    },

    nodeInfo: (id) =>{
        return bfsSearch(state.layerList, id)
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
    
        state.layerList.forEach(traverse);
    
        return uncheckedItems;
      },
  }));


    return (
        <>
            <TreeView
                multiSelect
                defaultCollapseIcon={<SvgIcon>
                  <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 5L5.5 1L1 5" stroke="#004478" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </SvgIcon>}
                defaultExpandIcon={<SvgIcon>
                  <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5.5 5L10 1" stroke="#717171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </SvgIcon>}
                className={'thematic-layers-box-wrap'}
            >
              <div className="box-header">
                <h2 className="box-title">레이어</h2>
                <Checkbox
                  tabIndex={-1}
                  disableRipple
                  className={'check-box'}
                />
              </div>
                {state.layerList.map((obj)=> renderTree(obj) )}
            </TreeView >
        </>

    )
}

export default forwardRef(ThematicTreeLayerCheckBoxList);
