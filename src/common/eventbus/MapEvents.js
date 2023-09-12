const MapEvents = { 
    //맵에 레이어 추가
    addLayer: 'add_layer',
    //맵에 레이어 삭제
    removeLayer: 'remove_Layer',
    //지도 위에서 마우스가 움직일때
    mouseMove: 'mouse_move',
    //지도 이동 end
    mapMoveEnd: 'map_move_end',
    //지도 스케일이 변경되었을때
    changeMapScale: 'change_map_scale',
    changeMapViewScale: 'change_mapview_scale',
    //지도 기본지도가 변경되었을때
    changeBaseMap: 'change_base_map',
    // 그리기 도구가 활성화 시킬때
    createSketch: 'create_sketch',
    // 그리기 도구에서 선을 그렸을때
    drawGraphicLine: 'draw_graphic_line',
    // 그리기 도구에서 면을 그렸을때
    drawGraphicPolygon: 'draw_graphic_polygon',
    // map view 인스턴스를 요청
    getView: 'get_view',
    // 면데이터의 면적을 구할때
    getMeasurementPolygon: 'get_measurement_polygon',
    // 선 데이터의 길이를 구할때
    getMeasurementPolyline: 'get_measurement_polyline',
    // 그리기중에 지도에 클릭이 되었을때
    mapViewClickedForDraw: 'map_view_clicked_for_draw',
    // 거리를 계산할때
    measuringDistance: 'measuring_distance',
    // 면적을 계산할때
    measuringArea: 'measuring_area',
    // 그리기 모드중 그리기가 끝났을때
    drawEndSketch: 'draw_end_sketch',
    // 그리기 모드를 종료해줘
    removeMeasurement: 'remove_measurement',
    // 위젯 오픈
    openBizWidget: 'open_biz_widget',
    // 지도가 클릭되었을때
    mapViewClicked: 'map_view_clicked',
    // 지도를 파라메터 좌표로 이동
    moveToCoord: 'move_to_coord',
    // Defrct Grid 를 지도에 그려줘
    showDefectGrid: 'show_defect_grid',
    // Defrct Grid 를 지도에서 삭제
    moveDefectGrid: 'move_gefect_grid',
    // progressBar 보이기
    progressShow: 'progress_show',
    // progressBar 닫기
    progressHide: 'progress_hide',
    // naverAPIMap 끄고 켜기
    showNaverApiMap: 'show_naverapi_map',
    // naverAPIMap 좌표이동
    setCenterForNaverApiMap: 'set_center_for_naverapi_map',
    // naverAPIMap 줌
    setZoomForNaverApiMap: 'set_Zoom_for_naverapi_map',
    // naverAPIMap 초기화 완료되었을때
    naverApiMapInitEnd: 'naverapi_map_init_end',

    doubleClick: 'double-click',

    // 지도 pan 완료되었을때
    mapPanEnd: 'map_pan_end',

    mapUpdateAll: 'map_update_all',
    mapUpdateAllForPrint: 'map_update_all_for_print',
    mapLoadingShow: 'map_loading_show',
    mapLoadingHide: 'map_loading_hide',
    mapLoadingStatus: 'map_loading_status',

    mapLevelWarningHide: 'map_level_Warning_hide',
    mapLevelWarningShow: 'map_level_Warning_show',
    mapLevelWarningStatus: 'map_loading_Warning_status',

    zoomEnd: 'zoom_end',
};

export default MapEvents;
