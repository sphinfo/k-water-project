import React from "react";
import "./App.css";
import CoreMap from "./components/CoreMap";
import { KwaterProvider } from "./ConText";
import OLMapView from "./components/map/OLmapView";
import MapControl from "./components/map/MapControl";
import Menubars from "./components/menu";
//import Yelp from "../../util/Yelp";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {

    console.info("render")
    let render;
    render = (
      // <OlProvider>
      //   <OLMapView />
      //   <MapControl/>
      // </OlProvider>
      <div>
        <KwaterProvider>
          <OLMapView />
          <MapControl/>
          <Menubars/>
        </KwaterProvider>
        
      </div>
    )

    return (
      <div className="App">
        <React.Fragment>
          {render}
        </React.Fragment>
      </div>
    );
  }
}

export default App;
