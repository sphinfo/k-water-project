import React, {useEffect, useRef} from "react";
import WidgetManager from "../WidgetManager";
import WidgetWrapper from "./WidgetWrapper";
import { Observer } from "mobx-react";
import IconButton from "@mui/material/IconButton";


const WidgetConatiner = (props) => {

    const container = useRef();
    useEffect(() => {
        WidgetManager.reference = container;
    }, []);

    return (
        <Observer>
                {() => (
                    <div ref={container}>
                        {
                            WidgetManager._instances.map(widget => {
                                let {
                                    title,
                                    subTitle,
                                    legend,
                                } = widget;

                                return (
                                    // 공통 widget wrapper ( 사이즈 및 스타일 설정을 위한 warpper )
                                    <WidgetWrapper
                                        key={widget.guid}
                                        wid={widget.id}
                                        {...{
                                            title,
                                            subTitle,
                                            legend,
                                        }}
                                        props={widget.props}
                                    >
                                        {/* widget 실제 instance */}
                                        <widget.instance {...widget.props} />
                                    </WidgetWrapper>
                                );
                            })
                        }
                    </div>
                )}
        </Observer>
    ) 
    ;
}

export default React.memo(WidgetConatiner);