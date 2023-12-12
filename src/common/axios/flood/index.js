import createAxios from "../creatAxios";
import FloodConfig from "./FloodConfig";

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



export {
    getFloodObs,
}