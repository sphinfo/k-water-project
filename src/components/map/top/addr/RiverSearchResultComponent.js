import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { memo } from 'react';
import { useImperativeHandle } from 'react';
import { G$flyToExtent, G$flyToPoint, G$getWmsLayerForId, G$multiPolygonToExtent, G$pointsToExtent, G$polygonToCentroid } from '@gis/util';
import BaseWmsImageLayer from '@gis/layers/BaseWmsImageLayer';

const RiverSearchResultComponent = ({type, addrSearchText}, ref) => {

  const riverLayer = useRef({id:'riverLayer'})

    useEffect(()=>{
      riverLayer.current = new BaseWmsImageLayer('','',null,false) // 하천 클릭 레이어
    },[])


    const [result, setResult] = useState([])
    const [total, setTotal] = useState(0)

    // const [totalPages, setTotalPages] = useState(0)
    // const [currentPage, setCurrentPage] = useState(1);
    

    /* 결과 컴포넌트 */
    const resultComponent = (obj, i) => {

      let layerId = ''
      let cqlFilter = ''
      let type = ''
      let title = ''

      //등급
      //하천명

      if(obj.id.indexOf('W_NATL') > -1){
        layerId = 'W_NATL'
        cqlFilter = `NAME2 = '${obj.properties.NAME2}'`
        type = obj.properties.NAME2
        title = '국가하천'
      }else if(obj.id.indexOf('W_FRST') > -1){
        layerId = 'W_FRST'
        cqlFilter = `NAME1 = '${obj.properties.NAME1}'`
        type = obj.properties.NAME1
        title = '구지방1급하천'
      }else if(obj.id.indexOf('W_SCND') > -1){
        layerId = 'W_SCND'
        cqlFilter = `RIV_NAM_1 = '${obj.properties.RIV_NAM_1}'`
        type = obj.properties.RIV_NAM_1
        title = '구지방1급하천'
      }
      
      obj.layerId = layerId
      obj.cqlFilter = cqlFilter

      //하천이동 click handle
      const handleClick = () => {
        goToPlace(obj);
      };

      return (
        <div key={i} onClick={handleClick} style={{color:'black'}}>
          <ul style={{border: '1px solid #000', padding: 10, listStyle: 'none'}}>
            <dt>
              {'등급'} : {title}
            </dt>
            <dt>
              {'하천명'} : {type}
            </dt>
          </ul>
        </div>
      );
    };

    //이동
    const goToPlace = (obj) =>{

      riverLayer.current.changeParameters({store:'river_network', layerId:obj.layerId, cqlFilter:obj.cqlFilter})
      let extent = G$multiPolygonToExtent(obj.geometry.coordinates)
      G$flyToExtent(extent)
      riverLayer.current.setVisible(true)
    }


    // 레퍼런스 API
		useImperativeHandle(ref, () => ({

      set provider (datas) {
        if(datas){
          setTotal(datas.length)
          setResult(datas)
          riverLayer.current.setVisible(false)
        }else{
          setTotal(0)
          setResult([])
          riverLayer.current.setVisible(false)
        }
      }

		}))

    return (
        <>
            <div style={{overflow: 'auto', height: 460}}>
                { result.length > 0 && <><h3 style={{color:'black'}}>총 : {total}개</h3></> }
                
                {(result.length > 0 && result.map((obj, i)=>{
                    return resultComponent(obj, i)
                }))}

                {/* { totalPages > 1 && (
                  <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                )} */}
                
                {/* { result.length === 0 && <EmptyMessage message={'데이터가 존재하지 않습니다.'}/> } */}

            </div>
        </>
    )
}

export default memo(forwardRef(RiverSearchResultComponent));
