import BaseWmsLayer from "@gis/layers/BaseWmsLayer";
import { G$addLayer, G$removeLayer } from "@gis/util";
import React, { useEffect, useRef, useState } from "react";
import Switch from '@mui/material/Switch';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const Biz3 = () => {

    const gArbageLayer = useRef({id:''})
    const landCoverLayer = useRef({id:''})
    

    useEffect(()=>{

        gArbageLayer.current = new BaseWmsLayer('Garbage', 'Chlorophyll_Map_2')
        G$addLayer(gArbageLayer.current)

        return()=>{
            G$removeLayer(gArbageLayer.current.id)
            G$removeLayer(landCoverLayer.current.id)
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

      if(landCoverLayer.current){
        G$removeLayer(landCoverLayer.current.id)
      }
      if(gArbageLayer.current){
        G$removeLayer(gArbageLayer.current.id)
      }

      if(layerTab === 'gArbage'){
        gArbageLayer.current = new BaseWmsLayer('Garbage', 'Chlorophyll_Map_2')
        G$addLayer(gArbageLayer.current)
        
      }else{

        let layerId = landCoverSwitch ? 'RF_20220914_clip' : 'RF_20221101_clip'
        landCoverLayer.current = new BaseWmsLayer('LandCover', layerId)
        G$addLayer(landCoverLayer.current)
        
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
