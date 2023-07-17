import { lazy } from 'react';
const widgets = {
    TestWidget: lazy(() => import('@cmp/biz/water-body/widget/TestWidget')),
    TestWidget2: lazy(() => import('@cmp/biz/water-body/widget/TestWidget2'))
};

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
    }
};

export default {
    ...WidgetConfig
}
