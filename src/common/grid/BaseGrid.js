import React, { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { useTable, useSortBy } from 'react-table'
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

	const [highlight, setHighlight] = useState(false)

	/* react table */
	const {  
		getTableProps, 
		getTableBodyProps, 
		headerGroups, 
		rows, 
		prepareRow 
	} = useTable({ columns, data }, useSortBy);


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
                    <th {...column.getHeaderProps(column.getSortByToggleProps())} className={`${highlight && column.id === highlight ? highlight : ''}`}>
                        {column.render("Header")}
                        <span>
                            {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                        </span>
                    </th>
                ))}
            </tr>
        ))
    }, [highlight])


	// Body Render
	const RenderBody = useCallback(() => {
		
		return (
			<>
				{rows.length > 0 && rows.map((row, i) => {
					prepareRow(row);
					let rowIdx = i
					const properties = { row, rowIdx, highlight, ...bodyProps };
					return (
						<BodyRow key={`bodyRow_${i}`} {...properties}/>
					);
				})}
				{
					rows.length === 0 && <EmptyMessage message={'데이터가 존재하지 않습니다.'}/>
				}
			</>
		)
	}, [ rows, prepareRow, highlight ]);
	

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

		set highlight(col){
			setHighlight(col)
		}
	}));

	return (
		<table {...getTableProps()} className={className}>
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

