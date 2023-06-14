import React, { useEffect, useRef, useState } from 'react';
import VWorldAddressSearch from '../../../vworld/VWorldAddressSearch ';
import TextInput from '../../util/TextInput';
import { G$SetZoomToPoint, G$Transfrom } from '../../../openlayers/util';

const AddrSearchResult = ({result}) => {

    const [addrResult, setAddrResult] = useState([])

    useEffect(()=>{
        console.info("?")
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
        G$SetZoomToPoint(20, [p[0], p[1]])
    }

    return (
        <>
            <div>
                {(addrResult.length > 0 && addrResult.map((obj, i)=>{
                    return addrComponent(obj, i)
                }))}
            </div>
        </>
    )
}

export default React.memo(AddrSearchResult);
