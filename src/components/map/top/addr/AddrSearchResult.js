import React, { memo, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { G$addLayer } from '@gis/util';
import AddrSearchResultComponent from './AddrSearchResultComponent';
import RiverSearchResultComponent from './RiverSearchResultComponent';
import AddrEntityCollection from '@gis/layers/AddrEntityCollection';

//import Pagination from '@cmp/util/Pagination';

const AddrSearchResult = ({ addrSearchText}) => {

    const result = useSelector(state => state.main.addrResult)
    //const riverResult = useSelector(state => state.main.riverResult)


    //주소 지점 포인트 레이어
    const addrWfsLayer = useRef()
    useEffect(()=>{
      addrWfsLayer.current = new AddrEntityCollection({name:'addrPoint'})
      G$addLayer(addrWfsLayer.current)
    },[])

    //지점 포인트 추가
    const addPlace = (lng, lat) =>{
      addrWfsLayer.current.entities.removeAll()
      addrWfsLayer.current._addFeature(lng, lat)
    }

    // 선택된 탭의 인덱스를 저장하는 state
    const [selectedTab, setSelectedTab] = useState(0); 

    const addrRef = useRef({type:'addr'})
    // const roadRef = useRef({type:'addr'})
    // const riverRef = useRef({type:'river'})

    useEffect(()=>{
      addrRef.current.provider = result
      //addrRef.current.provider = result.addr
      //roadRef.current.provider = result.road
    },[result])

    // useEffect(()=>{

    //   if(riverResult.length > 0){
    //     riverRef.current.provider = riverResult
    //   }
      
    // },[riverResult])

    const changeTab = (tabIndex) => {
      setSelectedTab(tabIndex);
    };

    const reset = () =>{
      addrRef.current.provider = null
      //roadRef.current.provider = null
      //riverRef.current.provider = null
      addrWfsLayer.current.entities.removeAll()
    }

    return (
        <>

          <div>
            <AddrSearchResultComponent ref={addrRef} addrSearchText={addrSearchText} addPlace={addPlace}/>
          </div>
          {/* <div>
            <button onClick={reset}>초기화</button>
          </div>
          <div>
            <button style={{background: selectedTab === 0 ? 'gray' : ''}} onClick={() => changeTab(0)}>주소 {`(${result.addr ? result.addr.Jibun : 0})`} </button>
            <button style={{background: selectedTab === 1 ? 'gray' : ''}} onClick={() => changeTab(1)}>도로명 {`(${result.road ? result.road.Juso : 0})`} </button>
            <button style={{background: selectedTab === 2 ? 'gray' : ''}} onClick={() => changeTab(2)}>하천 {`(${riverResult.length})`}</button>
          </div> */}
          {/* 주소 */}
          {/* <div style={{ display: selectedTab === 0 ? 'block' : 'none' }}>
            <AddrSearchResultComponent ref={addrRef} type={'addr'} addrSearchText={addrSearchText} addPlace={addPlace}/>
          </div> */}
          
          {/* 도로명 */}
          {/* <div style={{ display: selectedTab === 1 ? 'block' : 'none' }}>
            <AddrSearchResultComponent ref={roadRef} type={'road'} addrSearchText={addrSearchText} addPlace={addPlace}/>
          </div> */}

          {/* 하천 */}
          {/* <div style={{ display: selectedTab === 2 ? 'block' : 'none' }}>
            <RiverSearchResultComponent ref={riverRef}  addrSearchText={addrSearchText}/>
          </div> */}
          
          
        </>
    )
}

export default memo(AddrSearchResult);
