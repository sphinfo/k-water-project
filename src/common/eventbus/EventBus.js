const EventBus = { 
    listeners: {},
    addListener: function (type, callback) {
        if (!(type in this.listeners)) {
            this.listeners[type] = [];
        } else {
            this.removeListener(type, callback);
        }

        this.listeners[type].push(callback);
    },
    removeListener: function (type, callback) {
        if (!(type in this.listeners)) {
            return;
        }
        const stack = this.listeners[type];
        for (let i = 0, l = stack.length; i < l; i++) {
            if (stack[i] === callback || stack[i]['name'] === callback['name'] || stack[i].toString() === callback.toString()) {
                stack.splice(i, 1);
                return;
            }
        }
    },
    dispatch: function (event) {
        if (!(event.type in this.listeners)) {
            return true;
        }
        if (this.listeners[event.type]) {
            const stack = this.listeners[event.type].slice();

            for (let i = 0, l = stack.length; i < l; i++) {
                stack[i](event);
            }
        }
        return !event.defaultPrevented;
    }
};

export default EventBus;