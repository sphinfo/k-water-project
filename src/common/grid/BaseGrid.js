import React, { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { useTable } from 'react-table'
import BodyRow from "./table/BodyRow";
import EmptyMessage from "./table/EmptyMessage";


const BaseGrid = ({ columns, provider = [], className='', ...props }, ref) => {

	const selectedCell = useRef();
	const selectedRow = useRef();

	const [data, setData] = useState([]);

	const onRowClick = useCallback((value, origin, ref) => {
		selectedRow.current = ref;
		(props.onRowClick && props.onRowClick(value, ref));
	});

	const onCellClick = useCallback((value, origin, ref) => {
		selectedCell.current = ref;
		(props.onCellClick && props.onCellClick(value, origin, ref));
	});


	/* react table */
	const {  
		getTableProps, 
		getTableBodyProps, 
		headerGroups, 
		rows, 
		prepareRow 
	} = useTable({  columns, data });


	/* data change */
	useEffect(() => {
		if (provider && Array.isArray(provider) && provider.length) {
			setData(provider)
		}
	}, [provider]);

	const bodyProps = useMemo(() => {
		return { onRowClick, onCellClick };
	}, [onRowClick, onCellClick ]);

	/* Header render */
	const RenderHeader = useCallback((headerGroups) => {
		
		return headerGroups.map((headerGroup, i) => (
			<tr {...headerGroup.getHeaderGroupProps()}>
				{headerGroup.headers.map((column) => (
					<th {...column.getHeaderProps()}>{column.render("Header")}</th>
				))}
			</tr>
		));
	}, []);


	// Body Render
	const RenderBody = useCallback(() => {
		
		return (
			<>
				{rows.length > 0 && rows.map((row, i) => {
					prepareRow(row);
					let rowIdx = i
					const properties = { row, rowIdx, ...bodyProps };
					return (
						<BodyRow key={`bodyRow_${i}`} {...properties}/>
					);
				})}
				{
					rows.length === 0 && <EmptyMessage message={'데이터가 존재하지 않습니다.'}/>
				}
			</>
		)
	}, [ rows, prepareRow ]);
	

	useImperativeHandle(ref, () => ({
		
		set provider(data) {
			setData(data)
		},
		get provider() {
			return data;
		},
		
		get selectedRow() {
			return selectedRow.current;
		},
		get selectedCell() {
			return selectedCell.current;
		},
		get rows() {
			return rows;
		},
	}));

	return (
		<table {...getTableProps()}>
			<thead>
				{RenderHeader(headerGroups)}
			</thead>
			<tbody {...getTableBodyProps()}>
				{<RenderBody />}
			</tbody>
		</table>
	)
};


export default React.memo(React.forwardRef(BaseGrid));

