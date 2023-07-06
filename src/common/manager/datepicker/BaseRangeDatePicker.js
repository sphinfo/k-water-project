import React, { useImperativeHandle } from "react";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { useState } from "react";

/* datePicker 한글설정 */
import { koKR } from '@mui/x-date-pickers/locales';
import 'dayjs/locale/ko';
import { useMemo } from "react";

dayjs.locale('ko');

/* datePicker 한글설정 */
class LocalizedUtils extends AdapterDayjs {
	constructor(opts) {
		super({ ...opts, locale: koKR });
	}
}



const BaseRangeDatePicker = ({dateFormat}, ref) => {
  
  const format = useMemo(() => {
    return dateFormat || 'YYYY-MM-DD';
  }, [dateFormat]);
  
  // BaseRangeDatePicker 레퍼런스 API
  useImperativeHandle(ref, () => ({
    get value() {
	  return 'selectedDate'
    },
    set value(d) {
      //setSelectdDate(d);
    }
  }));

  const [value, setValue] = useState([dayjs('2022-04-17'), dayjs('2022-04-21')]);

  return (
    <LocalizationProvider dateAdapter={LocalizedUtils} locale={koKR}>
      <DateRangePicker
        value={value}
        format={format}
        onChange={(newValue) => setValue(newValue)}
      />
    </LocalizationProvider>
  );
};

export default React.forwardRef(BaseRangeDatePicker);