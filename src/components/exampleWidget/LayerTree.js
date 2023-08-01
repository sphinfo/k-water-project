import { G$setLayerOpacity } from "@gis/util";
import { TreeItem, TreeView } from "@mui/lab";
import { Checkbox } from "@mui/material";
import { dropRight } from "lodash";
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";


const data = [
    {
      "id": "1",
      "name": "행정동",
      "children": [
        {
          "id": "BND_ADM_SIDO",
          "name": "시도",
          "parent": "1"
        },
        {
          "id": "TL_SCCO_SIG",
          "name": "시군구",
          "parent": "1"
        },
        {
          "id": "TL_SCCO_EMD",
          "name": "읍면동",
          "parent": "1"
        }
      ]
    },
    {
      "id": "2",
      "name": "WMS 레이어",
      "children": [
        {
          "id": "MOCT_LINK",
          "name": "나들목",
          "parent": "2"
        },{
          "id": "KTX",
          "name": "KTX",
          "parent": "2"
        },{
          "id": "FCLTS_EDUCATION_MID",
          "name": "중학교",
          "parent": "2"
        },{
          "id": "FCLTS_EDUCATION_UNI",
          "name": "대학교",
          "parent": "2"
        },{
          "id": "CROSSWALK",
          "name": "교차로",
          "parent": "2"
        }
      ]
    }
  ]
  

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
const LayerTree = ({}, ref) => {

    const [selectedNodes, setSelectedNodes] = useState([]);
    useEffect(() => {
        console.info(selectedNodes);
    }, [selectedNodes]);


    function getAllIds(node, idList = []) {
        idList.push(node.id);
        if (node.children) {
            node.children.forEach((child) => getAllIds(child, idList));
        }
        return idList;
    }

    const getAllChild = (id) => {
        return getAllIds(bfsSearch(data, id));
    };

    const getAllFathers = (id, list = []) => {
        const node = bfsSearch(data, id);
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
        const allChild = getAllChild(nodeId);
        const fathers = getAllFathers(nodeId);

        if (selectedNodes.includes(nodeId)) {
            setSelectedNodes((prevSelectedNodes) => prevSelectedNodes.filter((id) => !allChild.concat(fathers).includes(id)) );
        } else {
            const ToBeChecked = allChild;
            for (let i = 0; i < fathers.length; ++i) {
                if (isAllChildrenChecked(bfsSearch(data, fathers[i]), ToBeChecked)) {
                ToBeChecked.push(fathers[i]);
                }
            }
            setSelectedNodes((prevSelectedNodes) => [...prevSelectedNodes].concat(ToBeChecked) );
        }
    };

    const changeOpacity = (event, nodes) =>{
        nodes.opacity = event.target.value / 10
        console.info(nodes)
        G$setLayerOpacity(nodes.id, event.target.value / 10)
    }

    const renderTree = (nodes) => (
        <TreeItem
            key={nodes.id}
            nodeId={nodes.id}
            onClick={(event)=>{event.stopPropagation()}}
            label={
                <>
                    <Checkbox
                        checked={selectedNodes.indexOf(nodes.id) !== -1}
                        tabIndex={-1}
                        disableRipple
                        onClick={(event) => handleNodeSelect(event, nodes.id)}
                    />
                    {nodes.name}
                    
                    {!nodes.children ? ( <input 
                        style={{float: 'right', marginTop: 10, marginRight: 10}} 
                        type="range"
                        min={0} 
                        max={10} 
                        defaultValue={10}
                        onClick={(event)=>{event.stopPropagation()}}
                        onChange={(event)=> changeOpacity(event, nodes)}
                    /> 
                    ) : null}
                    
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
        return bfsSearch(data, id)
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
            <TreeView
                multiSelect
                defaultCollapseIcon={<>{'-'}</>}
                defaultExpandIcon={<>{'>'}</>}
            >
                {data.map((obj)=> renderTree(obj) )}
            </TreeView >
        </>

    )
}

export default forwardRef(LayerTree);
