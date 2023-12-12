import createAxios from "../creatAxios";
import SafetyConfig from "./SafetyConfig";

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



export {
    getSafetydisplaceResult,
}