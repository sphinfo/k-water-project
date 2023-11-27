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
    //const addrWfsLayer = useRef()
    useEffect(()=>{
      //addrWfsLayer.current = new AddrEntityCollection({name:'addrPoint'})
      //G$addLayer(addrWfsLayer.current)
    },[])

    //지점 포인트 추가
    const addPlace = (lng, lat) =>{
      //addrWfsLayer.current.entities.removeAll()
      //addrWfsLayer.current._addFeature(lng, lat)
    }

    // 선택된 탭의 인덱스를 저장하는 state
    const [selectedTab, setSelectedTab] = useState(0); 

    const addrRef = useRef({type:'addr'})

    useEffect(()=>{
      addrRef.current.provider = result
    },[result])

    const reset = () =>{
      addrRef.current.provider = null
      //addrWfsLayer.current.entities.removeAll()
    }

    return (
        <>

          <div>
            <AddrSearchResultComponent ref={addrRef} addrSearchText={addrSearchText} addPlace={addPlace}/>
          </div>
          
          
        </>
    )
}

export default memo(AddrSearchResult);
