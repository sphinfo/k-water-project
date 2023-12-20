import createAxios from "../creatAxios";
import FloodConfig from "./FloodConfig";

/**수위 지점 */
const getFloodObs = async (props) => {
    try{
        const { request } = createAxios();
        const result = await request({
            url: FloodConfig.GET_FLOOD_OBS,
            method: 'GET',
        })
        props = { ...props, result: result.data };
        return props;

    }catch(error){
        return {message:'error', result:{data:[]}}
    }
    
}

/**WAMIS 댐 수위 */
const getObsWl = async (props={}) => {
    try{
        const { request } = createAxios();
        const result = await request({
            url: FloodConfig.GET_OBS_WL,
            params: props,
            method: 'GET',
        })
        props = { ...props, result: result.data };
        return props;

    }catch(error){
        return {message:'error', result:{list:[]}}
    }
}

/**수체 - 침수피해 차트 */
const getFloodWaterBodyChart = async (props={}) => {
    try{
        const { request } = createAxios();
        const result = await request({
            url: FloodConfig.GET_FLOOD_WATER_BODY_CHART,
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
    getFloodObs,
    getFloodWaterBodyChart,
    getObsWl,
}