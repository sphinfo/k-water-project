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
    <div>
      
      <div className="sidebar-left" >
        <div className="sidebar-left-main">
          <div className="logo"><svg width="40" height="19" viewBox="0 0 40 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.488281 10.6302H2.01434V13.8237H2.03771L4.62232 10.6302H6.22852L3.35005 13.9412L6.52905 17.9775H4.66573L2.03437 14.4214H2.011V17.9775H0.488281V10.6302Z" fill="white"/>
            <path d="M15.361 12.9437C15.3476 13.0008 14.5295 16.6677 14.5295 16.6677C14.5295 16.6677 13.2906 12.9941 13.2739 12.9437H12.5894C12.5727 12.9975 11.444 16.7315 11.444 16.7315C11.444 16.7315 10.5123 12.9975 10.499 12.9437H9.27344C9.30015 13.0377 10.6592 17.9236 10.6726 17.9773H11.8247C11.8414 17.9269 12.8832 14.7604 12.8832 14.7604C12.8832 14.7604 14.0419 17.9269 14.0586 17.9773H15.224C15.2374 17.9202 16.4295 13.0344 16.4496 12.9437H15.3543H15.361Z" fill="white"/>
            <path d="M20.3799 17.1879V17.9736H21.7257V14.5552C21.7257 13.6553 21.4752 12.8225 19.652 12.8225C18.206 12.8225 17.4313 13.3631 17.4146 14.3873H18.8539V14.3437C18.8772 13.9877 18.9173 13.249 19.6386 13.249C20.1595 13.249 20.3799 13.5579 20.3799 14.2832V15.1764H20.3432C19.5685 15.21 17.2109 15.3007 17.2109 16.8453C17.2109 17.5505 17.8654 18.0844 18.7337 18.0844C19.859 18.0844 20.3799 17.1778 20.3799 17.1778V17.1879ZM19.288 17.4263C18.8672 17.4263 18.6034 17.1375 18.6034 16.6707C18.6034 16.073 19.1878 15.7171 20.3399 15.613H20.3799V16.026C20.3799 16.7211 20.0059 17.4263 19.288 17.4263Z" fill="white"/>
            <path d="M25.3541 18.0916C25.668 18.0916 25.9786 18.0614 26.3092 18.0312H26.3159V17.363C26.1155 17.4167 25.8951 17.4268 25.7181 17.4268C25.1471 17.4268 24.9534 17.2051 24.9534 16.5503V13.4879H26.5262V12.9405H24.9534V10.9795C24.8533 11.0366 23.6444 11.7015 23.6077 11.7216V12.9372H22.5625V13.4845H23.6077V16.7082C23.6077 17.8566 24.2756 18.0883 25.3541 18.0883V18.0916Z" fill="white"/>
            <path d="M29.6956 18.0911C30.4937 18.0911 30.841 17.9904 31.4654 17.7486V17.2886C31.1683 17.3893 30.7909 17.5001 30.4102 17.5001C28.7673 17.5001 28.2364 15.7473 28.2364 14.8977V14.8608H31.569V14.7063C31.569 13.4907 30.7776 12.8225 29.3417 12.8225C27.7154 12.8225 26.8906 13.6284 26.8906 15.2201C26.8906 17.8091 28.8508 18.0911 29.6923 18.0911H29.6956ZM28.2397 14.3571C28.2898 14.0247 28.4901 13.2523 29.2983 13.2523C30.2466 13.2523 30.2767 14.2496 30.2767 14.3638V14.4007H28.2364L28.243 14.3571H28.2397Z" fill="white"/>
            <path d="M35.9271 14.0924V12.8298C34.9454 12.9071 34.4612 13.5384 34.0638 14.22L34.0137 14.3006V12.944H32.668V17.9776H34.0137V15.7278C34.0137 14.5625 34.5513 14.0991 35.9271 14.0924V14.0924Z" fill="white"/>
            <path d="M9.27734 10.5762C13.1409 8.16854 17.6957 6.77835 22.5644 6.77835C27.4331 6.77835 32.0513 8.18869 35.9349 10.6299V7.27868C31.9979 5.13631 27.4998 3.91065 22.7247 3.88379C17.6456 4.87439 13.034 7.20817 9.27734 10.5023V10.5762V10.5762Z" fill="url(#paint0_linear_796_47228)"/>
            <path d="M9.27734 7.23485V10.5055C13.034 7.21134 17.6423 4.87756 22.7247 3.88696C22.6712 3.88696 22.6178 3.88696 22.5644 3.88696C17.7625 3.88696 13.2377 5.10254 9.27734 7.23821V7.23485Z" fill="white"/>
            <path d="M28.2278 0.455322C21.3055 0.455322 14.7237 2.66822 9.27734 6.75821V7.23168C13.2377 5.09266 17.7625 3.88044 22.5644 3.88044C22.6178 3.88044 22.6712 3.88044 22.7247 3.88044C24.5078 3.53121 26.3478 3.34988 28.2278 3.34988C32.1448 3.34988 35.8781 4.139 39.2875 5.56613V2.45331C35.8414 1.16049 32.1147 0.455322 28.2278 0.455322Z" fill="url(#paint1_linear_796_47228)"/>
            <defs>
              <linearGradient id="paint0_linear_796_47228" x1="8.87893" y1="8.02939" x2="35.9035" y2="8.02939" gradientUnits="userSpaceOnUse">
                <stop offset="0.4" stopColor="#00B9EF"/>
                <stop offset="1" stopColor="#4694D1"/>
              </linearGradient>
              <linearGradient id="paint1_linear_796_47228" x1="8.87893" y1="4.56872" x2="39.302" y2="4.56872" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ED6C00"/>
                <stop offset="1" stopColor="#FDD000"/>
              </linearGradient>
            </defs>
          </svg>
          </div>
          <div className={ value === INDEX_0 ? "sidebar-tab active" : "sidebar-tab" } onClick={() => { handleChange(INDEX_0) }}><div className="tab-icon i-safety"></div>안전</div>
          <div className={ value === INDEX_1 ? "sidebar-tab active" : "sidebar-tab" } onClick={() => { handleChange(INDEX_1) }} ><div className="tab-icon i-drought"></div>가뭄</div>
          <div className={ value === INDEX_2 ? "sidebar-tab active" : "sidebar-tab" } onClick={() => { handleChange(INDEX_2) }} ><div className="tab-icon i-flood"></div>홍수</div>
          <div className={ value === INDEX_3 ? "sidebar-tab active" : "sidebar-tab" } onClick={() => { handleChange(INDEX_3) }} ><div className="tab-icon i-environment"></div>환경</div>
        </div>
        <div className="sidebar-left-footer">
          <div className={ value === INDEX_4 ? "sidebar-tab active" : "sidebar-tab" }><div className="tab-icon i-modify"></div></div>
          <div className={ value === INDEX_5 ? "sidebar-tab active" : "sidebar-tab" }><div className="tab-icon i-user"></div></div>
        </div>
      </div>

      <div>
        <TabPanel value={value} index={INDEX_0} >
          <div>
            {/* <button className="close-btn" onClick={handleClose} >close</button> */}
            <Biz0 />
          </div>
        </TabPanel>
        <TabPanel value={value} index={INDEX_1} >
          <div>
            <Biz1 />
          </div>
        </TabPanel>
        <TabPanel value={value} index={INDEX_2} >
          <div>
            <Biz2 />
          </div>
        </TabPanel>
        <TabPanel value={value} index={INDEX_3} >
          <div>
            <Biz3 />
          </div>
        </TabPanel>
      </div>      

    </div>
  );
};