import { Box, Drawer, Tab, Tabs } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import WaterDetection from '../biz/water-detection/WaterDetection';
import WaterLevel from '../biz/water-level/WaterLevel';
import SoilMoisture from '../biz/soil-moisture/SoilMoisture';
import DroughtIndex from '../biz/droughth-index/DroughtIndex';
import WatersideCover from '../biz/waterside-cover/WatersideCover';
import TimeSeries from '../biz/time-series/TimeSeries';
import SafetyDiagnsis from '../biz/safety-diagnsis/SafetyDiagnsis';
import SuspendedSolids from '../biz/suspended-solids/SuspendedSolids';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    //남기고 싶을시
    // if (!visible && value === index) {
    //     setVisible(true);
    // }
    // component 새로 그릴시
    if (value === index) {
      setVisible(true);
    }else{
      setVisible(false);
    }

  }, [value, index]);

  return (
      <div hidden={value !== index} {...other} >
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
  const INDEX_99 = useMemo(() => 99, []); //

  const [value, setValue] = useState(null);

  const handleChange = useCallback((event, newValue) => {
    if (value === newValue) {
      setValue(null)
    } else {
      setValue(newValue)
    }
  }, [value]);
  
  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%' }} >
      <Tabs value={value} onChange={handleChange} orientation="vertical"variant="scrollable" aria-label="Vertical tabs example" sx={{ borderRight: 1, borderColor: 'divider' }} >
        <Tab label="수체탐지" {...a11yProps(0)}/>
        <Tab label="수위탐지" {...a11yProps(1)}/>
        <Tab label="토양수분" {...a11yProps(2)}/>
        <Tab label="가뭄지수" {...a11yProps(3)}/>
        <Tab label="수변피복탐지" {...a11yProps(4)}/>
        <Tab label="부유물탐지" {...a11yProps(5)}/>
        <Tab label="시계열 변위 모니터링" {...a11yProps(6)}/>
        <Tab label="안전진단지수" {...a11yProps(7)}/>
      </Tabs>

      <Drawer
        variant={'persistent'}
        anchor={'left'}
        open={value === INDEX_0}
        PaperProps={{ style: { marginLeft: 170} }}
        >
        <TabPanel value={value} index={INDEX_0}>
          <WaterDetection />
        </TabPanel>
      </Drawer>

      <Drawer
        variant={'persistent'}
        anchor={'left'}
        open={value === INDEX_1}
        PaperProps={{ style: { marginLeft: 170} }}
        >
        <TabPanel value={value} index={INDEX_1}>
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
          <WatersideCover />
        </TabPanel>
      </Drawer>

      <Drawer
        variant={'persistent'}
        anchor={'left'}
        open={value === INDEX_5}
        PaperProps={{ style: { marginLeft: 170} }}
        >
        <TabPanel value={value} index={INDEX_5}>
          <SuspendedSolids />
        </TabPanel>
      </Drawer>

      <Drawer
        variant={'persistent'}
        anchor={'left'}
        open={value === INDEX_6}
        PaperProps={{ style: { marginLeft: 170} }}
        >
        <TabPanel value={value} index={INDEX_6}>
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
          <SafetyDiagnsis />
        </TabPanel>
      </Drawer>

    </Box>
  );
};