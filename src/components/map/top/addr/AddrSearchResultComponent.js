import React, { forwardRef, useRef, useState } from 'react';
import { memo } from 'react';
import { useImperativeHandle } from 'react';
import Pagination from '@common/util/Pagination';
import { G$flyToPoint } from '@gis/util';
import VWorldAddressSearch from '@biz/addr/VWorldAddressSearch';
import EmptyMessage from '@common/util/EmptyMessage';

const AddrSearchResultComponent = ({type, addrSearchText, addPlace}, ref) => {

  

  const searchAddr = useRef(new VWorldAddressSearch())  

  const [result, setResult] = useState([])
  const [total, setTotal] = useState(0)

  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  

  /* 주소 컴포넌트 */
  const addrComponent = (obj, i) => {
    console.info(obj)
    let juso = obj.JUSO
    let bldNm = obj.BLD_NM
    

    //주소이동 click handle
    const handleClick = () => {
      goToPlace(obj);
      addPlace(Number(obj.xpos), Number(obj.ypos))
    };

    return (
      <div className={"address-bed-list-item"} key={i} onClick={handleClick}>
        <dl className={"address-item-wrap"}>
          <dt className={"address-item-title"}>
            {juso} {bldNm ? bldNm : ''}
          </dt>
          <dd className={"address-item-sub"}>
            도로명주소
          </dd>
          <dd className={"address-item-sub"}>
            도로명주소2
          </dd>
        </dl>
        
      </div>
    );
  };

  //주소 이동
  const goToPlace = (point) =>{

      G$flyToPoint([Number(point.xpos), Number(point.ypos)], 4000)


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
        setTotalPages(0)
        setCurrentPage(0)
        setResult([])
      }
    }

  }));

  //paging change
  const handlePageChange = async (page) => {
    setCurrentPage(page);
    console.info(addrSearchText)
    searchAddr.current.searchAddress(addrSearchText, page, type).then((result)=>{
      setResult(result[type].LIST)
    }).catch((error)=>{
        console.info(error)
    })
  };

  return (
      <>
          <div className={"address-bed-list"}>
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
              
              { result.length === 0 && <EmptyMessage message={'데이터가 존재하지 않습니다.'}/> }

          </div>
      </>
  )
}

export default memo(forwardRef(AddrSearchResultComponent));
