import { lazy } from 'react';

const widgets = {
    TestWidget: lazy(() => import('@components/biz/test/TestWidget')),
    TestChartWidget: lazy(() => import('@components/biz/test/TestChartWidget')),

    //안전
    SafetyDisplaceSpeedWidget: lazy(() => import('@components/biz/safety/widget/SafetyDisplaceSpeedWidget')),

    LegendWidget: lazy(() => import('@components/legend/LegendWidget')),
    BaseLegendWidget: lazy(() => import('@components/legend/BaseLegendWidget')),
    BaseLegendgGradientWidget: lazy(() => import('@components/legend/BaseLegendgGradientWidget')),
    
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
