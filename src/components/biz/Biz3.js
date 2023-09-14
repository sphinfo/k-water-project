import BaseWmsLayer from "@gis/layers/BaseWmsLayer";
import { G$addLayer, G$removeLayer } from "@gis/util";
import React, { useEffect, useRef, useState } from "react";
import Switch from '@mui/material/Switch';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const Biz3 = () => {

    const bizLayer = useRef()

    useEffect(()=>{

        bizLayer.current = new BaseWmsLayer('SoilMoisture', '52SCF_20230629_M')
        G$addLayer(bizLayer.current)

        return()=>{
            G$removeLayer('SoilMoisture:52SCF_20230629_M')
        }

    },[])

    const [selected, setselected] = useState('gArbage');

    const handleSelcted = (event, newSelected) => {
      setselected(newSelected);
    };

    return (
      <div className="tab-float-box">
        <ToggleButtonGroup className="tab-float-box-button-wrap" value={selected} exclusive onChange={handleSelcted}>
            <ToggleButton className="tab-float-box-btn" value={'gArbage'}>부유물</ToggleButton>
            <ToggleButton className="tab-float-box-btn" value={'landCover'}>수변피복</ToggleButton>
        </ToggleButtonGroup>
        <div className="tab-float-box-button-wrap" style={{display: selected === 'landCover' ? '' : 'none'}}>
          <button className="tab-float-box-btn btn-round">
            변화탐지
            <Switch className="float-box-switch"/>
          </button>
        </div>
      </div>
    )
}

export default React.memo(Biz3);
