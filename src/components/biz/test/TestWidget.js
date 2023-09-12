import React, { useEffect } from "react";

const TestWidget = (props) => {

    useEffect(()=>{
        console.info('TestWidget')

        return()=>{
            console.info('bye')
        }
    },[])

    useEffect(()=>{
        console.info(props)
    },[props.param])

    useEffect(()=>{
        console.info("change")
    })

    return (
        <>
            <div>
                <button>TestWidget111</button>
            </div>
            
        </>
    )
}

export default React.memo(TestWidget);
