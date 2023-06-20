import React, { useCallback, useImperativeHandle, useMemo, useState } from "react";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import "moment/locale/ko"; // 한국시간 사용
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { TextField } from "@material-ui/core";

/**
   날짜표시 Filed 재정의
 **/
const PickerTextField = (props) => {
	const { value, ...other } = props;
	return (
		<TextField
			{...other}
			variant="outlined"
			value={moment(value).format("YYYY-MM-DD")}
		/>
	);
}

/**
    DatePicker 한글화
 **/
class LocalizedUtils extends MomentUtils {
  constructor(opts) {
    super({ ...opts, locale: 'ko' }); // Apply Korean locale
  }

  getCalendarHeaderText(date) {
	return moment(date).format("YYYY-MM")
  }

  getDatePickerHeaderText(date) {
	return moment(date).format("YYYY-MM-DD")
  }

  getYearText(date) {
    return moment(date).format("YYYY")
  }

  getDayText(date) {
    return moment(date).format("DD")
  }
}

/**
   DatePicker Component
 **/
const BaseDatePicker = (props, ref) => {

  // interval : 현재 날짜 간격 조정 [ number ]
  // disableToolbar : 날짜 Toolbar 사용여부 [ true | false ]
  // onChange : Parent Combo Change Event Function
  const { pickerType, dateFormat, minDate, maxDate, interval, disableToolbar, onChange, ...other } = props;

  const [selectedDate, setSelectdDate] = useState(props.date || moment().add(interval || -1, 'day').toDate());

  console.info(moment().add(interval || -1, 'day').toDate())

  const onChangeDate = useCallback((d) => {

    if (ref && ref.current) {
      ref.current.value = d;
    } else {
      setSelectdDate(d);
    }

    (onChange && onChange(d));
  });

  // DatePicker 표현 형태
  // type : [ dialog | inline | static ]
  const type = useMemo(() => {
    return pickerType || 'inline';
  }, [pickerType]);

  const isToolbar = useMemo(() => {
    return disableToolbar === null ? true : disableToolbar;
  });

  // 날짜 형식
  const format = useMemo(() => {
    return dateFormat || 'yyyy-MM-dd';
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
    <MuiPickersUtilsProvider utils={LocalizedUtils} locale={'ko'} >
      <DatePicker
        autoOk
        variant={type}
		    disableToolbar={isToolbar}
        value={selectedDate}
		    format={format}
		    minDate={minDate}
		    maxDate={maxDate}
		    TextFieldComponent={PickerTextField}
        onChange={date => onChangeDate(date)}
        {...other}
      />
    </MuiPickersUtilsProvider>
  );
};

export default React.forwardRef(BaseDatePicker);