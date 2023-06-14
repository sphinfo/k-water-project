import React from 'react';
// 자식 컴포넌트들에게 Store 를 넘겨주기 위한 함수
import OlStore from './openlayers/stores/OlStore';

/* Map Contenxt*/
export const OlContext = React.createContext(OlStore);

// Component HOC
// Store 를 자식 컴포넌트에게 넘겨준기 위한 함수
export const OlComponent = (Component) => {
    return class WrapComponent extends React.Component {
        static contextType = OlContext;

        render() {

            if (typeof Component === 'string') {

                return <Component {...this.props}/>;
            } else {
                return <Component store={OlStore} {...this.props}/>;
            }
        }

    };
}

export const OlProvider = ({children}) => {

    return (
        <OlContext.Provider value={OlStore}>
            {
                React.Children.map(children, (child => {
                    const Component = OlComponent(child.type);
                    return (
                        <Component {...child.props} />
                    );
                }))
            }
        </OlContext.Provider>
    );
};