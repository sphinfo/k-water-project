import React, { forwardRef, useRef, useState } from 'react';
import { memo } from 'react';
import { useImperativeHandle } from 'react';
import { G$SetZoomToPoint, G$Transfrom, G$createFeature, G$getLayerForName } from '@gis/util';
import Pagination from '@cmp/util/Pagination';
import VWorldAddressSearch from 'vworld/VWorldAddressSearch';
import { Point } from 'ol/geom';
import { Feature } from 'ol';

const AddrSearchResultComponent = ({type, addrSearchText}, ref) => {

    const searchAddr = useRef(new VWorldAddressSearch())  

    const [result, setResult] = useState([])
    const [total, setTotal] = useState(0)

    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    

    /* 주소 컴포넌트 */
    const addrComponent = (obj, i) => {
      let title = obj.JUSO
      

      //주소이동 click handle
      const handleClick = () => {
        goToPlace(obj);
      };
  
      return (
        <div key={i} onClick={handleClick}>
          {title}
        </div>
      );
    };

    //주소 이동
    const goToPlace = (point) =>{
        let p = G$Transfrom([point.xpos, point.ypos], 4326, 3857)
        G$SetZoomToPoint(18, [p[0], p[1]])

        let layer = G$getLayerForName('PIN_LAYER')
        let features = []
        if(layer){

          let feature = new Feature({
            geometry: new Point(p)
          })

          features.push(feature)
          layer.getSource().clear()
          layer.getSource().addFeatures(features)
        }
    }


    // 레퍼런스 API
		useImperativeHandle(ref, () => ({

      set provider (datas) {
        if(datas){
            setTotal(datas.paginationInfo.totalRecordCount)
            setTotalPages(datas.paginationInfo.totalPageCount)
            setCurrentPage(datas.paginationInfo.currentPageNo)
            setResult(datas.LIST)
        }else{
          setTotal(0)
          setResult([])
        }
      }

		}));

    //paging change
    const handlePageChange = async (page) => {
      setCurrentPage(page);
      searchAddr.current.searchAddress(addrSearchText, page, type).then((result)=>{
        setResult(result[type].LIST)
      }).catch((error)=>{
          console.info(error)
      })
    };

    return (
        <>
            <div>
                { result.length > 0 && <><h3>총 : {total}개</h3></> }
                
                {(result.length > 0 && result.map((obj, i)=>{
                    return addrComponent(obj, i)
                }))}

                { totalPages > 1 && (
                  <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                )}
                
                {/* { result.length === 0 && <EmptyMessage message={'데이터가 존재하지 않습니다.'}/> } */}

            </div>
        </>
    )
}

export default memo(forwardRef(AddrSearchResultComponent));
