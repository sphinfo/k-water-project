import { lazy } from 'react';
const widgets = {
    TestWidget: lazy(() => import('../../../../../components/biz/water-detection/TestWidget')),
    TestWidget2: lazy(() => import('../../../../../components/biz/water-detection/TestWidget2'))
};

const WidgetConfig = {
    'TestWidget': {
        title: '테스트용 위젯',
        style: { y: 70, x: 100, width: 1000, height: 550},
        instance: widgets.TestWidget
    },
    'TestWidget2': {
        title: '테스트용 위젯',
        style: { y: 70, x: 100, width: 1000, height: 550},
        instance: widgets.TestWidget2
    }
};

export default {
    ...WidgetConfig
}
