import React, {memo, useCallback, useEffect, useImperativeHandle, useMemo, useState} from "react";
import { FormControl } from "@mui/material";
import WindowedSelect from "react-windowed-select";

const BaseCombo = (
	//provider = ITEMS
	//label = COMBOBOX 기본 LABEL
	//labelField	key
	//field 		value
	{provider=[], label='', field, labelField, onChange, style}, ref) => {

		const [comboData, setComboData] = useState([]);
		const [selected, setSelected] = useState({value: '', item: null, index:-1}); 

		/* key value */
		const basicFiled = useMemo(() => (field || 'code'), [field]);
		const basicLabelFiled = useMemo(() => (labelField || 'name'), [labelField]);

		useEffect(() => {
			const placeholderData = { [basicFiled]: '', [basicLabelFiled]: label || '선택' };
			setComboData([placeholderData, ...provider]);
		}, [provider]);

		//props로 onchange 받을때
		useEffect(() => {
			(onChange && onChange({...selected.item, selectedIndex:selected.index }))
		}, [selected]);

		const onChangeHandler = useCallback((data, event) => {
			const value = data[basicFiled];
			setSelected({value: value, item: data, index: findIndex(data)});
		});


		const findIndex = useCallback((data)=>{
			const item = (data || selected.item);
			if (Array.isArray(comboData) && comboData.length > 0) {
				for( const [index,data] of comboData.entries()){
					if( item[basicFiled] === data[basicFiled]){
						return index;
					}
				}
				return -1;
			}
		});

		
		// Combo 레퍼런스 API
		useImperativeHandle(ref, () => ({
			get provider() {
				return comboData;
			},
			set provider(data) {
				if (Array.isArray(data)) {
					const filters = data;
					const placeholderData = { [basicFiled]: '', [basicLabelFiled]: label || '선택' };
					setComboData([placeholderData, ...filters]);
				} else {
					console.log('set provider error!');
				}
			},
			get value() {
				return selected.value || '';
			},
			set value(val) {
				setSelected({...selected, value: val});
			}

		}));
		

	return (
		<FormControl style={{...style}}>
			<WindowedSelect 
				placeholder = {label || '선택'}
				options={comboData}
				value={selected.item}
				getOptionLabel={option =>  option[basicLabelFiled]}
				getOptionValue={option => option[basicFiled]}
				onChange={onChangeHandler}
			/>
		</FormControl>
	);
};

export default  memo(React.forwardRef(BaseCombo));