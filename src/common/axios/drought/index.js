import createAxios from "../creatAxios";
import DroughtConfig from "./DroughtConfig";



const getDrought3LevelResult = async (props) => {

    const {params={}} = props

    const { request } = createAxios();
    const result = await request({
        url: SafetyConfig.TEST_URL,
        method: 'GET',
        params: params
    })

    console.info(result)
    
    props = { ...props, result: result };
    return props;
}



export {
    getDrought3LevelResult,
}