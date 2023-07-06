import React, { memo, useCallback, useEffect, useImperativeHandle, useState } from "react";
import { forwardRef } from "react";


const TimeBar = ({onChange, provider, delay, ...props}, ref) => {

    const [actionType, setActionType] = useState(false)
    const [dataList, setDataList] = useState([])
    const [barValue, setBarValue] = useState(0)

    const onChangeHandler = useCallback((event) => {
        setBarValue(parseInt(event.target.value));
    }, []);

    useEffect(()=>{
        (onChange && onChange(dataList[barValue]))
    },[barValue])

    useEffect(() => {
        let interval;
        if (actionType) {
            interval = setInterval(() => {
                setBarValue((prevValue) => {           
                    if (prevValue === dataList.length-1) {
                        clearInterval(interval);
                        setActionType(false);
                        return prevValue;
                    } else {
                        return prevValue + 1;
                    }
                });
            }, delay ? delay : 4000);
        }

        return ()=>{
            clearInterval(interval);
        };

    }, [actionType, dataList]);

    useEffect(()=>{
        setDataList(provider)
    },[provider])

    const reset = useCallback(() => {
        setBarValue(0);
        setActionType(false);
    }, []);

    /*  */
    useImperativeHandle(ref, () => ({

        set provider(data) {
            if (Array.isArray(data)) {
				setDataList(data)
                setActionType(false)
			} else {
				console.log('set provider error!');
			}
        },

        set action(type){
            setActionType(type)
        },

        get action(){
            return actionType
        },

        //reset interval
        reset
    }))


    return (
        <>
            <div>
                {barValue}
                <input type="range" min={2} max={dataList.length} value={barValue} onChange={onChangeHandler}/>
            </div>
        </>
    )
}

export default memo(forwardRef(TimeBar));
