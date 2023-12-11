import { G$makeFormDataParam } from "@gis/util";
import createAxios from "../creatAxios";
import CommonConfig from "./CommonConfig";



const getL3Layers = async (props={}) => {
    const { request } = createAxios();
    const result = await request({
        url: CommonConfig.GET_L3_LAYERS,
        params: props,
        method: 'GET',
    })
    
    props = { ...props, result: result.data };
    return props;
}



export {
    getL3Layers,
}