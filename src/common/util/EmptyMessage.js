import {memo} from "react";

const EmptyMessage = ({message=''}) => {
	return (
		<tr style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
			<td>
				{message}
			</td>
		</tr>
	)
};

export default memo(EmptyMessage);