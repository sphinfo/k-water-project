import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_START_DATE, SET_END_DATE, SEARCH_START, GEO_SEARCH, HOLD_MAP } from "@redux/actions";
import BaseSelectOption from "@common/util/BaseSelectOption";
import BaseDatePicker from "@common/datepicker/BaseDatePicker";
import dayjs from "dayjs";
import BaseDateRangePicker from "@common/datepicker/BaseDateRangePicker";
import { G$flyToPoint } from "@gis/util";
import {Checkbox, FormControlLabel} from "@mui/material";

const BaseSearchOption = () => {

    const namesRef = useRef(['YONGDAM','HWANGGANG','IMNAM','DAECHEONG','ANDONG','UNMUN','YEONGCHEON','SAYEON','SEOUL','DAEJEON','NAESEONGCHEON','MIHOCHEON','WYECHEON'])

    const dispatch = useDispatch()
    const { selectBox, mainOptions, geoSearch } = useSelector(state => state.main)
    const selectRef = useRef()

    useEffect(()=>{
        //selectRef.current.visibleTree = selectBox
    },[selectBox])

    const searchClick = () =>{
        dispatch({type: SEARCH_START})
        if(!geoSearch){
            if(mainOptions.length === 1){
                dispatch({type:HOLD_MAP, holdMap: true})
                G$flyToPoint([mainOptions[0].y, mainOptions[0].x], mainOptions[0].z, undefined, true)
                }else{
                dispatch({type:HOLD_MAP, holdMap: false})
            }
        }else{
            dispatch({type:HOLD_MAP, holdMap: true})
        }

    }

    return (
        <div className="base-search-wrap">
            <div className="content-row">
                <div className="title-logo">
                    <div className="logo">
                        <svg width="50" height="40" viewBox="0 0 40 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0.488281 10.6302H2.01434V13.8237H2.03771L4.62232 10.6302H6.22852L3.35005 13.9412L6.52905 17.9775H4.66573L2.03437 14.4214H2.011V17.9775H0.488281V10.6302Z"
                                fill="white"/>
                            <path
                                d="M15.361 12.9437C15.3476 13.0008 14.5295 16.6677 14.5295 16.6677C14.5295 16.6677 13.2906 12.9941 13.2739 12.9437H12.5894C12.5727 12.9975 11.444 16.7315 11.444 16.7315C11.444 16.7315 10.5123 12.9975 10.499 12.9437H9.27344C9.30015 13.0377 10.6592 17.9236 10.6726 17.9773H11.8247C11.8414 17.9269 12.8832 14.7604 12.8832 14.7604C12.8832 14.7604 14.0419 17.9269 14.0586 17.9773H15.224C15.2374 17.9202 16.4295 13.0344 16.4496 12.9437H15.3543H15.361Z"
                                fill="white"/>
                            <path
                                d="M20.3799 17.1879V17.9736H21.7257V14.5552C21.7257 13.6553 21.4752 12.8225 19.652 12.8225C18.206 12.8225 17.4313 13.3631 17.4146 14.3873H18.8539V14.3437C18.8772 13.9877 18.9173 13.249 19.6386 13.249C20.1595 13.249 20.3799 13.5579 20.3799 14.2832V15.1764H20.3432C19.5685 15.21 17.2109 15.3007 17.2109 16.8453C17.2109 17.5505 17.8654 18.0844 18.7337 18.0844C19.859 18.0844 20.3799 17.1778 20.3799 17.1778V17.1879ZM19.288 17.4263C18.8672 17.4263 18.6034 17.1375 18.6034 16.6707C18.6034 16.073 19.1878 15.7171 20.3399 15.613H20.3799V16.026C20.3799 16.7211 20.0059 17.4263 19.288 17.4263Z"
                                fill="white"/>
                            <path
                                d="M25.3541 18.0916C25.668 18.0916 25.9786 18.0614 26.3092 18.0312H26.3159V17.363C26.1155 17.4167 25.8951 17.4268 25.7181 17.4268C25.1471 17.4268 24.9534 17.2051 24.9534 16.5503V13.4879H26.5262V12.9405H24.9534V10.9795C24.8533 11.0366 23.6444 11.7015 23.6077 11.7216V12.9372H22.5625V13.4845H23.6077V16.7082C23.6077 17.8566 24.2756 18.0883 25.3541 18.0883V18.0916Z"
                                fill="white"/>
                            <path
                                d="M29.6956 18.0911C30.4937 18.0911 30.841 17.9904 31.4654 17.7486V17.2886C31.1683 17.3893 30.7909 17.5001 30.4102 17.5001C28.7673 17.5001 28.2364 15.7473 28.2364 14.8977V14.8608H31.569V14.7063C31.569 13.4907 30.7776 12.8225 29.3417 12.8225C27.7154 12.8225 26.8906 13.6284 26.8906 15.2201C26.8906 17.8091 28.8508 18.0911 29.6923 18.0911H29.6956ZM28.2397 14.3571C28.2898 14.0247 28.4901 13.2523 29.2983 13.2523C30.2466 13.2523 30.2767 14.2496 30.2767 14.3638V14.4007H28.2364L28.243 14.3571H28.2397Z"
                                fill="white"/>
                            <path
                                d="M35.9271 14.0924V12.8298C34.9454 12.9071 34.4612 13.5384 34.0638 14.22L34.0137 14.3006V12.944H32.668V17.9776H34.0137V15.7278C34.0137 14.5625 34.5513 14.0991 35.9271 14.0924V14.0924Z"
                                fill="white"/>
                            <path
                                d="M9.27734 10.5762C13.1409 8.16854 17.6957 6.77835 22.5644 6.77835C27.4331 6.77835 32.0513 8.18869 35.9349 10.6299V7.27868C31.9979 5.13631 27.4998 3.91065 22.7247 3.88379C17.6456 4.87439 13.034 7.20817 9.27734 10.5023V10.5762V10.5762Z"
                                fill="url(#paint0_linear_796_47228)"/>
                            <path
                                d="M9.27734 7.23485V10.5055C13.034 7.21134 17.6423 4.87756 22.7247 3.88696C22.6712 3.88696 22.6178 3.88696 22.5644 3.88696C17.7625 3.88696 13.2377 5.10254 9.27734 7.23821V7.23485Z"
                                fill="white"/>
                            <path
                                d="M28.2278 0.455322C21.3055 0.455322 14.7237 2.66822 9.27734 6.75821V7.23168C13.2377 5.09266 17.7625 3.88044 22.5644 3.88044C22.6178 3.88044 22.6712 3.88044 22.7247 3.88044C24.5078 3.53121 26.3478 3.34988 28.2278 3.34988C32.1448 3.34988 35.8781 4.139 39.2875 5.56613V2.45331C35.8414 1.16049 32.1147 0.455322 28.2278 0.455322Z"
                                fill="url(#paint1_linear_796_47228)"/>
                            <defs>
                                <linearGradient id="paint0_linear_796_47228" x1="8.87893" y1="8.02939" x2="35.9035"
                                                y2="8.02939"
                                                gradientUnits="userSpaceOnUse">
                                    <stop offset="0.4" stopColor="#00B9EF"/>
                                    <stop offset="1" stopColor="#4694D1"/>
                                </linearGradient>
                                <linearGradient id="paint1_linear_796_47228" x1="8.87893" y1="4.56872" x2="39.302"
                                                y2="4.56872"
                                                gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#ED6C00"/>
                                    <stop offset="1" stopColor="#FDD000"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    <div className="logo-type">
                        <h1>수자원위성 활용산출물 통합 표출시스템</h1>
                        <p>Korea Water Resources Satellite Visualization System</p>
                    </div>
                </div>
            </div>

            {/*<div className="content-row" style={{display: geoSearch ? 'none' : ''}}>*/}
            <div className={`content-row content-row-form ${geoSearch ? 'hidden' : ''}`}>
                <div className="form-control">
                    <BaseSelectOption ref={selectRef} provider={namesRef.current}/>
                </div>
            </div>

            <div className="content-row">
                <div className="form-control group">
                    <BaseDateRangePicker onchangeFromat={(date) => {
                        dispatch({type: SET_START_DATE, date: date[0]});
                        dispatch({type: SET_END_DATE, date: date[1]})
                    }}/>
                </div>
            </div>
            <div className="content-row">
                <div className="base-btn-wrap">
                    <FormControlLabel
                        label="현재 영역에서 산출물 검색"
                        control={
                            <Checkbox
                                onChange={(e) => {
                                    dispatch({type: GEO_SEARCH, geoSearch: e.target.checked})
                                }}
                                tabIndex={-1}
                                disableRipple
                                className={'check-box'}
                            />
                        }
                    />
                    <button className="btn" onClick={() => {
                        searchClick()
                    }}>적용
                    </button>
                </div>
            </div>

        </div>
    )
}

export default React.memo(BaseSearchOption)
