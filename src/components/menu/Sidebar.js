import { Drawer, Tab, Tabs } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import WaterLevel from '@cmp/biz/water-level/WaterLevel';
import SoilMoisture from '@cmp/biz/soil-moisture/SoilMoisture';
import DroughtIndex from '@cmp/biz/droughth-index/DroughtIndex';
import TimeSeries from '@cmp/biz/time-series/TimeSeries';
import SafetyDiagnsis from '@cmp/biz/safety-diagnsis/SafetyDiagnsis';
import GArbage from '@cmp/biz/gArbage/GArbage';
import LandCover from '@cmp/biz/landCover/LandCover';
import WaterBody from '@cmp/biz/water-body/WaterBody';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (value === index) {
      setVisible(true);
    }else{
      setVisible(false);
    }

  }, [value, index]);

  return (
      <div hidden={value !== index || value === -1} {...other} >
          {visible && (
            <>
              {children}
            </>
          )}
      </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Sidebar () {

  const INDEX_0 = useMemo(() => 0, []); //수체탐지
  const INDEX_1 = useMemo(() => 1, []); //수위탐지
  const INDEX_2 = useMemo(() => 2, []); //토양수분
  const INDEX_3 = useMemo(() => 3, []); //가뭄지수
  const INDEX_4 = useMemo(() => 4, []); //수변피복탐지
  const INDEX_5 = useMemo(() => 5, []); //부유물탐지
  const INDEX_6 = useMemo(() => 6, []); //시계열 변위 모니터링
  const INDEX_7 = useMemo(() => 7, []); //안전진단지수
  
  const NONE_INDEX = useMemo(() => -1, []); //none

  const [value, setValue] = useState(NONE_INDEX);

  const handleChange = useCallback((event, newValue) => {
    if (value === newValue) {
      setValue(NONE_INDEX)
    } else {
      setValue(newValue)
    }
  }, [value]);

  //같은 탭을 선택시 닫기
  const handleClick = useCallback((newValue) =>{
    if (value === newValue) {
      setValue(NONE_INDEX)
    }
  }, [value])

  const handleClose = () => {
      setValue(NONE_INDEX);
  };

  return (
    <div style={{display: 'flex', height: '100%'}}>
      <Tabs value={value === NONE_INDEX ? false : value} onChange={handleChange} onClick={handleClick}  orientation="vertical"variant="scrollable" aria-label="Vertical tabs example" sx={{ borderRight: 1, borderColor: 'divider' }} >
        <Tab label="수체탐지" onClick={()=>{handleClick(INDEX_0)}} {...a11yProps(INDEX_0)} style={{backgroundColor:'rgba(255, 255, 255, 0.85)'}}/>
        <Tab label="수위탐지" onClick={()=>{handleClick(INDEX_1)}} {...a11yProps(INDEX_1)} style={{backgroundColor:'rgba(255, 255, 255, 0.85)'}}/>
        <Tab label="토양수분" onClick={()=>{handleClick(INDEX_2)}} {...a11yProps(INDEX_2)} style={{backgroundColor:'rgba(255, 255, 255, 0.85)'}}/>
        <Tab label="가뭄지수" onClick={()=>{handleClick(INDEX_3)}} {...a11yProps(INDEX_3)} style={{backgroundColor:'rgba(255, 255, 255, 0.85)'}}/>
        <Tab label="수변피복탐지" onClick={()=>{handleClick(INDEX_4)}} {...a11yProps(INDEX_4)} style={{backgroundColor:'rgba(255, 255, 255, 0.85)'}}/>
        <Tab label="부유물탐지" onClick={()=>{handleClick(INDEX_5)}} {...a11yProps(INDEX_5)} style={{backgroundColor:'rgba(255, 255, 255, 0.85)'}}/>
        <Tab label="시계열 변위 모니터링" onClick={()=>{handleClick(INDEX_6)}} {...a11yProps(INDEX_6)} style={{backgroundColor:'rgba(255, 255, 255, 0.85)'}}/>
        <Tab label="안전진단지수" onClick={()=>{handleClick(INDEX_7)}} {...a11yProps(INDEX_7)} style={{backgroundColor:'rgba(255, 255, 255, 0.85)'}}/>
      </Tabs>

      <Drawer
        variant={'persistent'}
        anchor={'left'}
        open={value === INDEX_0}
        PaperProps={{ style: { marginLeft: 153} }}
        >
        <TabPanel value={value} index={INDEX_0} >
          <button style={{ zIndex: 999 }} onClick={handleClose} >close</button>
          {/* WaterBody */}
          <WaterBody />
        </TabPanel>
      </Drawer>

      <Drawer
        variant={'persistent'}
        anchor={'left'}
        open={value === INDEX_1}
        PaperProps={{ style: { marginLeft: 170} }}
        >
        <TabPanel value={value} index={INDEX_1}>
          <button style={{ zIndex: 999 }} onClick={handleClose} >close</button>
          <WaterLevel />
        </TabPanel>
      </Drawer>

      <Drawer
        variant={'persistent'}
        anchor={'left'}
        open={value === INDEX_2}
        PaperProps={{ style: { marginLeft: 170} }}
        >
        <TabPanel value={value} index={INDEX_2}>
          <button style={{ zIndex: 999 }} onClick={handleClose} >close</button>
          <SoilMoisture />
        </TabPanel>
      </Drawer>

      <Drawer
        variant={'persistent'}
        anchor={'left'}
        open={value === INDEX_3}
        PaperProps={{ style: { marginLeft: 170} }}
        >
        <TabPanel value={value} index={INDEX_3}>
          <button style={{ zIndex: 999 }} onClick={handleClose} >close</button>
          <DroughtIndex />
        </TabPanel>
      </Drawer>

      <Drawer
        variant={'persistent'}
        anchor={'left'}
        open={value === INDEX_4}
        PaperProps={{ style: { marginLeft: 170} }}
        >
        <TabPanel value={value} index={INDEX_4}>
          <button style={{ zIndex: 999 }} onClick={handleClose} >close</button>
          {/* LandCover */}
          <LandCover />
        </TabPanel>
      </Drawer>

      <Drawer
        variant={'persistent'}
        anchor={'left'}
        open={value === INDEX_5}
        PaperProps={{ style: { marginLeft: 170} }}
        >
        <TabPanel value={value} index={INDEX_5}>
          <button style={{ zIndex: 999 }} onClick={handleClose} >close</button>
          {/* GArbage */}
          <GArbage />
        </TabPanel>
      </Drawer>

      <Drawer
        variant={'persistent'}
        anchor={'left'}
        open={value === INDEX_6}
        PaperProps={{ style: { marginLeft: 170} }}
        >
        <TabPanel value={value} index={INDEX_6}>
          <button style={{ zIndex: 999 }} onClick={handleClose} >close</button>
          <TimeSeries />
        </TabPanel>
      </Drawer>

      <Drawer
        variant={'persistent'}
        anchor={'left'}
        open={value === INDEX_7}
        PaperProps={{ style: { marginLeft: 170} }}
        >
        <TabPanel value={value} index={INDEX_7}>
          <button style={{ zIndex: 999 }} onClick={handleClose} >close</button>
          <SafetyDiagnsis />
        </TabPanel>
      </Drawer>

    </div>
  );
};