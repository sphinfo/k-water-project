import React, { forwardRef, useRef, useState } from 'react';
import { memo } from 'react';
import { useImperativeHandle } from 'react';
import Pagination from '@common/util/Pagination';
import { G$flyToPoint } from '@gis/util';
import VWorldAddressSearch from '@biz/addr/VWorldAddressSearch';
import EmptyMessage from '@common/util/EmptyMessage';

const AddrSearchResultComponent = ({type, addrSearchText, addPlace}, ref) => {

  const [result, setResult] = useState([])
  const [total, setTotal] = useState(0)

  /* 주소 컴포넌트 */
  const addrComponent = (obj, i) => {
    const {road, parcel} = obj.address
    //let bldNm = obj.BLD_NM
    

    //주소이동 click handle
    const handleClick = () => {
      goToPlace({x:obj.point.x, y:obj.point.y})
      //addPlace(Number(obj.point.x), Number(obj.point.y))
    };

    return (
      <div className={"address-bed-list-item"} key={i} onClick={handleClick}>
        <dl className={"address-item-wrap"}>
          <dt className={"address-item-title"}>
            {obj.title}
          </dt>
          <dd className={"address-item-sub"}>
            {`주소 : ${parcel}`}
          </dd>
          <dd className={"address-item-sub"}>
          {`도로명주소 : ${road}`}
          </dd>
        </dl>
        
      </div>
    );
  };

  //주소 이동
  const goToPlace = (point) =>{
      G$flyToPoint([Number(point.x), Number(point.y)], 4000)
  }


  // 레퍼런스 API
  useImperativeHandle(ref, () => ({

    set provider (datas) {
      if(datas){
        if(datas)
          setTotal(datas.response.record.total)
          if(!datas.response.result){
            setResult([])
          }else{
            setResult(datas.response.result.items)
          }
          
      }else{
        setTotal(0)
        setResult([])
      }
    }

  }))

  return (
      <>
          <div className={"address-bed-list"}>
              {(result.length > 0 && result.map((obj, i)=>{
                  return addrComponent(obj, i)
              }))}
              
              { result.length === 0 && <EmptyMessage message={'데이터가 존재하지 않습니다.'}/> }

          </div>
      </>
  )
}

export default memo(forwardRef(AddrSearchResultComponent));
