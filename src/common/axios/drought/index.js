import createAxios from "../creatAxios";
import DroughtConfig from "./DroughtConfig";


// 기뭄 관측소 지점
const getDroughtObs = async (props) => {
    try{
        const { request } = createAxios();
        const result = await request({
            url: DroughtConfig.GET_DROUHGT_OBS,
            method: 'GET',
        })
        props = { ...props, result: result.data };
        return props;
    }catch(error){
        return {message:'error', result:{data:[]}}
    }
}

// 기뭄 관측소 지점 - 토양수분
const getDroughtObsMoisture = async (props) => {
    try{
        const { request } = createAxios();
        const result = await request({
            url: DroughtConfig.GET_DROUHGT_OBS_MOISTURE,
            method: 'GET',
            params: props
        })
        props = { ...props, result: result.data };
        return props;
    }catch(error){
        return {message:'error', result:{data:[]}}
    }
}

const getDroughtObsIndex = async (props) => {
    try{
        const { request } = createAxios();
        const result = await request({
            url: DroughtConfig.GET_DROUHGT_OBS_INDEX,
            method: 'GET',
            params: props
        })
        props = { ...props, result: result.data };
        return props;
    }catch(error){
        return {message:'error', result:{data:[]}}
    }
}


export {
    getDroughtObs,
    getDroughtObsMoisture,
    getDroughtObsIndex,
}