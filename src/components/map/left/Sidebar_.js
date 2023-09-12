import React, { useEffect, useRef } from 'react';
import BaseWmsLayer from '@gis/layers/BaseWmsLayer';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_MODE } from '@redux/actions';
import { G$addLayer, G$removeLayer } from '@gis/util';


const Sidebar = () => {

  const dispatch = useDispatch()
  const mode = useSelector(state => state.main.mode);

  const modeChange = (type) =>{
    if(type === mode){ type = '' }
    dispatch({type: CHANGE_MODE, mode: type})
  }

  const safetyDiagnsisLayer = useRef(new BaseWmsLayer('river_M','DisplacementClass'))
  const droughtLayer = useRef(new BaseWmsLayer('DR_Konkuk_20170113_M','Drought'))
  const waterLevelLayer = useRef(new BaseWmsLayer('Juam_SBAS_Path134_Frame476_M','DisplacementClass'))
  const gArbageLayer = useRef(new BaseWmsLayer('수체_샘플데이터','WaterBody'))

  useEffect(()=>{
    //G$removeLayer('WaterBody:수체_샘플데이터')
    //G$addLayer(gArbageLayer.current)
    //console.info(mode)
  },[mode])

  return (
    <div style={{display: 'flex', position: 'absolute', height: '100%', width: 80, background: 'white', color:'black', flexDirection: 'column'}}>
      <div>
        <button style={{background: mode === 'SafetyDiagnsis' ? 'yellow' : ''}} onClick={()=>{modeChange('SafetyDiagnsis')}}>안전</button>
      </div>
      <div>
        <button style={{background: mode === 'Drought' ? 'yellow' : ''}} onClick={()=>{modeChange('Drought')}}>가뭄</button>
      </div>
      <div>
        <button style={{background: mode === 'WaterLevel' ? 'yellow' : ''}} onClick={()=>{modeChange('WaterLevel')}}>홍수</button>
      </div>
      <div>
        <button style={{background: mode === 'GArbage' ? 'yellow' : ''}} onClick={()=>{modeChange('GArbage')}}>환경</button>
      </div>
    </div>
  )
}

export default Sidebar;