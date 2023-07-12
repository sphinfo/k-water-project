import React, { memo, useEffect, useRef, useState } from 'react';
import AddrSearchResultComponent from './component/AddrSearchResultComponent';
//import Pagination from '@cmp/util/Pagination';

const AddrSearchResult = ({result, addrSearchText}) => {

    // 선택된 탭의 인덱스를 저장하는 state
    const [selectedTab, setSelectedTab] = useState(0); 

    const addrRef = useRef({type:'addr'})
    const roadRef = useRef({type:'addr'})

    useEffect(()=>{
      addrRef.current.provider = result.addr
      roadRef.current.provider = result.road
    },[result])

    const changeTab = (tabIndex) => {
      setSelectedTab(tabIndex);
    };

    return (
        <>
          <div style={{ display: !result.addr && !result.road ? 'block' : 'none' }}>
            {/* 탭 버튼 */}
            <button onClick={() => changeTab(0)}>주소</button>
            <button onClick={() => changeTab(1)}>도로명</button>
          </div>
          
          {/* 주소 */}
          <div style={{ display: selectedTab === 0 ? 'block' : 'none' }}>
            <AddrSearchResultComponent ref={addrRef} type={'addr'} addrSearchText={addrSearchText}/>
          </div>
          
          {/* 도로명 */}
          <div style={{ display: selectedTab === 1 ? 'block' : 'none' }}>
            <AddrSearchResultComponent ref={roadRef} type={'road'} addrSearchText={addrSearchText}/>
          </div>
          
          
        </>
    )
}

export default memo(AddrSearchResult);
