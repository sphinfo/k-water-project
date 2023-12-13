import createAxios from "../creatAxios";
import SafetyConfig from "./SafetyConfig";

/**
 * 안전 변위 레이어 
 * @param {*} props 
 * @returns 
 */
const getSafetydisplaceResult = async (props) => {

    const {params={}} = props
    const { request } = createAxios();
    const result = await request({
        url: SafetyConfig.GET_DISPLACE_LAYER,
        method: 'GET',
        params: params
    })
    props = { ...props, result: result };
    return props;
}

/**
 * 안전 클릭 좌표 결과값
 * @param {*} props 
 * @returns 
 */
const getSafetyCompResult = async (props) => {
    const { request } = createAxios();
    const result = await request({
        url: SafetyConfig.GET_SAFETY_COMP_RESULT,
        method: 'GET',
        params: props
    })
    props = { ...props, result: result };
    return props;
}
//


export {
    getSafetydisplaceResult,
    getSafetyCompResult,
}