import createAxios from "../creatAxios";



const getSafety3LevelResult = async (props) => {
    const { request } = createAxios();
    const result = await request({
        url: '',
        method: 'POST',
        params: props.params
    })
    props = { ...props, result: result };
    return props;
}



export {
    getSafety3LevelResult,
}