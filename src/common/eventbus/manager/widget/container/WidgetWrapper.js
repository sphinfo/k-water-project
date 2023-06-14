import React, {createContext, Suspense, useCallback, useEffect, useMemo, useRef, useState} from 'react';

const WrapperContext = createContext({});
const WrapperProvider = WrapperContext.Provider;
const WrapperConsumer = WrapperContext.Consumer;

const setSize = (option = {}) => {
    return {
        width: Math.min(option.width, window.innerWidth),
        height: Math.min(option.height, window.innerHeight)
    }
}

const setXY = (option = {}) => {
    let pos = {
        x: parseInt( option.x ),
        y: parseInt( option.y )
    };

    return pos;
};

const initWidgetOption = (option = {}) => {
    return {
        size: setSize(option),
        position: setXY(option)
    };
};

const WidgetWrapper = (props) => {
    
    const {zIndex, isResizing = true, isControl = true, ...other} = props;

    const initOptions = useMemo(()=>({
        ...initWidgetOption({...other})
    }),[]);

    let [widgetOptions, setWidgetOptions] = useState({
        ...initOptions
    });

    const writeChildren = useCallback(() => {
        const childrenWithProps = React.Children.map(props.children, child => {
            if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                    size: widgetOptions.size,
                    wid: props.wid
                });
            }
            return child;
        });
        return childrenWithProps;

    }, [props.children]);

    return (
        <>
            <div style={{position:'absolute'}}>
                {
                    writeChildren()
                }
            </div>
        </>
    )
}

export default React.memo(WidgetWrapper);