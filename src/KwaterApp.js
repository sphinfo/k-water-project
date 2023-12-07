import React from "react";
import CesiumMapView from "./components/map/CesiumMapView";
import WidgetContainer from "./common/widget/container/WidgetContainer";
import MapControl from "./components/map/MapControl";
import Menubars from "@components/menu";
import { Provider } from 'react-redux'; // useSelector 추가
import store from '@redux/store';
import ThematicLayerComponent from "@components/map/right/thematic/ThematicLayerComponent";
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: [
      "Pretendard", "-apple-system", "BlinkMacSystemFont",
      "system-ui", "Roboto", "Helvetica Neue", "Segoe UI",
      "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic",
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "sans-serif"
    ].join(','),
  },});

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
      <ThemeProvider theme={theme}>
        <div className="App">
          <React.Fragment>
            <Provider store={store}>
              {render}
            </Provider>
          </React.Fragment>
        </div>
      </ThemeProvider>
    );
  }
}

export default KwaterApp;
