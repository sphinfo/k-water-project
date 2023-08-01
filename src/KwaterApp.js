import React from "react";
import "./App.css";
import OLMapView from "./components/map/OLmapView";
import MapControl from "./components/map/MapControl";
import Menubars from "./components/menu";
import WidgetContainer from "./common/manager/widget/container/WidgetContainer";

const USER_CONFIRMING = 'CONFIRMING'
const USER_CONFIRM = 'CONFIRM'
const USER_FAIL = 'FAIL'

class KwaterApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {chk: USER_CONFIRMING};

    if(!localStorage.getItem("token")){
      setTimeout(() => {
        localStorage.setItem("token", 'tokentokentokentoken');
        this.setState({chk: USER_CONFIRM})
      }, 2000)
    }else{
      this.state = {chk: USER_CONFIRM};
    }

  }

  render() {
    let render;
    
    if (this.state.chk === USER_CONFIRMING) {
      render = (<div> 로딩중 로딩중 로딩중 로딩중 로딩중 로딩중 로딩중 로딩중 로딩중 로딩중 </div>)
    }else{
      render = (
        <>
          <OLMapView />
          <MapControl/>
          <WidgetContainer />
          <Menubars/>
        </>
      )
    }

    return (
      <div className="App">
        <React.Fragment>
          {render}
        </React.Fragment>
      </div>
    );
  }
}

export default KwaterApp;
