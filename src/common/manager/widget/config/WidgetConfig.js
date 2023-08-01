import { lazy } from 'react';
const widgets = {
    TestWidget: lazy(() => import('@cmp/biz/water-body/widget/TestWidget')),
    TestWidget2: lazy(() => import('@cmp/biz/water-body/widget/TestWidget2')),

    TimeSeriesSoilChartWidget: lazy(() => import('@cmp/exampleWidget/TimeSeriesSoilChartWidget')),
    SoilMoistureChartWidget: lazy(() => import('@cmp/exampleWidget/SoilMoistureChartWidget')),
    FacDetailWidget: lazy(() => import('@cmp/exampleWidget/FacDetailWidget')),

    LegendWidget: lazy(() => import('@cmp/map/bottom/LegendWidget')),
    
};

/* widget */
const WidgetConfig = {
    'TestWidget': {
        title: '테스트용 위젯',
        style: { top: 70, left: 350, width: 1000, height: 550, position:'absolute', backgroundColor: 'white'},
        instance: widgets.TestWidget
    },
    'TestWidget2': {
        title: '테스트용 위젯2',
        style: { top: 70, left: 350, width: 1000, height: 550, position:'absolute', backgroundColor: 'white'},
        instance: widgets.TestWidget2
    },




    'TimeSeriesSoilChartWidget': {
        title: '시계열 토양수분 및 강수량',
        style: { top: 70, left: 450, width: 700, height: 350, position:'absolute', backgroundColor: 'white'},
        instance: widgets.TimeSeriesSoilChartWidget
    },

    'SoilMoistureChartWidget': {
        title: '시계열 토양수분 및 강수량',
        style: { top: 70, left: 350, width: 250, height: 450, position:'absolute', backgroundColor: 'white'},
        instance: widgets.SoilMoistureChartWidget
    },

    'FacDetailWidget': {
        title: '시계열 토양수분 및 강수량',
        style: { top: 70, left: 350, width: 250, height: 450, position:'absolute', backgroundColor: 'white'},
        instance: widgets.FacDetailWidget
    }
};


/* 범례 */
const LegendWWidgetConfig = {
    'LegendWidget': {
        title: 'LegendWidget',
        legend: true,
        style: { width: 400, height: 100, position:'absolute', backgroundColor: 'white'},
        instance: widgets.LegendWidget
    }
}

export default {
    ...WidgetConfig,
    ...LegendWWidgetConfig,
}
