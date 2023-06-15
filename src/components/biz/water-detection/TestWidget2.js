import React, { useEffect } from "react";

const TestWidget2 = (props) => {

    useEffect(()=>{
        console.info('TestWidget2')

        return()=>{
            console.info('bye')
        }
    },[])

    useEffect(()=>{
        console.info(props)
    },[props.param])

    useEffect(()=>{
        console.info(props)
    },[])

    return (
        <>
            <div>
                TestWidget2
            </div>
            
        </>
    )
}

export default React.memo(TestWidget2);
