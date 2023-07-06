import React, {memo, forwardRef, useImperativeHandle } from "react";
import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';


//공통 Base Grid 
const BaseGrid = ({columns, rows, style={}, className='', ...other}, ref) => {

	const handleRowClick = (e) =>{
		console.info(e)
	}

	// grid 레퍼런스 API
	useImperativeHandle(ref, () => ({

	}));

	return (
		<div style={{height: 100, width:'100%'}}>
			<DataGrid
				onCellDoubleClick={(params, event) => {
					if (!event.ctrlKey) {
					  event.defaultMuiPrevented = true;
					}
				  }}
				columns={columns}
				rows={rows}
				className={className}
			/>
		</div>
	);
};

export default memo(forwardRef(BaseGrid));

/*

DataGrid className 추가 예시

.custom-grid .react-grid-Header {
  background-color: lightgray; // 헤더 배경색 변경
}

.custom-grid .react-grid-Row {
  border-bottom: 1px solid gray; // 행 아래에 경계선 추가
}

.custom-grid .react-grid-Cell {
  padding: 5px; // 셀 안쪽 여백 추가
}

*/