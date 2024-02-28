import CommonConfig from "../common/CommonConfig";
import createAxios from "../creatAxios";
import FloodConfig from "./FloodConfig";




const getFloodL3Search = async (props) =>{
    try{
        const { request } = createAxios()
        const {location, type, from, to, geoSearch, left, bottom, right, top } = props
        const floodL3SearchPromises = []
        floodL3SearchPromises.push(request({url: geoSearch ? CommonConfig.GET_L3_GEO_LAYERS : CommonConfig.GET_L3_LAYERS, params: geoSearch ? {from, to, left, type, bottom, right, top } : props, method: 'GET'}))
        floodL3SearchPromises.push(request({url: FloodConfig.GET_FLOOD_OBS,  params: {location, from, to}, method: 'GET'}))
        return await Promise.all(floodL3SearchPromises)
    }catch(error){
        return {message:'error', result:{data:[]}}
    }

}

/**WAMIS 댐 수위 */
const getObsWls = async (props) => {
    try{
        const { request } = createAxios()
        const obswlsPromis = []
        props.dates.map((date)=>{
            let param = {obscd:props.obscd, startdt: date, enddt: date, output: 'json'}
            obswlsPromis.push(request({url: FloodConfig.GET_OBS_WL, params: param, method: 'GET'}))
        })
        return await Promise.all(obswlsPromis)
    }catch(error){
        return {message:'error', result:{list:[]}}
    }
}

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

/**수위 - 수위변화 차트 */
const getFloodWaterLevelChart = async (props={}) => {
    try{
        const { request } = createAxios();
        const result = await request({
            url: FloodConfig.GET_FLOOD_WATER_LEVEL_CHART,
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
    getFloodWaterLevelChart,
    getObsWl,
    getObsWls,
    getFloodL3Search,
}