import React, {useEffect, useMemo, useRef} from "react";
import WidgetManager from "../WidgetManager";
import WidgetWrapper from "./WidgetWrapper";
//import {WidgetEventConsumer, WidgetEventProvider} from "@com/manager/widget/events";
import { useObserver } from "mobx-react";


const WidgetConatiner = (props) => {

    const container = useRef();
    useEffect(() => {
        WidgetManager.reference = container;
    }, []);

    return useObserver(() => (
        <div ref={container} >
            {
                WidgetManager._instances.map(widget => {

                    let {
                        title
                    } = widget;

                    return (
                        <WidgetWrapper
                            wid={widget.id}
                            {...{
                                title
                            }}
                        >
                            <widget.instance {...widget.props}/>
                        </WidgetWrapper>
                    );
                })
            }
        </div>

    ));
}

export default React.memo(WidgetConatiner);