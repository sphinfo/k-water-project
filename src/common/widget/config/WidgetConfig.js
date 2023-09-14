import { lazy } from 'react';

const widgets = {
    TestWidget: lazy(() => import('@components/biz/test/TestWidget')),
    TestChartWidget: lazy(() => import('@components/biz/test/TestChartWidget')),

    LegendWidget: lazy(() => import('@components/legend/LegendWidget')),
    
};

/* widget */
const WidgetConfig = {
    'TestWidget': {
        title: '테스트용 위젯',
        style: { top: 70, left: 350, width: 1000, height: 550, position:'absolute', backgroundColor: 'white'},
        instance: widgets.TestWidget
    },
    'TestChartWidget': {
        title: '테스트용 차트 위젯',
        style: { top: 70, left: 350, position:'absolute'},
        instance: widgets.TestChartWidget
    },
};


/* 범례 */
const LegendWWidgetConfig = {
    'LegendWidget': {
        title: 'LegendWidget',
        legend: true,
        style: { width: 111, height: 300, left:750, top:50, position:'absolute', backgroundColor: 'white'},
        instance: widgets.LegendWidget
    }
}

export default {
    ...WidgetConfig,
    ...LegendWWidgetConfig,
}
