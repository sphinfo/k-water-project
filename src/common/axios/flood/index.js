import createAxios from "../creatAxios";
import FloodConfig from "./FloodConfig";



const getFlood3LevelResult = async (props) => {

    const {params={}} = props

    const { request } = createAxios();
    const result = await request({
        url: FloodConfig.TEST_URL,
        method: 'GET',
        params: params
    })

    console.info(result)
    
    props = { ...props, result: result };
    return props;
}



export {
    getFlood3LevelResult,
}