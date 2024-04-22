import CommonConfig from "../common/CommonConfig";
import createAxios from "../creatAxios";
import EnviConfig from "./EnviConfig";


/**부유물 녹조정보 */
const getAreaInfo = async (props={}) => {
    try{
        const { request } = createAxios();
        const result = await request({
            url: EnviConfig.GET_ENVI_AREA_INFO,
            params: props,
            method: 'GET',
        })
        props = { ...props, result: result.data };
        return props;

    }catch(error){
        return {message:'error', result:{list:[]}}
    }
}

const getEnvLandCoverDatas = async (props) =>{
    try{
        const { request } = createAxios()
        //const {location, from, to} = props
        const envSearchPromises = []
        envSearchPromises.push(request({url: EnviConfig.GET_ENVI_HEAT_MAP_DATA, params: props, method: 'GET'}))
        envSearchPromises.push(request({url: EnviConfig.GET_ENVI_BAR_DATA,  params: props, method: 'GET'}))
        return await Promise.all(envSearchPromises)
    }catch(error){
        return {message:'error', result:{data:[]}}
    }

}

const getHeatmapData = async (props={}) => {
    try{
        const { request } = createAxios();
        const result = await request({
            url: EnviConfig.GET_ENVI_HEAT_MAP_DATA,
            params: props,
            method: 'GET',
        })
        props = { ...props, result: result.data };
        return props;

    }catch(error){
        return {message:'error', result:{list:[]}}
    }
}

const getBarData = async (props={}) => {
    try{
        const { request } = createAxios();
        const result = await request({
            url: EnviConfig.GET_ENVI_BAR_DATA,
            params: props,
            method: 'GET',
        })
        props = { ...props, result: result.data };
        return props;

    }catch(error){
        return {message:'error', result:{list:[]}}
    }
}


const getEnviL4Layers = async (props={}) => {
    try{
        const { request } = createAxios();
        const result = await request({
            url: EnviConfig.GET_ENVI_L4,
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
    getAreaInfo,
    getEnvLandCoverDatas,
    getHeatmapData,
    getBarData,
    getEnviL4Layers
}