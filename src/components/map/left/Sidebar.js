import Biz0 from '@components/biz/Biz0';
import Biz1 from '@components/biz/Biz1';
import Biz2 from '@components/biz/Biz2';
import Biz3 from '@components/biz/Biz3';
import { Drawer, Tab, Tabs } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

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
  const INDEX_8 = useMemo(() => 8, []); //example widget
  const INDEX_9 = useMemo(() => 9, []); //example widget
  const INDEX_10 = useMemo(() => 10, []); //example widget
  
  const NONE_INDEX = useMemo(() => -1, []); //none

  const [value, setValue] = useState(NONE_INDEX);

  const handleChange = useCallback((newValue) => {
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
    <div style={{display: 'flex', height: '100%' , position: 'absolute'}}>
      
      <div style={{ borderRight: '1px solid #000', display: 'flex', flexDirection: 'column'  }} >
        <div className="tab" onClick={() => { handleChange(INDEX_0) }} style={{ backgroundColor: value === INDEX_0 ? 'rgba(255, 255, 255, 0.85)' : '' }} >안전</div>
        <div className="tab" onClick={() => { handleChange(INDEX_1) }} style={{ backgroundColor: value === INDEX_1 ? 'rgba(255, 255, 255, 0.85)' : '' }} >가뭄</div>
        <div className="tab" onClick={() => { handleChange(INDEX_2) }} style={{ backgroundColor: value === INDEX_2 ? 'rgba(255, 255, 255, 0.85)' : '' }} >홍수</div>
        <div className="tab" onClick={() => { handleChange(INDEX_3) }} style={{ backgroundColor: value === INDEX_3 ? 'rgba(255, 255, 255, 0.85)' : '' }} >환경</div>
      </div>

      {value}
      <div>
        <TabPanel value={value} index={INDEX_0} >
          <div>
            <button style={{ zIndex: 999 }} onClick={handleClose} >close</button>
            <Biz0 />
          </div>
        </TabPanel>
        <TabPanel value={value} index={INDEX_1} >
          <div>
            <button style={{ zIndex: 999 }} onClick={handleClose} >close</button>
            <Biz1 />
          </div>
        </TabPanel>
        <TabPanel value={value} index={INDEX_2} >
          <div>
            <button style={{ zIndex: 999 }} onClick={handleClose} >close</button>
            <Biz2 />
          </div>
        </TabPanel>
        <TabPanel value={value} index={INDEX_3} >
          <div>
            <button style={{ zIndex: 999 }} onClick={handleClose} >close</button>
            <Biz3 />
          </div>
        </TabPanel>
      </div>      

    </div>
  );
};