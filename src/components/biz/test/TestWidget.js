import React, { useEffect } from "react";

const TestWidget = (props) => {

    useEffect(()=>{

        return()=>{
        }
    },[])

    useEffect(()=>{
    },[props.param])

    useEffect(()=>{
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
