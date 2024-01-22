import { lazy } from 'react';

const widgets = {

    //안전
    SafetyDisplaceSpeedWidget: lazy(() => import('@components/biz/safety/widget/SafetyDisplaceSpeedWidget')),
    SafetyL4CompWidget: lazy(() => import('@components/biz/safety/widget/SafetyL4CompWidget')),
    SafetyL4LevelDataWidget: lazy(() => import('@components/biz/safety/widget/SafetyL4LevelDataWidget')),

    BaseAddLegendWidget: lazy(() => import('@components/legend/BaseAddLegendWidget')),
    LegendWidget: lazy(() => import('@components/legend/LegendWidget')),
    BaseLegendWidget: lazy(() => import('@components/legend/BaseLegendWidget')),
    BaseLegendgGradientWidget: lazy(() => import('@components/legend/BaseLegendgGradientWidget')),
    BaseLegendgGradientWidget2: lazy(() => import('@components/legend/BaseLegendgGradientWidget2')),

    //홍수
    FloodL4WaterBodyWidget: lazy(() => import('@components/biz/flood/widget/FloodL4WaterBodyWidget')),
    FloodL4WaterLevelWidget: lazy(() => import('@components/biz/flood/widget/FloodL4WaterLevelWidget')),
    
    //가뭄
    DroughtObsrvWidget: lazy(() => import('@components/biz/drought/widget/DroughtObsrvWidget')),

    //환경
    EnvironmentLandCoverWidget: lazy(() => import('@components/biz/environment/widget/EnvironmentLandCoverWidget')),
    EnvironmentGarbageWidget: lazy(() => import('@components/biz/environment/widget/EnvironmentGarbageWidget')),
    EnvironmentGreenWidget: lazy(() => import('@components/biz/environment/widget/EnvironmentGreenWidget')),
    EnvironmentAraeWidget: lazy(() => import('@components/biz/environment/widget/EnvironmentAraeWidget')),
};

/* widget */
const WidgetConfig = {

    
    'SafetyDisplaceSpeedWidget': {
        title: '변위 속도 위젯',
        instance: widgets.SafetyDisplaceSpeedWidget
    },


    /**
     * 홍수
     */

    //홍수 - 수체 - 침수 피해 분석
    'FloodL4WaterBodyWidget': {
        title: '침수 피해 분석',
        instance: widgets.FloodL4WaterBodyWidget
    },

    //홍수 - 수위 - 지점선택
    'FloodL4WaterLevelWidget': {
        title: '수위 분석',
        instance: widgets.FloodL4WaterLevelWidget
    },
    


    /**
     * 가뭄
     */
    'DroughtObsrvWidget': {
        title: '토양 수분 분석',
        instance: widgets.DroughtObsrvWidget
    },


    /**
     * 안전
     */
    'SafetyL4CompWidget': {
        title: '지점별 변위 속도 비교',
        instance: widgets.SafetyL4CompWidget
    },
    'SafetyL4LevelDataWidget': {
        title: '변위 등급',
        instance: widgets.SafetyL4LevelDataWidget
    },
    
    


    /**
     * 환경
     */

    'EnvironmentLandCoverWidget': {
        title: '수변 피복 분석',
        instance: widgets.EnvironmentLandCoverWidget
    },
    'EnvironmentGarbageWidget': {
        title: '부유물 정보',
        instance: widgets.EnvironmentGarbageWidget
    },
    'EnvironmentGreenWidget': {
        title: '녹조 정보',
        instance: widgets.EnvironmentGreenWidget
    },

    'EnvironmentAraeWidget':  {
        title: '',
        instance: widgets.EnvironmentAraeWidget
    },
    
    


};


/* 범례 */
const LegendWWidgetConfig = {
    
    'BaseAddLegendWidget':{
        title: 'LegendWidget',
        legend: true,
        style: {  position:'absolute'},
        instance: widgets.BaseAddLegendWidget
    },

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
    'BaseLegendgGradientWidget2': {
        title: 'BaseLegendGradientWidget',
        legend: true,
        style: { position:'absolute', bottom: '150px'},
        instance: widgets.BaseLegendgGradientWidget2
    },
    
}

export default {
    ...WidgetConfig,
    ...LegendWWidgetConfig,
}

