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
                        {/*레전드*/}
                        <div className="map_widget map-basic-style" style={{bottom: '10px', right: '10px'}}>
                            <div className="widget-box">
                                <div className="widget-header">
                                    <h4 className="widget-title">범례</h4>
                                </div>
                                <div className="widget-body">max-width: 300px(fluid) <br/> min-width: unset</div>
                            </div>
                        </div>

                        {/*지도 팝업*/}
                        <div className="map_widget map-basic-style" style={{bottom: '120px', right: '10px'}}>
                            <div className="widget-box map-popup-box">
                                <div className="widget-header">
                                    <h4 className="widget-title">지도 팝업</h4>
                                    <IconButton className="popup-close-btn"></IconButton>
                                </div>
                                <div className="widget-body">max-width: 300px(fluid) <br/> min-width: unset</div>
                            </div>
                        </div>
                        {
                            WidgetManager._instances.map(widget => {
                                console.info(widget)
                                let {
                                    title,
                                    style,
                                    legend,
                                } = widget;

                                return (
                                    // 공통 widget wrapper ( 사이즈 및 스타일 설정을 위한 warpper )
                                    <WidgetWrapper
                                        key={widget.guid}
                                        wid={widget.id}
                                        {...{
                                            title,
                                            legend,
                                            ...style
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