import {memo} from "react";

const EmptyMessage = ({message=''}) => {
	return (
		<tr>
			<td colSpan={3}>
				{message}
			</td>
		</tr>
	)
};

export default memo(EmptyMessage);