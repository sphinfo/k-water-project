import { action, makeObservable, observable } from "mobx";
import WidgetConfig from "./config/WidgetConfig";
import { v4 as uuid } from "uuid";

class WidgetManager {
    _ref = {}
    _instances = []

    constructor() {
        makeObservable(this, {
            _instances: observable,
            add: action,
            changeParam: action,
        });

        window.addEventListener('beforeunload', (event) => {
            delete event['returnValue'];
        });
    }

    _hasInstance(widgetId) {
        const widget = this._instances.find(item => {
            return (item.id === widgetId);
        });
        return widget;
    }


    _isWidget(widgetId) {
        return WidgetConfig.hasOwnProperty(widgetId);
    }

    _widgetMessage(widgetId, msg) {
        console.warn(`${msg} : ${widgetId}`);
    }

    set reference(ref) {
        this._ref = ref;
    }

    get reference() {
        return this._ref;
    }

    getInstance(index = 0) {
        return this._instances[index];
    }

    hasInstance(widgetId) {
        return this._hasInstance(widgetId);
    }

    

    /* 위젯 추가 */
    add(widgetId, props = {}, config = {}, widgetInfo) {
        if (this._isWidget(widgetId)) {

            const havingInstance = this._hasInstance(widgetId);
            if (havingInstance) {
                return;
            }
            const instance = {
                ...WidgetConfig[widgetId], config, ...config,
                id: widgetId,
                guid: uuid(),
                props,
                zIndex: this._zIndex
            };
            this._instances.push(instance);
            this._widgetMessage(widgetId, "sdf");

        } else {
            this._widgetMessage(widgetId, "fff");
        }
    }


    changeParam(widgetId, props = {}) {
        const instance = this._hasInstance(widgetId);
        if (instance) {
            const idx = this._getInstanceIndex(widgetId);
            this._instances[idx] = {...instance, props};
        } else {
            this._widgetMessage(widgetId, "sdf");
        }
    }

}

const MainWidgetManager = new WidgetManager();
export default MainWidgetManager;