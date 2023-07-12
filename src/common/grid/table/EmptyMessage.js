import {memo} from "react";

const EmptyMessage = ({message=''}) => {
	return (
		<tr>
			<td>
				{message}
			</td>
		</tr>
	)
};

export default memo(EmptyMessage);