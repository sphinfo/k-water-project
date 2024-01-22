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

export {
    getAreaInfo,
}