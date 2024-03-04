import React, { useCallback, useImperativeHandle, useMemo, useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { koKR } from '@mui/x-date-pickers/locales';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { memo } from "react";
import { DateRangePicker } from "@mui/x-date-pickers-pro";

dayjs.locale('ko');

/* datePicker 한글설정 */
class LocalizedUtils extends AdapterDayjs {
	constructor(opts) {
		super({ ...opts, locale: koKR });
	}
}

/**
   BaseDateRangePicker Component
 **/
const BaseDateRangePicker = (props, ref) => {
  
  // onChange : Parent Combo Change Event Function
  const { dateFormat, minDate, maxDate, interval, onChange, onchangeFromat, ...other } = props;

  const [selectedDate, setSelectdDate] = useState([])

  const onChangeDate = useCallback((d) => {
    
    setSelectdDate(d)
  })

  const closeOnSelect = useCallback(()=>{
    (onchangeFromat && selectedDate.length === 2 && onchangeFromat([selectedDate[0].format('YYYYMMDD'), selectedDate[1].format('YYYYMMDD')]))
  },[selectedDate])

  const max = useMemo(()=>{
    return maxDate ? dayjs(maxDate) : dayjs().add(interval || -1, 'day')
  }, [maxDate])

  const min = useMemo(()=>{
    return minDate ? dayjs(minDate) : dayjs('2010-01-01')
  }, [minDate])

  // 날짜 형식
  const format = useMemo(() => {
    return dateFormat || 'YYYY-MM-DD';
  }, [dateFormat]);

  // BaseDatePicker 레퍼런스 API
  useImperativeHandle(ref, () => ({
    get value() {
	    return selectedDate
    },
    set value(d) {
      setSelectdDate(d);
    }
  }));

  return (
    <>
    <LocalizationProvider dateAdapter={LocalizedUtils} >
      <DateRangePicker
        calendars={1}
        format={format}
        color={"primary"}
        className={"date-picker"}
        defaultValue={[min, max]}
        onChange={onChangeDate}
        onClose={closeOnSelect}
        localeText={{ start: '', end: '' }}
      />
    </LocalizationProvider>
    </>
  );
};

export default memo(React.forwardRef(BaseDateRangePicker));
