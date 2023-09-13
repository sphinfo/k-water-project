import MapManager from "@gis/MapManager";
import BaseEntityChartCollection from "@gis/layers/BaseEntityChartCollection";
import { G$addLayer, G$removeLayer } from "@gis/util";
import { Chart } from "chart.js";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Test1Container = () => {
    const state = useSelector(state => state.main)

    const testFeatureLayer = useRef()
    const testFeatureLayer2 = useRef()

    useEffect(()=>{
        testFeatureLayer.current = new BaseEntityChartCollection({name:'feature1'})
        testFeatureLayer2.current = new BaseEntityChartCollection({name:'feature2'})
        
        return()=>{
            
        }
    },[])

    const addFeature = async() =>{
        G$addLayer(testFeatureLayer.current)
        
		await testFeatureLayer.current._addFeature(126.9780, 37.5665, "feature1", [30, 40, 30])
		await testFeatureLayer.current._addFeature(129.1856, 35.2086, "feature1", [10, 70, 20])
		await testFeatureLayer.current._addFeature(128.2056, 35.2196, "feature1", [40, 10, 50])
		await testFeatureLayer.current._addFeature(129.0856, 35.1696, "feature1", [20, 10, 40])
		await testFeatureLayer.current._addFeature(128.1456, 35.3696, "feature1", [60, 40, 30])
		await testFeatureLayer.current._addFeature(129.1556, 35.3796, "feature1", [10, 70, 20])
		await testFeatureLayer.current._addFeature(128.4846, 35.5296, "feature1", [10, 30, 40])

    }

    const addFeature2 = () =>{
        G$addLayer(testFeatureLayer2.current)
        
		testFeatureLayer2.current._addFeature(125.9780, 37.5665, "Seoul")

    }

    const removeFeature = () =>{
        MapManager.map.dataSources.remove(testFeatureLayer.current)
    }
    const removeFeature2 = () =>{
        MapManager.map.dataSources.remove(testFeatureLayer2.current)
    }

    const chartUrl = () =>{
    }
    return (
        <>
            <div style={{display: state.lengedPanel.Test1Container ? '' : 'none', width:200, height:200, background:'white'}}>
                <button onClick={addFeature}>댐</button>
                <button onClick={removeFeature}>댐 delete</button>
                <button onClick={addFeature2}>보</button>
                <button onClick={removeFeature2}>보 delete</button>
            </div>
            
        </>
    )
}

export default React.memo(Test1Container);
