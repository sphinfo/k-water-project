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
                <button>{props.param}</button>
                <button>{props.param2}</button>
                <button>TestWidget</button>
                <button>TestWidget</button>
                <button>TestWidget</button>
                TestWidgetTestWidgetTestWidgetTestWidgetTestWidgetTestWidgetTestWidgetTestWidgetTestWidgetTestWidget
            </div>
            
        </>
    )
}

export default React.memo(TestWidget);
