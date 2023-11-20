import React, {useRef} from "react";
import { useCallback } from "react";

const BodyRow = ({row, rowIdx, onRowClick, onCellClick}) => {

	const rowRef = useRef();
	const cellRef = useRef()

	const onClicked = useCallback((cell, cellIdx) => {
		if(onCellClick){
			onCellClick(cell.value, cell, cellRef.current);
		}
		(onRowClick && onRowClick(cell.row, cell, rowRef.current));
	},[onCellClick, onRowClick]);

	return (
		<tr ref={rowRef} {...row.getRowProps()} >
			{row.cells.map((cell, cellIdx) => (
				<td ref={cellRef} 
				onClick={() => onClicked(cell, cellIdx)}
				{...cell.getCellProps()}>
					{cell.render("Cell")}
				</td>
			))}
		</tr>
	);
};

export default BodyRow;