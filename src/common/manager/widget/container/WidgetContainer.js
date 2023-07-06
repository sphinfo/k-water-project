import React, {useEffect, useMemo, useRef} from "react";
import WidgetManager from "../WidgetManager";
import WidgetWrapper from "./WidgetWrapper";
import { useObserver } from "mobx-react";


const WidgetConatiner = (props) => {

    const container = useRef();
    useEffect(() => {
        WidgetManager.reference = container;
    }, []);

    return useObserver(() => (
        <div ref={container}>
            {
                WidgetManager._instances.map(widget => {
                    let {
                        title,
                        style,
                    } = widget;

                    return (
                        // 공통 widget wrapper ( 사이즈 및 스타일 설정을 위한 warpper )
                        <WidgetWrapper
                            key={widget.guid}
                            wid={widget.id}
                            {...{
                                title,
                                ...style
                            }}
                        >
                            {/* widget 실제 instance */}
                            <widget.instance {...widget.props} />
                        </WidgetWrapper>
                    );
                })
            }
        </div>

    ));
}

export default React.memo(WidgetConatiner);