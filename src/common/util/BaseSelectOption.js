import React, { forwardRef, memo, useEffect, useImperativeHandle, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import SvgIcon from "@mui/material/SvgIcon";
import { G$flyToPoint, G$selectBoxFilter } from "@gis/util";
import { Checkbox } from "@mui/material";
import { useDispatch } from 'react-redux';
import { HOLD_MAP } from '@redux/actions';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const BaseSelectOption = ({ provider = [], changeItem, searchOn, ...other}, ref) => {

  const dispatch = useDispatch()
  const animatedComponents = makeAnimated()
  const [datasList, setDataList] = useState([])
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  useEffect(()=>{
    setDataList(G$selectBoxFilter(provider))
  },[provider])

  const [selectedItems, setSelectedItems] = useState([])


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
      //setVisibleTree(v)
    }
  }));

  useEffect(()=>{
    console.info(menuIsOpen)
  },[menuIsOpen])

  useEffect(()=>{
    console.info(menuIsOpen)
  },[datasList])

  const formatGroupLabel = (data) => (
    <div >
      <span>{data.name}</span>
      <span>{data.options.length}</span>
    </div>
  )


  return (
    <>
      <Select
        closeMenuOnSelect={false}
        className="react-select-container"
        classNamePrefix="react-select"
        getOptionLabel={option => option.name}
        getOptionValue={option => option.code}
        options={datasList}
        isMulti
        formatGroupLabel={formatGroupLabel}
        menuIsOpen={menuIsOpen}
        onMenuOpen={() => setMenuIsOpen(true)}
        onMenuClose={() => setMenuIsOpen(false)}
        placeholder={"검색어를 입력해주세요."}
      />
    </>
  );
};

export default memo(forwardRef(BaseSelectOption))
