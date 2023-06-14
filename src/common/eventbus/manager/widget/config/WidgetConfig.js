import { lazy } from 'react';
const widgets = {
    TestWidget: lazy(() => import('../../../../../components/biz/water-detection/TestWidget'))
};

const WidgetConfig = {
    'TestWidget': {
        title: '테스트용 위젯',
        style: { y: 70, x: 100, width: 1000, height: 550},
        instance: widgets.TestWidget
    }
};

export default {
    ...WidgetConfig
}
