import { lazy } from 'react';

const widgets = {
    TestWidget: lazy(() => import('@components/biz/test/TestWidget')),
    TestChartWidget: lazy(() => import('@components/biz/test/TestChartWidget')),

    //안전
    SafetyDisplaceSpeedWidget: lazy(() => import('@components/biz/safety/widget/SafetyDisplaceSpeedWidget')),
    SafetyL4CompWidget: lazy(() => import('@components/biz/safety/widget/SafetyL4CompWidget')),

    LegendWidget: lazy(() => import('@components/legend/LegendWidget')),
    BaseLegendWidget: lazy(() => import('@components/legend/BaseLegendWidget')),
    BaseLegendgGradientWidget: lazy(() => import('@components/legend/BaseLegendgGradientWidget')),

    //홍수
    FloodL4WaterBodyWidget: lazy(() => import('@components/biz/flood/widget/FloodL4WaterBodyWidget')),
    FloodL4WaterLevelWidget: lazy(() => import('@components/biz/flood/widget/FloodL4WaterLevelWidget')),
    
    //가뭄
    DroughtObsrvWidget: lazy(() => import('@components/biz/drought/widget/DroughtObsrvWidget')),

    //환경
    EnvironmentLandCoverWidget: lazy(() => import('@components/biz/environment/widget/EnvironmentLandCoverWidget')),
    
};

/* widget */
const WidgetConfig = {
    'TestWidget': {
        title: '테스트용 위젯',
        style: { top: 70, left: 380, width: 1000, height: 550, position:'absolute', backgroundColor: 'white'},
        instance: widgets.TestWidget
    },
    'TestChartWidget': {
        title: '테스트용 차트 위젯',
        style: { top: 70, left: 350, position:'absolute'},
        instance: widgets.TestChartWidget
    },

    
    'SafetyDisplaceSpeedWidget': {
        title: '변위 속도 위젯',
        style: { top: 0, left: 380, height: 800, position:'absolute'},
        instance: widgets.SafetyDisplaceSpeedWidget
    },


    /**
     * 홍수
     */

    //홍수 - 수체 - 침수 피해 분석
    'FloodL4WaterBodyWidget': {
        title: '침수 피해 분석',
        style: { top: 0, left: 380, height: 800, position:'absolute'},
        instance: widgets.FloodL4WaterBodyWidget
    },

    //홍수 - 수위 - 지점선택
    'FloodL4WaterLevelWidget': {
        title: '수위 분석',
        style: { top: 0, left: 380, height: 800, position:'absolute'},
        instance: widgets.FloodL4WaterLevelWidget
    },
    


    /**
     * 가뭄
     */
    'DroughtObsrvWidget': {
        title: '토양 수분 분석',
        style: { top: 0, left: 380, height: 800, position:'absolute'},
        instance: widgets.DroughtObsrvWidget
    },


    /**
     * 안전
     */
    'SafetyL4CompWidget': {
        title: '지점별 변위 속도 비교',
        style: { top: 0, left: 380, height: 800, position:'absolute'},
        instance: widgets.SafetyL4CompWidget
    },
    


    /**
     * 환경
     */

    'EnvironmentLandCoverWidget': {
        title: '수변 피복 분석',
        style: { top: 0, left: 380, height: 800, position:'absolute'},
        instance: widgets.EnvironmentLandCoverWidget
    },
    


};


/* 범례 */
const LegendWWidgetConfig = {
    'LegendWidget': {
        title: 'LegendWidget',
        legend: true,
        style: {  position:'absolute'},
        instance: widgets.LegendWidget
    },
    'BaseLegendWidget': {
        title: 'BaseLegendWidget',
        legend: true,
        style: {  position:'absolute'},
        instance: widgets.BaseLegendWidget
    },
    'BaseLegendgGradientWidget': {
        title: 'BaseLegendGradientWidget',
        legend: true,
        style: {  position:'absolute'},
        instance: widgets.BaseLegendgGradientWidget
    },
}

export default {
    ...WidgetConfig,
    ...LegendWWidgetConfig,
}
