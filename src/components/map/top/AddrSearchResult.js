import React, { useEffect, useRef, useState } from 'react';
import { G$SetZoomToPoint, G$Transfrom } from '../../../openlayers/util';
import EmptyMessage from '@com/grid/table/EmptyMessage';
//import Pagination from '@cmp/util/Pagination';

const AddrSearchResult = ({result}) => {

    const [addrResult, setAddrResult] = useState([])

    useEffect(()=>{
        setAddrResult(result)
    },[result])


    const addrComponent = (obj, i) => {
      const handleClick = () => {
        goToPlace(obj.point);
      };
  
      return (
        <div key={i} onClick={handleClick}>
          {obj.address.parcel}
        </div>
      );
    };

    const goToPlace = (point) =>{
        //G$Transfrom = (point, to, from)=>{
        let p = G$Transfrom([point.x, point.y], 4326, 3857)
        G$SetZoomToPoint(18, [p[0], p[1]])
    }

    return (
        <>
            <div>
                {(addrResult.length > 0 && addrResult.map((obj, i)=>{
                    return addrComponent(obj, i)
                }))}
                {
                  addrResult.length === 0 && <EmptyMessage message={'데이터가 존재하지 않습니다.'}/>
                }
            </div>
            {/* <Pagination 
              total={10}
              limit={5}
              page={0}
            /> */}
        </>
    )
}

export default React.memo(AddrSearchResult);
