import React from "react";
import "./App.css";
import CesiumMapView from "./components/map/CesiumMapView";
import WidgetContainer from "./common/widget/container/WidgetContainer";
import MapControl from "./components/map/MapControl";
import Menubars from "@components/menu";
import { Provider } from 'react-redux'; // useSelector 추가
import store from '@redux/store';
import ThematicLayerComponent from "@components/map/right/thematic/ThematicLayerComponent";

class KwaterApp extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let render;
    render = (
      <>
        <CesiumMapView />    {/* map */}
        <WidgetContainer />  {/* widget Popup */}
        <MapControl />

        <ThematicLayerComponent /> {/* 주제도 */}
        <canvas id="pieChartCanvas"></canvas>
        {/* <Menubars /> */}
      </>
    )

    return (
      <div className="App">
        <React.Fragment>
          <Provider store={store}>
            {render}
          </Provider>
        </React.Fragment>
      </div>
    );
  }
}

export default KwaterApp;
