import React, {Suspense, useCallback, useMemo, useRef, useState} from 'react';
import IconButton from '@mui/material/IconButton';
import { Rnd } from 'react-rnd';
import { G$removeWidget } from '@gis/util';
import { CircularProgress } from '@mui/material';

const WidgetWrapper = (props) => {

    const [mini, setMini] = useState(false)

    const {wid, legend, title, subTitle, ...other} = props;

    const writeChildren = useCallback(() => {
        const childrenWithProps = React.Children.map(props.children, child => {
            if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                    //child 노드 param
                    wid: props.wid
                })
            }
            return child
        });
        return childrenWithProps
    }, [props.children])

    const close = () =>{
        G$removeWidget(wid)
    }


    return (
        <>
            {legend ? (
                <div key={wid} className={`${wid} widget widget-legend`}>
                    <Suspense>{writeChildren()}</Suspense>
                </div>
            ) : (
                <Rnd
                    dragHandleClassName = {'popup-header'}
                >
                    <div key={wid} className={`${wid} popup ${mini ? 'minimize' : ''}`}>
                        <div className={"popup-header"}>
                            <h1 className={"popup-title"}>
                                {title} {subTitle ? subTitle : ''}
                            </h1>
                            <div className="btn-wrap">
                                <button className="btn-icon btn-min-max" onClick={()=>{setMini(!mini)}}></button>
                                <button className="btn-icon btn-close" onClick={close}></button>
                            </div>
                        </div>
                        
                        <div className={"popup-body"}>
                            {/* 리소스가 준비될 때까지 렌더링을 일시 중지 */}
                            <Suspense fallback={<div style={{display: 'flex', justifyContent: 'center'}}><CircularProgress color="primary" size={50} thickness={4} /></div>}>{writeChildren()}</Suspense>
                        </div>
                    </div>
                </Rnd>
            )}
        </>
    )
}

export default React.memo(WidgetWrapper);