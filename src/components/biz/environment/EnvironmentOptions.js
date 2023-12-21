import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ENV_SET_TEXT, ENV_START_DATE, ENV_END_DATE } from "@redux/actions";
import BaseSelectOption from "@common/util/BaseSelectOption";
import BaseDatePicker from "@common/datepicker/BaseDatePicker";
import dayjs from "dayjs";

import ADD from "@images/ADD_one_figure.png"
import CNHMB from "@images/CNHMB_one_figure.png"
import DJ from "@images/DJ_one_figure.png"
import DCD from "@images/DCD_one_figure.png"
import SJB from "@images/SJB_one_figure.png"
import SYD from "@images/SYD_one_figure.png"
import SYGD from "@images/SYGD_one_figure.png"
import UMD from "@images/UMD_one_figure.png"
import YDD from "@images/YDD_one_figure.png"

const EnvironmentOptions = () => {

    const namesRef = useRef([
        {
            name:'댐', 
            code:'DAM',
            items: [
                {name:'용담댐', code:'YONGDAM', x:35.9449283, y:127.5246387, z: 35000, xmin: 127.22692739874623, ymin: 35.77281149769304, xmax: 127.7857552328893, ymax: 36.01009776065693, data:[38684800,	33514600,	196375800,	720103600,	13928000], img: YDD},
                {name:'대청댐', code:'DAECHEONG', x:36.4775000, y:127.4808330, z: 35000, xmin: 127.22924890169264, ymin: 36.311540601990295, xmax: 127.76100028250217, ymax: 36.535801397391765, data:[77435600,	64474000,	223973100,	464880200,	75708500], img: DCD},
                {name:'안동댐', code:'ANDONG', x:36.5848765, y:128.7739109, z: 35000, xmin: 128.40710758959597, ymin: 36.43154992312028, xmax: 129.20411552482912, ymax: 36.76666637977058, data:[94998600,	183578700,	346660300,	1014115700,	20827600], img: ADD},
                {name:'운문댐', code:'UNMUN', x:35.7240461, y:128.9271935, z: 35000,  xmin: 128.7701224190297, ymin: 35.6601755367662, xmax: 129.08348908785123, ymax: 35.79360233550989, data:[8555500,	11694500,	47919600,	173438400,	1725200], img: UMD},
                {name:'사연댐', code:'SAYEON', x:35.5800118, y:129.1957466, z: 35000, xmin: 129.10610656368257, ymin: 35.55608749038927, xmax: 129.26751087118762, ymax: 35.62495749231511, data:[2579200,	4873500,	23816800,	66608400,	4092800], img: SYD},
                {name:'소양강댐', code:'SOYANG', xmin: 127.4462544254767, ymin: 37.793247904320715, xmax: 128.23474130788537, ymax: 38.118793868444484, data:[121750300,	112089700,	207180700,	1021741500,	25970200], img: SYGD}
            ]
        },
        {
            name:'보', 
            code: 'BO',
            items: [
                {name:'세종보', code:'SEJONG', xmin: 127.10054286588493, ymin: 36.40875849762677, xmax: 127.44005307680925, ymax: 36.55191269290225, data:[10341900,	44946700,	140272800,	172053500,	32583000], img:SJB},
                {name:'창녕함안보', code:'CHANGNYEONG',  xmin: 128.23054205214018, ymin: 35.222555774259774, xmax: 128.93072643474136, ymax: 35.5217123414535, data:[70690300,	103931500,	556539300,	849101200,	84207200], img:CNHMB}
            ]
        },
        {
            name:'도시', 
            code: 'CITY',
            items: [
                {name:'대전', code:'DAEJEON', xmin: 126.98873648826219, ymin: 36.15933390289624, xmax: 127.82141527517102, ymax: 36.51062071870238, data:[104317700,	126448500,	699079400,	1072477700,	132470300], img:DJ},
            ]
        },
        {
            name:'하천', 
            code: 'RIVER',
            items: [
                {name:'미호강', code:'MIHOCHEON'},
            ]
        // },{
        //     name: '지역',
        //     code: 'AREA',
        //     items: [
        //         {name:'충청', code:'ar3'},
        //         {name:'경상', code:'ar5'},
        //         {name:'전라', code:'ar4'},
        //         {name:'강원', code:'ar2'},
        //     ]
          }
    ])

    const dispatch = useDispatch()
    const { startDate, endDate, selectBox } = useSelector(state => state.environment)
    const selectRef = useRef()

    useEffect(()=>{
        if(selectBox !== 'off'){
            selectRef.current.visibleTree = true
        }
    },[selectBox])
    return (
        <>
        <div className={"content-block"}>
            <div className="content-row">
                <div className="content-row-header">
                    <h2 className="content-row-title">검색</h2>
                </div>
                <div className="form-control">
                    <BaseSelectOption ref={selectRef} provider={namesRef.current} changeItem={(item)=>{dispatch({type: ENV_SET_TEXT, text: item})}}/>
                </div>
            </div>
            
            <div className="content-row">
                <div className="content-row-header">
                    <h2 className="content-row-title">기간 설정</h2>
                </div>
                <div className="form-control group">
                    <BaseDatePicker date={dayjs('20100101')} maxDate={endDate} onchangeFromat={(date)=>{dispatch({type: ENV_START_DATE, date})}}/>
                    <span>~</span>
                    <BaseDatePicker minDate={startDate} onchangeFromat={(date)=>{dispatch({type: ENV_END_DATE, date})}}/>
                </div>
            </div>
            
        </div>
            
        </>
    )
}

export default React.memo(EnvironmentOptions);
