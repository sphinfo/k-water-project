import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import MapManager from '../../../openlayers/MapManager';
import LayerManager from '../../../openlayers/LayerManager';
import { G$addLayer } from '../../../openlayers/util';


const ThematicWidget = () => {

    useEffect(()=>{


    },[MapManager.map])

    
    
    return (
        <ul className="map-widget-vertical">
            <button className="map-right-bt">
                <svg xmlns="http://www.w3.org/2000/svg" className="bt-icons layer" width="18" height="20" viewBox="0 0 18 20" fill="none">
                    <path d="M9 19.5C8.7801 19.5 8.5646 19.4606 8.35349 19.3818C8.14171 19.3023 7.94279 19.1921 7.75672 19.0514L0.90597 13.5097C0.635323 13.2986 0.504398 13.0214 0.513194 12.6779C0.521313 12.3352 0.660697 12.0583 0.931343 11.8472C1.11741 11.7065 1.3204 11.6361 1.5403 11.6361C1.7602 11.6361 1.96318 11.7065 2.14925 11.8472L9 17.3625L15.8507 11.8472C16.0368 11.7065 16.2398 11.6361 16.4597 11.6361C16.6796 11.6361 16.8826 11.7065 17.0687 11.8472C17.3393 12.0583 17.479 12.3352 17.4878 12.6779C17.4959 13.0214 17.3647 13.2986 17.094 13.5097L10.2433 19.0514C10.0572 19.1921 9.85863 19.3023 9.64752 19.3818C9.43574 19.4606 9.2199 19.5 9 19.5ZM9 14.1694C8.7801 14.1694 8.5646 14.13 8.35349 14.0512C8.14171 13.9717 7.94279 13.8616 7.75672 13.7208L0.90597 8.17917C0.770647 8.07361 0.669154 7.94624 0.601492 7.79706C0.533831 7.64717 0.5 7.49306 0.5 7.33472C0.5 7.17639 0.533831 7.02228 0.601492 6.87239C0.669154 6.7232 0.770647 6.59583 0.90597 6.49028L7.75672 0.948611C7.94279 0.80787 8.14171 0.697741 8.35349 0.618222C8.5646 0.539407 8.7801 0.5 9 0.5C9.2199 0.5 9.43574 0.539407 9.64752 0.618222C9.85863 0.697741 10.0572 0.80787 10.2433 0.948611L17.094 6.49028C17.2294 6.59583 17.3308 6.7232 17.3985 6.87239C17.4662 7.02228 17.5 7.17639 17.5 7.33472C17.5 7.49306 17.4662 7.64717 17.3985 7.79706C17.3308 7.94624 17.2294 8.07361 17.094 8.17917L10.2433 13.7208C10.0572 13.8616 9.85863 13.9717 9.64752 14.0512C9.43574 14.13 9.2199 14.1694 9 14.1694Z" fill="#3D3D3D"/>
                </svg>
            </button>
        </ul>
    )
}

export default ThematicWidget; 
