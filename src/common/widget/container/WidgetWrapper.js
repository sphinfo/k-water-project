import React, {Suspense, useCallback, useMemo, useRef} from 'react';
import IconButton from '@mui/material/IconButton';
import { Rnd } from 'react-rnd';
import { G$removeWidget } from '@gis/util';

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

    const close = () =>{
        G$removeWidget(wid)
    }


    return (
        <>
            {legend ? (
                <div style={defaultOption} key={wid} className={`${wid} widget widget-legend`}>
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
                            <IconButton className="panel-close-btn" onClick={close}>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 17L9 9M9 9L17 17M9 9L17 1M9 9L1 1" stroke="#ffffffe6" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                            </IconButton>
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