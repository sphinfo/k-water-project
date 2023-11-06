import { TreeItem, TreeView } from "@mui/lab";
import { SET_TEXT_SAFETY } from "@redux/actions";
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";

const SafetyMultipleSelect = ({ options = [] }) => {
  const [selectedItems, setSelectedItems] = useState('')

  const [visibleTree, setVisibleTree] = useState(false)

  const dispatch = useDispatch()

  const itemClick = (item) => {
    const index = selectedItems.indexOf(item.name)
    if (index === -1) {
      //추가
      setSelectedItems([...selectedItems, item.name]) 
    } else {
       //제거
      const newItems = [...selectedItems]
      newItems.splice(index, 1)
      setSelectedItems(newItems)
    }
  };

  useEffect(()=>{

    dispatch({type: SET_TEXT_SAFETY, text: selectedItems})

  },[selectedItems])
  
  const renderComponent = (option) => (
    <div>
      <h2>{option.name}</h2>
        {option.items.map((item) => (
          <button 
            key={item.code} 
            style={{ backgroundColor: selectedItems.includes(item.name) ? 'yellow' : 'transparent' }}
            onClick={() => itemClick(item)}>
            {item.name}
          </button>
      ))}
    </div>
  );

  

  return (
    <>
      <input
        type="text"
        style={{ color: 'black' }}
        value={selectedItems} // 선택된 항목들의 이름을 나타내도록 설정
        readOnly
        placeholder="연구 대상 지역"
        onClick={() => setVisibleTree(!visibleTree)}
      />
      <div style={{ display: visibleTree ? '' : 'none' }}>
        {options.map((option) => renderComponent(option))}
      </div>
    </>
  );
};

export default SafetyMultipleSelect;