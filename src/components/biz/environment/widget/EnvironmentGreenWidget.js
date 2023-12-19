import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
/**
 * 환경 녹조 레이어 선택
 */

const EnvironmentGreenWidget = () => {
    /**
     * selectEnvironmentLayer: 수변피복 레이어 선택
     */
    const { selectEnvironmentLayer } = useSelector(state => state.environment)
    

    //레이어 변경시 reset
    useEffect(()=>{

        if(selectEnvironmentLayer){
            /**녹조 데이터 api*/
        }

    },[selectEnvironmentLayer])


    return (
        <div className="content-body">
            <div className="content-row">
                <div className="panel-box">
                    <div className="number-dashboard number-dashboard-min">
                        <div className="nd-item">
                            <h4 className="nd-item-title">전체 녹조 면적</h4>
                            <div className="nd-item-body">145,963 ㎡</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content-row">
                <div className="panel-box">
                    <div className="table-wrap" style={{maxHeight: 360, overflowY: 'auto'}}>
                        <table className="table-basic env-table">
                            <thead>
                            <tr>
                                <th>No.</th>
                                <th>BBOX (minX, minY, maxX, maxY )</th>
                                <th>녹조 면적</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>127.5055, 36.414621, 127.50965, 36.410489 </td>
                                <td>145,963 ㎡</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(EnvironmentGreenWidget);
