import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_MODE } from '@redux/actions';
import { G$addLayer, G$removeLayerForId } from '@gis/util';


const Sidebar = () => {

  const dispatch = useDispatch()
  const mode = useSelector(state => state.main.mode);

  const modeChange = (type) =>{
    if(type === mode){ type = '' }
    dispatch({type: CHANGE_MODE, mode: type})
  }


  useEffect(()=>{
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