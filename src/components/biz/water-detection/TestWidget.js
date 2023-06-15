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

    return (
        <>
            <div>
                <button>TestWidget</button>
            </div>
            
        </>
    )
}

export default React.memo(TestWidget);
