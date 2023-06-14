import { action, makeObservable, observable } from "mobx";
import WidgetConfig from "./config/WidgetConfig";
import { v4 as uuid } from "uuid";

class WidgetManager {
    _instances = []
    
    constructor() {
 
        makeObservable(this, {
            _instances: observable,
            add: action
        });

    }


    set reference(ref) {
        this._ref = ref;
    }

    get reference() {
        return this._ref;
    }

    _hasInstance(widgetId) {
        const widget = this._instances.find(item => {
            return (item.id === widgetId);
        });
        return widget;
    }

    /* widget 확인 */
    _isWidget(widgetId) {
        return WidgetConfig.hasOwnProperty(widgetId);
    }

    /* widget idx */
    _getInstanceIndex(widgetId) {
        let index = 0;
        this._instances.some((itme, idx) => {
            if (itme.id === widgetId) {
                index = idx;
                return true;
            }
            return false;
        });
        return index;
    }

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

        }
    }

    changeParam(widgetId, props = {}) {
        const instance = this._hasInstance(widgetId);
        if (instance) {
            const idx = this._getInstanceIndex(widgetId);
            this._instances[idx] = {...instance, props};
        }
    }

}
export default new WidgetManager();