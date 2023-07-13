import React, { useCallback, useImperativeHandle, useMemo, useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers'
import { koKR } from '@mui/x-date-pickers/locales';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { memo } from "react";

dayjs.locale('ko');

/* datePicker 한글설정 */
class LocalizedUtils extends AdapterDayjs {
	constructor(opts) {
		super({ ...opts, locale: koKR });
	}
}

/**
   DatePicker Component
 **/
const BaseDatePicker = (props, ref) => {

  // interval : 현재 날짜 간격 조정 [ number ]
  // onChange : Parent Combo Change Event Function
  const { dateFormat, minDate, maxDate, interval, onChange, onchangeFromat, ...other } = props;

  const [selectedDate, setSelectdDate] = useState(props.date || dayjs().add(interval || -1, 'day'));

  const onChangeDate = useCallback((d) => {
    if (ref && ref.current) {
      ref.current.value = d;
    } else {
      setSelectdDate(d);
    }

    (onChange && onChange(d));
    (onchangeFromat && onchangeFromat(d.format('YYYY-MM-DD')));
  });

  const max = useMemo(()=>{
    return dayjs(maxDate)
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
      //return moment(selectedDate).format("YYYY-MM-DD");
	    return selectedDate
    },
    set value(d) {
      setSelectdDate(d);
    }
  }));

  return (
    <LocalizationProvider dateAdapter={LocalizedUtils} >
      <DesktopDatePicker
        autoFocus
        value={selectedDate}
        format={format}
        sx={{width:160}}
        maxDate={max}
        minDate={min}
        onChange={onChangeDate}
        PopperProps={{
          disablePortal: true,
          onClose: () => {},
        }}
        {...other}
      />
    </LocalizationProvider>
  );
};

export default memo(React.forwardRef(BaseDatePicker));