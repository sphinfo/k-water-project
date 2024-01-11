import React, { forwardRef, useRef, useState } from 'react';
import { memo } from 'react';
import { useImperativeHandle } from 'react';
import { G$flyToPoint } from '@gis/util';

const AddrSearchResultComponent = ({type, addrSearchText, addPlace}, ref) => {

  const [result, setResult] = useState([])

  /* 주소 컴포넌트 */
  const addrComponent = (obj, i) => {
    const {road, parcel} = obj.address
    

    //주소이동 click handle
    const handleClick = () => {
      goToPlace({x:obj.point.x, y:obj.point.y})
    };

    return (
      <div className={"address-bed-list-item"} key={i} onClick={handleClick}>
        <dl className={"address-item-wrap"}>
          <dt className={"address-item-title"}>
            {obj.title}
          </dt>
          <dd className={"address-item-sub"}>
          <span className={"road-tag"}>구분</span>{obj.category}
          </dd>
          <dd className={"address-item-sub"} style={{display: parcel ? '' : 'none'}}>
            <span className={"road-tag"}>주소</span>{parcel}
          </dd>
          <dd className={"address-item-sub"} style={{display: road ? '' : 'none'}}>
            <span className={"road-tag"}>도로명</span>{road}
          </dd>
        </dl>
        
      </div>
    );
  };

  //주소 이동
  const goToPlace = (point) =>{
      G$flyToPoint([Number(point.x), Number(point.y)], 4000)
  }

  const removeDuplicates = (array, comparer)=>{
    return array.filter((item, index, self) =>
        index === self.findIndex((t) => comparer(t, item))
    )
  }

  const comparer = (a, b)=> {
    return a.address.parcel === b.address.parcel
  }


  // 레퍼런스 API
  useImperativeHandle(ref, () => ({

    set provider (datas) {
      if(datas){
        if(datas)
          //setTotal(datas.response.record.total)
          if(!datas.response.result){
            setResult([])
          }else{

            let uniqueArray = []
            if(datas.response.result.items.length > 0 ){
              uniqueArray = removeDuplicates(datas.response.result.items, comparer)
            }

            setResult(uniqueArray)
          }
          
      }else{
        //setTotal(0)
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
              
              {/* { result.length === 0 && <EmptyMessage message={'데이터가 존재하지 않습니다.'}/> } */}
              { result.length === 0 && 
                <>
                  <dl style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
                    <dt>
                      {'데이터가 존재하지 않습니다.'}
                    </dt>
                  </dl>
                </>
               }

          </div>
      </>
  )
}

export default memo(forwardRef(AddrSearchResultComponent));
