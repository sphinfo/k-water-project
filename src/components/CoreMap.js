import {Component} from "react";

import OlMap from "ol/Map";
import OlView from "ol/View";
import OlLayerTile from "ol/layer/Tile";
import OlSourceOSM from "ol/source/OSM";
import {fromLonLat} from 'ol/proj';


class CoreMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
        center:fromLonLat([127.920580, 36.32540779])
        ,zoom: 10
    };

    this.map = new OlMap({
        target: null,
        layers: [
          new OlLayerTile({
              source: new OlSourceOSM()
          })
      ],
        view: new OlView({
            center: this.state.center,
            zoom: this.state.zoom
        })
    })
  }


  //
  componentDidMount() {

    this.map.setTarget("map");

    this.setMapEvent();
    
  }

  //지도 기본 이벤트
  setMapEvent(){

    //지도 마우스 포인터 이벤트
    this.map.on('pointermove',function(event){
        event.preventDefault();
    });

    //
    this.map.on('change:size', function(event) {
        event.preventDefault();
    });

    //
    this.map.on('click', function(event) {
        event.preventDefault();
    })

    //
    this.map.on('moveend', function(event) {
        event.preventDefault();
    })

  }

  render() {
    return (
      <div id="map" style={{ width: "100%", height: "920px" }}>
      </div>
    );
  }
}

export default CoreMap;