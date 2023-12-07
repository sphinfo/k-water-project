import React, {Suspense, useCallback, useMemo, useRef} from 'react';
import { Rnd } from 'react-rnd';

const widgetOption = (option = {}) => {

    let style = {}

    if(!option.legend){
        style = {
            width: option.width,
            height: option.height,
            ...option
        }
    }
    
    return style;
};

const WidgetWrapper = (props) => {

    const {wid, legend, title, subtitle, ...other} = props;

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
        <>
            {legend ? (
                <div style={defaultOption} key={wid} className={`${wid} widget-legend`}>
                    <Suspense>{writeChildren()}</Suspense>
                </div>
            ) : (
                <Rnd
                    default={{
                    x: defaultOption.props.x ? defaultOption.props.x : null,
                    y: defaultOption.props.y ? defaultOption.props.y : null
                }}
                dragHandleClassName = {'popup-header'}
                >
                    <div style={defaultOption} key={wid} className={`${wid} popup`}>
                        <div className={"popup-header"}>
                            <h1 className={"popup-title"}>
                                {title} {subtitle ? subtitle : ''}
                            </h1>
                        </div>
                        <div className={"popup-body"}>
                            {/* 리소스가 준비될 때까지 렌더링을 일시 중지 */}
                            <Suspense>{writeChildren()}</Suspense>
                        </div>
                    </div>
                </Rnd>
            )}
        </>
    )
}

export default React.memo(WidgetWrapper);