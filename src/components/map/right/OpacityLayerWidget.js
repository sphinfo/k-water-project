import { OPACITY_MODE } from '@redux/actions';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const OpacityLayerWidget = () => {
    
  const [opacityVisible, setOpacityVisible] = useState(false)

  const dispatch = useDispatch()

  useEffect(()=>{
      dispatch({type: OPACITY_MODE, opacity: opacityVisible})
  },[opacityVisible])

    return (
      <button className={`mapRightBt ${opacityVisible ? 'active' : ''}`} data-tooltip="표출 지도 투명도" onClick={()=>{setOpacityVisible(!opacityVisible)}}>
        <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4.8 8C3.312 8 2.072 9.024 1.712 10.4H0.8C0.358173 10.4 0 10.7582 0 11.2V11.2C0 11.6418 0.358172 12 0.799999 12H1.712C2.072 13.376 3.312 14.4 4.8 14.4C6.288 14.4 7.528 13.376 7.888 12H15.2C15.6418 12 16 11.6418 16 11.2V11.2C16 10.7582 15.6418 10.4 15.2 10.4H7.888C7.528 9.024 6.288 8 4.8 8ZM4.8 12.8C3.92 12.8 3.2 12.08 3.2 11.2C3.2 10.32 3.92 9.6 4.8 9.6C5.68 9.6 6.4 10.32 6.4 11.2C6.4 12.08 5.68 12.8 4.8 12.8ZM14.288 2.4C13.928 1.024 12.688 0 11.2 0C9.712 0 8.472 1.024 8.112 2.4H0.799999C0.358172 2.4 0 2.75817 0 3.2V3.2C0 3.64183 0.358172 4 0.8 4H8.112C8.472 5.376 9.712 6.4 11.2 6.4C12.688 6.4 13.928 5.376 14.288 4H15.2C15.6418 4 16 3.64183 16 3.2V3.2C16 2.75817 15.6418 2.4 15.2 2.4H14.288ZM11.2 4.8C10.32 4.8 9.6 4.08 9.6 3.2C9.6 2.32 10.32 1.6 11.2 1.6C12.08 1.6 12.8 2.32 12.8 3.2C12.8 4.08 12.08 4.8 11.2 4.8Z"
            fill="white"/>
        </svg>
      </button>
    )
}

export default OpacityLayerWidget;
