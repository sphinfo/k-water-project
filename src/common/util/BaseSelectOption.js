import { TreeItem, TreeView } from "@mui/lab";
import { SAFETY_TEXT_SAFETY } from "@redux/actions";
import React, { forwardRef, memo, useEffect, useImperativeHandle, useState } from 'react';
import { useDispatch } from "react-redux";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const BaseSelectOption = ({ provider = [], changeItem, ...other}, ref) => {

  const [selectedItems, setSelectedItems] = useState('')

  const [visibleTree, setVisibleTree] = useState(false)

  const itemClick = (item) => {

    if(selectedItems === item.name){
      setSelectedItems('')
    }else{
      setSelectedItems(item.name)
    }

    setVisibleTree(false)
  };


  //item 변경되었을시 
  useEffect(()=>{
    changeItem(selectedItems)
  },[selectedItems])

  // BaseSelectOption 레퍼런스 API
  useImperativeHandle(ref, () => ({
    get provider() {
	    return provider
    },
    set provider(datas) {
      provider = datas
    },

    set visibleTree(v){
      setVisibleTree(v)
    }
  }));

  
  const renderComponent = (option) => (
    <div className={"content-row"}>
      <div className="content-row-header">
      <h2 className={"content-row-title"}>{option.name}</h2>
      </div>
      <List className="search-bed-item-wrap">
        {option.items.map((item) => (
          <ListItem
            color={'primary'}
            button={true}
            selected={true}
            key={item.code}
            disableTouchRipple={true}
            className={selectedItems.includes(item.name) ? "search-bed-item item-on" : "search-bed-item" }
            onClick={() => itemClick(item)}>
            {item.name}
          </ListItem>
      ))}
      </List>
    </div>
  );

  

  return (
    <>
      <div className="input-basic-search panel-input">
      <input
        readOnly
        type="text"
        value={selectedItems} // 선택된 항목들의 이름을 나타내도록 설정
        placeholder="연구 대상 지역"
        onClick={() => setVisibleTree(!visibleTree)}
      />
        <button className={"map-search-bt"}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.0549 18.0549L13.5638 13.5639M13.5638 13.5639C14.7794 12.3484 15.4622 10.6998 15.4622 8.98083C15.4622 7.26185 14.7794 5.61327 13.5638 4.39776C12.3483 3.18225 10.6998 2.49939 8.98077 2.49939C7.26179 2.49939 5.61321 3.18225 4.3977 4.39776C3.18219 5.61327 2.49933 7.26185 2.49933 8.98083C2.49933 10.6998 3.18219 12.3484 4.3977 13.5639C5.61321 14.7794 7.26179 15.4623 8.98077 15.4623C10.6998 15.4623 12.3483 14.7794 13.5638 13.5639Z" stroke="#3D3D3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <div className={"search-bed map-basic-style"} style={{ display: visibleTree ? '' : 'none'}}>
        {provider.map((option) => renderComponent(option))}
      </div>
    </>
  );
};

export default memo(forwardRef(BaseSelectOption))