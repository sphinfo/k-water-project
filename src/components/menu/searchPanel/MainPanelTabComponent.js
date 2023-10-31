import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_MODE } from "@redux/actions";
import { useEffect } from "react";
import { useState } from "react";
import { Tab, Tabs } from "@mui/material";
const MainPanelTabComponent = () => {

    const dispatch = useDispatch()
    const mode = useSelector(state => state.main.mode);

    const [tabIdx, setTabIdx] = useState(0); // 초기값을 0으로 설정

    useEffect(() => {
        if (mode === 'main') {
            setTabIdx(0);
        } else if (mode === 'list') {
            setTabIdx(1);
        } else if (mode === 'layers') {
            setTabIdx(2);
        }
    }, [mode]);

    const onTabChange = (e, tIdx) => {
        setTabIdx(tIdx);
        if (tIdx === 0) {
            dispatch({ type: CHANGE_MODE, mode: 'main' });
        } else if (tIdx === 1) {
            dispatch({ type: CHANGE_MODE, mode: 'list' });
        } else if (tIdx === 2) {
            dispatch({ type: CHANGE_MODE, mode: 'layers' });
        }
    }

    return (
        <>
            <div>
                <Tabs value={tabIdx} onChange={onTabChange}>
                    <Tab label="검색 조건" />
                    <Tab label="결과" />
                    {/*<Tab label="레이어 리스트" />*/}
                </Tabs>
            </div>
        </>
    )
}

export default memo(MainPanelTabComponent);
