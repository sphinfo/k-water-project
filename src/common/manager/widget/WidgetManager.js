//import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { makeAutoObservable } from "mobx";
import WidgetConfig from "./config/WidgetConfig";
import { v4 as uuid } from "uuid";

const NOT_FOUND_MSG = 'Not Found Widget';
const OPEN_MSG = 'Open Widget';
const CLOSE_MSG = 'Close Widget';

class WidgetManager {
    _ref = {}
    _instances = []

    constructor() {
        makeAutoObservable(this);
        /*makeObservable(this, {
            _instances: observable,
            add: action,
            changeParam: action,
        });*/

        window.addEventListener('beforeunload', (event) => {
            delete event['returnValue'];
        });
    }

    /* widget 찾기 */
    _hasInstance(widgetId) {
        const widget = this._instances.find(item => {
            return (item.id === widgetId);
        });
        return widget;
    }


    _isWidget(widgetId) {
        return WidgetConfig.hasOwnProperty(widgetId);
    }

    /*  */
    _widgetMessage(widgetId, msg) {
        console.warn(`${msg} : ${widgetId}`);
    }

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

    

    set reference(ref) {
        this._ref = ref;
    }

    get reference() {
        return this._ref;
    }

    getInstance(index = 0) {
        return this._instances[index];
    }

    /* get instnace */
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
            this._widgetMessage(widgetId, OPEN_MSG);

        } else {
            this._widgetMessage(widgetId, NOT_FOUND_MSG);
        }
    }

    /* 위젯 삭제 */
    remove(widgetId) {
        if (this._hasInstance(widgetId)) {
            const idx = this._getInstanceIndex(widgetId);
            if (idx > -1) {
                const [removeWidget] = this._instances.splice(idx, 1);
                console.info(removeWidget)
            }
            this._widgetMessage(widgetId, CLOSE_MSG);
        } else {
            this._widgetMessage(widgetId, NOT_FOUND_MSG);
        }
    }


    changeParam(widgetId, props = {}) {
        const instance = this._hasInstance(widgetId);
        if (instance) {
            const idx = this._getInstanceIndex(widgetId);
            this._instances[idx] = {...instance, props};
        } else {
            this._widgetMessage(widgetId, NOT_FOUND_MSG);
        }
    }

}

const MainWidgetManager = new WidgetManager();
export default MainWidgetManager;