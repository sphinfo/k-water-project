import React, {Suspense, useCallback, useMemo} from 'react';



const widgetOption = (option = {}) => {
    return {
        width: option.width,
        height: option.height,
        top: option.height,
        left: option.height,
        ...option
    };
};

const WidgetWrapper = (props) => {

    const {wid, ...other} = props;

    const defaultOption = useMemo(()=>({
        ...widgetOption({...other})
    }),[]);


    const writeChildren = useCallback(() => {
        const childrenWithProps = React.Children.map(props.children, child => {
            if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                    //child 노드 param
                    wid: props.wid
                });
            }
            return child;
        });
        return childrenWithProps;

    }, [props.children]);


    return (
            <div style={defaultOption} key={wid} className={wid}>
                {/* 리소스가 준비될 때까지 렌더링을 일시 중지 */}
                <Suspense> 
                    {
                        writeChildren()
                    }
                </Suspense>
            </div>
    )
}

export default React.memo(WidgetWrapper);