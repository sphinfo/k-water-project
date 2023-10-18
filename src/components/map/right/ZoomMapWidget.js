import React, { useCallback, useState } from 'react';
import MapManager from '../../../cesium/MapManager';
import { G$flyToPoint } from '@gis/util';

const ZoomMapWidget = () => {
    
    const zoomIn = useCallback(() => {
        MapManager.zoomIn()
    }, []);

    const zoomOut = useCallback(() => {
        MapManager.zoomOut()
    }, []);
    
    const home = () =>{
        G$flyToPoint([127.61790470489117,36.52505158669595], 850000)
    }

    const add = () =>{
        MapManager.terrainLoad()
    }

    return (
        <ul className="map-widget-vertical-block">
          <button className="mapRightBt" onClick={home}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.5661 3.43437L10.5619 12.3354M5.44089 12.2484L5.44507 3.89724M1.42001 3.06019L5.09335 1.59531C5.20033 1.53885 5.31918 1.50657 5.44094 1.5009C5.56271 1.49523 5.68421 1.51633 5.79632 1.56259L10.2065 3.28558C10.3187 3.33184 10.4402 3.35293 10.5619 3.34726C10.6837 3.3416 10.8025 3.30932 10.9095 3.25286L13.8077 1.72596C13.9305 1.66122 14.0686 1.62846 14.2084 1.6309C14.3483 1.63335 14.4851 1.67092 14.6054 1.73992C14.7256 1.80892 14.8253 1.90698 14.8945 2.02446C14.9637 2.14193 15 2.27479 15 2.40996V11.7864C15 11.9263 14.961 12.0637 14.8871 12.1841C14.8132 12.3044 14.7071 12.4033 14.58 12.4704L10.9095 14.4047C10.8025 14.4612 10.6837 14.4934 10.5619 14.4991C10.4402 14.5048 10.3187 14.4837 10.2065 14.4374L5.80044 12.3965C5.68834 12.3502 5.56683 12.3291 5.44507 12.3348C5.3233 12.3404 5.20446 12.3727 5.09747 12.4292L2.19931 13.9561C2.07658 14.0208 1.93854 14.0536 1.79876 14.0511C1.65897 14.0487 1.52223 14.0112 1.40198 13.9423C1.28172 13.8734 1.18207 13.7755 1.11282 13.6581C1.04357 13.5407 1.0071 13.408 1.00699 13.2729L1 3.74497C0.999973 3.60502 1.03896 3.46763 1.11287 3.34726C1.18678 3.2269 1.29288 3.12723 1.42001 3.06019Z" stroke="#3D3D3D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
            <button className="mapRightBt" onClick={zoomIn}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 8V1.5M8 8V14.5M8 8H14.5M8 8H1.5" stroke="#3D3D3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            <button className="mapRightBt" onClick={zoomOut}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="2" viewBox="0 0 16 2" fill="none">
                    <path d="M1.5 1H14.5" stroke="#3D3D3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            <button className="mapRightBt" onClick={add}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="2" viewBox="0 0 16 2" fill="none">
                    <path d="M1.5 1H14.5" stroke="#3D3D3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </ul>
    )
}

export default ZoomMapWidget;
