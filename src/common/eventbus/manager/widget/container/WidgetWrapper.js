import React, {Suspense, useCallback} from 'react';

const WidgetWrapper = (props) => {

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
            <div style={{position:'absolute'}} key={props.wid}>
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