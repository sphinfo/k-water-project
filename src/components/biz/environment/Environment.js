import { G$addWidget, G$removeLayerForId, G$removeWidget } from "@gis/util";
import React, { useEffect, useRef, useState } from "react";
import Switch from '@mui/material/Switch';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import BaseWmsImageLayer from "@gis/layers/BaseWmsImageLayer";

const Environment = () => {

    const gArbageLayer = useRef({id:''})
    const landCoverLayer = useRef({id:''})
    const landCoverOverLayer = useRef({id:''})
    

    useEffect(()=>{
      
      //부유물
      gArbageLayer.current = new BaseWmsImageLayer('Garbage', 'Chlorophyll_Map_2')
      landCoverLayer.current = new BaseWmsImageLayer('LandCover', 'RF_20220914_clip')
      //landCoverOverLayer.current = new BaseWmsImageLayer('LandCover', 'clipped_cd', null, false)
      landCoverOverLayer.current = new BaseWmsImageLayer('LandCover', 'change_detection', null, false)
      //

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
          
        G$removeWidget('BaseLegendWidget')
        G$removeWidget('BaseLegendgGradientWidget')
      }

    },[])

    //부유물 / 수변피복 레이어탭
    const [layerTab, setlayerTab] = useState('gArbage');

    //레이어탭 change
    const handleSelcted = (event, newSelected) => {
      setlayerTab(newSelected);
    };

    //변화탐지
    const [landCoverSwitch, setLandCoverSwitch] = useState(false)
    const switchChange = (event, value) =>{
      setLandCoverSwitch(value)
    }

    //레이어탭 change action
    useEffect(()=>{
      G$removeWidget('BaseLegendWidget')
      G$removeWidget('BaseLegendgGradientWidget')

      //부유물
      if(layerTab === 'gArbage'){
        G$addWidget('BaseLegendgGradientWidget', { params: {title:'부유물', min:300, max: 0, datas:['#FF0000', '#FFA500', '#FAFAD2', '#87CEFA', '#1E90FF']}})

        gArbageLayer.current.setVisible(true)
        if(landCoverLayer.current.layer){
          landCoverLayer.current.layer.show = false //setVisible(false)
        }
        
        if(landCoverOverLayer.current.layer){
          landCoverOverLayer.current.layer.show = false
        }

      }else if(layerTab === 'landCover'){
        G$addWidget('BaseLegendWidget', { params: {title:'수변피복', 
          datas: [{label:'Water', color:'#0000FF'}
            ,{label:'Barren', color:'#FFCC00'}
            ,{label:'Grass', color:'YELLOW'}
            ,{label:'Forest', color:'#009900'}
            ,{label:'Builtup', color:'RED'}
          ]} 
        })
        gArbageLayer.current.setVisible(false)
        landCoverLayer.current.setVisible(true)
        landCoverOverLayer.current.setVisible(landCoverSwitch ? true : false)
      }
    },[layerTab])

    useEffect(()=>{
      landCoverOverLayer.current.setVisible(landCoverSwitch ? true : false)
      // if(landCoverSwitch){
      //   setTimeout(()=>{
      //     G$flyToPoint([127.107073977, 36.468267987], 3777)
      //   },500)
        
      // }
    },[landCoverSwitch])



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

export default React.memo(Environment);
