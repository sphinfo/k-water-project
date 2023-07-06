import React, { useEffect } from 'react';
import MapManager from '@gis/MapManager'
// import BaseDatePicker from '@com/manager/datepicker/BaseDatePicker'
// import BaseCombo from '@com/manager/combo/BaseCombo';
//import BaseRangeDatePicker from '@com/manager/datepicker/BaseRangeDatePicker';


const TestEventWidget = () => {

    // const datePickerRef = useRef({});
    // const comboRef = useRef({})

    useEffect(()=>{

    },[MapManager.map])

    // const onChangeDate = useCallback((d) => {
    //     console.info(d);
    // }, []);

    // const onChangeCombo = useCallback((c) => {
    //     console.info(c);
    // }, []);

    return (
        <ul style={{ display: 'flex', position: 'relative', left: 0 }}>
            {/* <BaseDatePicker minDate={'2020-12-31'} className={"pickerStyle"} maxDate={'2023-12-31'} onChange={onChangeDate} style={{width: 150}}/>
            <BaseCombo ref={comboRef} onChange={onChangeCombo} provider={[{name:"가나다", code:"a"},{name:"라마사", code:"b"}]} style={{ width: 150, float: 'left' }}/> */}
            {/* <BaseRangeDatePicker /> */}
        </ul>
    )
}

export default TestEventWidget; 
