import React, { forwardRef, memo, useEffect, useImperativeHandle, useState } from 'react'
import { G$flyToPoint, G$selectBoxFilter } from "@gis/util"
import { useDispatch, useSelector } from 'react-redux'
import { HOLD_MAP, MAIN_OPTIONS } from '@redux/actions'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

const BaseSelectOption = ({ provider = [], ...other}, ref) => {

  const dispatch = useDispatch()
  const { selectBox } = useSelector(state => state.main)
  const animatedComponents = makeAnimated()
  const [datasList, setDataList] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  useEffect(()=>{
    setDataList(G$selectBoxFilter(provider))
  },[provider])

  useEffect(()=>{
    setMenuIsOpen(selectBox)
  },[selectBox])

  useEffect(()=>{
    if(!menuIsOpen) dispatch({type:MAIN_OPTIONS, mainOptions: selectedItems})
  },[menuIsOpen, selectedItems])

  const handleSelectChange = (selectedOptions) => {
    setSelectedItems(selectedOptions)
  }

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
        onChange={handleSelectChange}
        value={selectedItems}
      />
    </>
  );
};

export default memo(forwardRef(BaseSelectOption))
