import { lazy } from 'react';

const widgets = {
    TestWidget: lazy(() => import('@components/biz/test/TestWidget')),
    TestChartWidget: lazy(() => import('@components/biz/test/TestChartWidget')),
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
        style: { top: 70, left: 350, width: 220, height: 320, position:'absolute', backgroundColor: 'white'},
        instance: widgets.TestChartWidget
    },
};


/* 범례 */
const LegendWWidgetConfig = {
    // 'LegendWidget': {
    //     title: 'LegendWidget',
    //     legend: true,
    //     style: { width: 400, height: 100, position:'absolute', backgroundColor: 'white'},
    //     instance: widgets.LegendWidget
    // }
}

export default {
    ...WidgetConfig,
    ...LegendWWidgetConfig,
}
