import React, { useCallback, useEffect, useRef} from 'react';
import MapManager from '@gis/MapManager'
import BaseDatePicker from '@com/manager/datepicker/BaseDatePicker'
import BaseCombo from '@com/manager/combo/BaseCombo';
import moment from 'moment';


const TestEventWidget = () => {

    const datePickerRef = useRef({});
    const comboRef = useRef({})

    useEffect(()=>{

    },[MapManager.map])

    const onChangeDate = useCallback((d) => {
        console.info(d);
    }, []);

    return (
        <ul style={{ display: 'flex', position: 'relative', left: 0 }}>
            <BaseDatePicker ref={datePickerRef} pickerType={'inline'} minDate={moment()} maxDate={new Date('2030-12-31')} style={{width: 150}}  onChange={onChangeDate}/>
            <BaseCombo ref={comboRef} provider={[{label:"가나다", value:"a"},{label:"라마사", value:"b"}]}/>
        </ul>
    )
}

export default TestEventWidget; 
