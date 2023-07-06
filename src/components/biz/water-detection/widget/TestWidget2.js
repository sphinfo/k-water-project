import React, { memo, useEffect } from "react";

const TestWidget2 = (props) => {

    useEffect(()=>{
        return()=>{
            console.info('bye')
        }
    },[])

    useEffect(()=>{
    },[props.params])

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

export default memo(TestWidget2);
