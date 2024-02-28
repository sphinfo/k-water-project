import { G$makeFormDataParam } from "@gis/util";
import createAxios from "../creatAxios";
import CommonConfig from "./CommonConfig";
import FloodConfig from "../flood/FloodConfig";

const getL3Layers = async (props={}) => {
    try{
        const { request } = createAxios();
        const { geoSearch } = props
        const result = await request({
            url: geoSearch ? CommonConfig.GET_L3_GEO_LAYERS : CommonConfig.GET_L3_LAYERS,
            params: props,
            method: 'GET',
        })
        
        props = { ...props, result: result.data };
        return props;
    }catch(error){
        return {message:'error', result:{data:[]}}
    }   
}

const getL4Layers = async (props={}) => {
    try{
        const { request } = createAxios();
        const result = await request({
            url: CommonConfig.GET_L4_LAYERS,
            params: props,
            method: 'GET',
        })
        
        props = { ...props, result: result.data };
        return props;
    }catch(error){
        return {message:'error', result:{data:[]}}
    }   
}




export {
    getL3Layers,
    getL4Layers,
}