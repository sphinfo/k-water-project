import React from 'react';
// 자식 컴포넌트들에게 Store 를 넘겨주기 위한 함수
import KwaterStore from './openlayers/stores/KwaterStore';

/* Map Contenxt*/
export const KwaterContext = React.createContext(KwaterStore);

// Component HOC
// Store 를 자식 컴포넌트에게 넘겨준기 위한 함수
export const KwaterComponent = (Component) => {
    return class WrapComponent extends React.Component {
        static contextType = KwaterContext;
        render() {
            if (typeof Component === 'string') {
                return <Component {...this.props}/>;
            } else {
                return <Component store={KwaterStore} {...this.props}/>;
            }
        }

    };
}

export const KwaterProvider = ({children}) => {
    return (
        <KwaterContext.Provider value={KwaterStore}>
            {
                React.Children.map(children, (child => {
                    const Component = KwaterComponent(child.type);
                    return (
                        <Component {...child.props} />
                    );
                }))
            }
        </KwaterContext.Provider>
    );
};