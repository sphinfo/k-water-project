import Safety from '@components/biz/safety/Safety';
import Drought from '@components/biz/drought/Drought';
import Flood from '@components/biz/flood/Flood';
import Environment from '@components/biz/environment/Environment';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { SET_PANEL_VISIBLE } from '@redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Admin from '@components/biz/admin/Admin';
import Tooltip from "@mui/material/Tooltip";
import BaseSearchOption from '@components/biz/common/BaseSearchOption';

//탭 패널 공통
function TabPanel(props) {

  const { panelVisible } = useSelector(state => state.main)

  const { children, value, index, name, close, ...other } = props;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (value === index) {
      setVisible(true);
    }else{
      setVisible(false);
    }

  }, [value, index]);


  return (
      visible && (
          <div hidden={value !== index || value === -1} {...other}  className={`panel panel-left ${!panelVisible ? 'fold' : ''}`}>
            <div className="panel-header">
              <h1 className="panel-title">
                {name}
              </h1>
              <IconButton className="panel-close-btn" color={"primary"} onClick={close}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 17L9 9M9 9L17 17M9 9L17 1M9 9L1 1" stroke="#ffffffe6" strokeWidth="1.5"
                        strokeLinecap="round"/>
                </svg>
              </IconButton>
            </div>

            {children}

            {
              /*


              */
            }

          </div>
      )
  );
}

export default function Sidebar() {

  const dispatch = useDispatch()
  const {panelVisible, panelSide, mainSearchOn} = useSelector(state => state.main)

  const INDEX_0 = useMemo(() => { return {i:0, name:'홍수'}}, []);
  const INDEX_1 = useMemo(() => { return {i:1, name:'가뭄'}}, []);
  const INDEX_2 = useMemo(() => { return {i:2, name:'안전'}}, []);
  const INDEX_3 = useMemo(() => { return {i:3, name:'환경'}}, []);


  //const INDEX_4 = useMemo(() => 4, []); //수변피복탐지
  const INDEX_5 = useMemo(() => { return {i:5, name:''}}, []);


  const NONE_INDEX = useMemo(() => -1, []); //none

  const [value, setValue] = useState(NONE_INDEX);


  //탭 선택
  const handleChange = useCallback((newValue) => {

    if (value === newValue) {
      dispatch({type: SET_PANEL_VISIBLE, panelVisible: false})
      setValue(NONE_INDEX)
    } else {
      dispatch({type: SET_PANEL_VISIBLE, panelVisible: true})
      setValue(newValue)
    }
  }, [value]);

  useEffect(()=>{
    //처음검색이 아니고 탭이 없을경우 홍수를 default 로 표출
    if(mainSearchOn !== 0 && value === -1){
      setValue(0)
    }
  },[mainSearchOn])



  //탭 닫기
  const handleClose = () => {
      setValue(NONE_INDEX);
  };

  //fold btn
  const foldingHandler = () => {
    dispatch({type: SET_PANEL_VISIBLE, panelVisible: !panelVisible})
  };

  return (
    <>
        {/*<div className={`title-logo ${value === -1 ? '' : panelVisible ? 'open' : ''}`}>*/}
        <div className="sidebar-left">
            {/** 공통 검색 조건 240222 */}
            <BaseSearchOption/>

            <div className="sidebar-left-main">

                <div className={value === INDEX_0.i ? "sidebar-tab active" : "sidebar-tab"} onClick={() => {
                    handleChange(INDEX_0.i)
                }}>
                    <div className="tab-icon i-flood"></div>
                    {INDEX_0.name}</div>
                <div className={value === INDEX_1.i ? "sidebar-tab active" : "sidebar-tab"} onClick={() => {
                    handleChange(INDEX_1.i)
                }}>
                    <div className="tab-icon i-drought"></div>
                    {INDEX_1.name}</div>
                <div className={value === INDEX_2.i ? "sidebar-tab active" : "sidebar-tab"} onClick={() => {
                    handleChange(INDEX_2.i)
                }}>
                    <div className="tab-icon i-safety"></div>
                    {INDEX_2.name}</div>
                <div className={value === INDEX_3.i ? "sidebar-tab active" : "sidebar-tab"} onClick={() => {
                    handleChange(INDEX_3.i)
                }}>
                    <div className="tab-icon i-environment"></div>
                    {INDEX_3.name}</div>
            </div>



            <div className='panel-wrap'>
              {
                value === 0  &&
                <Flood/>
              }
              {
                value === 1  &&
                <Drought/>
              }
              {
                value === 2  &&
                <Safety/>
              }
              {
                value === 3  &&
                <Environment/>
              }

              {/* 관리자 페이지 */}
              {/* <TabPanel value={value} index={INDEX_5.i} name={INDEX_5.name} close={handleClose}>
                  <Admin/>
              </TabPanel> */}
            </div>


              {/* <div
                  className={`folding-btn-wrap ${panelSide ? 'side-panel-pos' : ''} ${!panelVisible ? 'folding-off' : ''}`}
                  style={{display: value === -1 ? 'none' : ''}}>
                  <IconButton className="folding-btn map-basic-style " disableRipple={true} onClick={() => {
                      foldingHandler()
                  }}/>
              </div> */}

            {/*<div className="sidebar-left-footer">
                 <div className={ value === INDEX_4 ? "sidebar-tab active" : "sidebar-tab" }><div className="tab-icon i-modify"></div></div>
                 <div className={ value === INDEX_5 ? "sidebar-tab active" : "sidebar-tab" }><div className="tab-icon i-user"></div></div>
                 <div className={ value === INDEX_5.i ? "sidebar-tab active" : "sidebar-tab" } onClick={() => { handleChange(INDEX_5.i) }} ><div className="tab-icon i-user"></div>{INDEX_5.name}</div>
            </div>*/}
        </div>


    </>
  );
};
