import BaseLegendWidget from "@components/legend/BaseLegendWidget";
import BaseWmsImageLayer from "@gis/layers/BaseWmsImageLayer";
import { G$addWidget, G$removeLayer, G$removeWidget } from "@gis/util";
import { TreeItem, TreeView } from "@mui/lab";
import {Checkbox, SvgIcon, FormControlLabel} from "@mui/material";
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
  const [selectedNodes, setSelectedNodes] = useState(['WKMBBSN', 'W_NATL','river','water']);
  useEffect(() => {
  }, [selectedNodes]);

  //초기 세팅
  useEffect(()=>{
    visibleLayers(['WKMBBSN','W_NATL'], true)
  },[])


    //전체선택
    const [selectAll, setSelectAll] = useState(false)
    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        const allIds = state.layerList.reduce((acc, obj) => getAllIds(obj, acc), []);
        setSelectedNodes(selectAll ? [] : allIds);
        visibleLayers(allIds, !selectAll);
    }

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

  const updateParentNodes = (node, selected) => {
    if (node.parent) {
      const parentNode = bfsSearch(state.layerList, node.parent);
      const siblings = parentNode.children || [];
      const isAllSiblingsSelected = siblings.every((sibling) =>
        selectedNodes.includes(sibling.id)
      );

      if (selected && !selectedNodes.includes(parentNode.id)) {
        setSelectedNodes((prevSelectedNodes) => [...prevSelectedNodes, parentNode.id]);
        visibleLayers([parentNode.id], true);
        updateParentNodes(parentNode, true);
      } else if (!selected && isAllSiblingsSelected) {
        setSelectedNodes((prevSelectedNodes) =>
          prevSelectedNodes.filter((id) => id !== parentNode.id)
        );
        visibleLayers([parentNode.id], false);
        updateParentNodes(parentNode, false);
      }
    }
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



      updateParentNodes(bfsSearch(state.layerList, nodeId), event.target.checked);

  };


  //레이어 on/off *instance(레이어) 없으면 생성 / 있으면 visible 
  const visibleLayers = (layerIds, visible) =>{
    if(layerIds.length > 0){
        layerIds.map((id)=>{
            let layerInfo = bfsSearch(state.layerList, id)
            if(!layerInfo.children){

              if(visible){
                if(layerInfo.id === 'W_FRST'){
                  layerInfo.instance = new BaseWmsImageLayer({store:layerInfo.store, layerId:layerInfo.id, fly:false, subId:'thematic_'})
                  layerInfo.instance2 = new BaseWmsImageLayer({store:layerInfo.store, layerId:'W_SCND', fly:false, subId:'thematic_'})
                }else{
                  layerInfo.instance = new BaseWmsImageLayer({store:layerInfo.store, layerId:layerInfo.id, fly:false, subId:'thematic_'})
                }
              }else{
                if(layerInfo.id === 'W_FRST'){
                  if(layerInfo?.instance?.layer && layerInfo?.instance2?.layer){
                    G$removeLayer(layerInfo.instance.layer)
                    G$removeLayer(layerInfo.instance2.layer)
                    layerInfo.instance = null
                    layerInfo.instance2 = null
                  }
                  
                }else{
                  if(layerInfo?.instance?.layer){
                    G$removeLayer(layerInfo.instance.layer)
                    layerInfo.instance = null
                  }
                }
              }
            }

            //범례 존재시 범례 on // off
            if(layerInfo.legend){
              if(visible){
                G$addWidget('BaseAddLegendWidget',{children:[
                  <BaseLegendWidget params={layerInfo.legend} />
                ]})
              }else{
                G$removeWidget('BaseAddLegendWidget')
              }
            }

        })
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
                      tabIndex={-1}
                      disableRipple
                      className={'check-box'}
                      onClick={(event) => handleNodeSelect(event, nodes.id)}
                  />
                  <span>{nodes.name}</span>
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
                    <path d="M10 5L5.5 1L1 5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </SvgIcon>}
                defaultExpandIcon={<SvgIcon>
                  <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5.5 5L10 1" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </SvgIcon>}
                className={'thematic-layers-box-wrap'}
            >
              <div className="box-header">
                <h2 className="box-title">레이어</h2>
                  <FormControlLabel
                      label="전체"
                      control={
                          <Checkbox
                              checked={selectAll}
                              onChange={handleSelectAll}
                              tabIndex={-1}
                              disableRipple
                              className={'check-box'}
                          />
                      }
                  />

              </div>
                {state.layerList.map((obj)=> renderTree(obj) )}
            </TreeView >
        </>

    )
}

export default forwardRef(ThematicTreeLayerCheckBoxList);
