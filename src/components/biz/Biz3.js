import { G$addLayer, G$getLayerForId, G$removeLayerForId } from "@gis/util";
import React, { useEffect, useRef, useState } from "react";
import Switch from '@mui/material/Switch';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import BaseWmsImageLayer from "@gis/layers/BaseWmsImageLayer";

const Biz3 = () => {

    const gArbageLayer = useRef({id:''})
    const landCoverLayer = useRef({id:''})
    const landCoverOverLayer = useRef({id:''})
    

    useEffect(()=>{
      
      //부유물
      gArbageLayer.current = new BaseWmsImageLayer('Garbage', 'Chlorophyll_Map_2')
      landCoverLayer.current = new BaseWmsImageLayer('LandCover', 'RF_20220914_clip')
      landCoverOverLayer.current = new BaseWmsImageLayer('LandCover', 'clipped_cd')

      return()=>{

        if(gArbageLayer.current.layer){
          G$removeLayerForId(gArbageLayer.current.layer.id)
        }
          
        if(landCoverLayer.current.layer){
          G$removeLayerForId(landCoverLayer.current.layer.id)
        }

        if(landCoverOverLayer.current.layer){
          G$removeLayerForId(landCoverOverLayer.current.layer.id)
        }
          
      }

    },[])

    //부유물 / 수변피복 레이어탭
    const [layerTab, setlayerTab] = useState('gArbage');

    //레이어탭 change
    const handleSelcted = (event, newSelected) => {
      setlayerTab(newSelected);
    };

    //변화탐지
    const [landCoverSwitch, setLandCoverSwitch] = useState(true)
    const switchChange = (event, value) =>{
      setLandCoverSwitch(value)
    }

    //레이어탭 change action
    useEffect(()=>{
      console.info('changeTab')
      //부유물
      if(layerTab === 'gArbage'){
        gArbageLayer.current.setVisible(true)
        if(landCoverLayer.current.layer){
          landCoverLayer.current.layer.show = false //setVisible(false)
        }
        
      }else if(layerTab === 'landCover'){
        gArbageLayer.current.setVisible(false)
        landCoverLayer.current.setVisible(true)
        landCoverOverLayer.current.setVisible(landCoverSwitch ? true : false)
        
        //landCoverLayer.current.changeParameters({layerId:landCoverSwitch ? 'RF_20220914_clip' : 'RF_20221101_clip'})
        //landCoverLayer.current.changeParameters({layerId:landCoverSwitch ? 'RF_20220914_clip' : 'RF_20221101_clip'})
      }
    },[layerTab, landCoverSwitch])



    return (
      <div className="tab-float-box">
        <ToggleButtonGroup className="tab-float-box-button-wrap" value={layerTab} exclusive onChange={handleSelcted}>
            <ToggleButton className="tab-float-box-btn" value={'gArbage'}>부유물</ToggleButton>
            <ToggleButton className="tab-float-box-btn" value={'landCover'}>수변피복</ToggleButton>
        </ToggleButtonGroup>
        <div className="tab-float-box-button-wrap" style={{display: layerTab === 'landCover' ? '' : 'none'}}>
          <button className="tab-float-box-btn btn-round">
            변화탐지
            <Switch className="float-box-switch" value={landCoverSwitch} onChange={switchChange}/>
          </button>
        </div>
      </div>
    )
}

export default React.memo(Biz3);
