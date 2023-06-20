import React, {useCallback, useEffect, useImperativeHandle, useMemo, useState} from "react";
import {FormControl} from "@material-ui/core";
import WindowedSelect from "react-windowed-select";

const BaseCombo = (props, ref) => {


	return (
		<FormControl >
			<WindowedSelect />
		</FormControl>
	);
};

export default React.forwardRef(BaseCombo);