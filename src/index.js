import ReactDOM from "react-dom/client";
import './resources/scss/index.scss';
import reportWebVitals from "./reportWebVitals";
import KwaterApp from "./KwaterApp";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // 두번 렌더링되는 이유 때문에 StrictMode는 주석처리함
  //<React.StrictMode>
  <KwaterApp />
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
