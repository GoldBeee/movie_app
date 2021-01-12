import React from "react";
import ReactDOM from "react-dom";
import App from "./App"; // ./ 의 의미는 같은 directory에 있다는 뜻. index.js와 app.js는 같은 src디렉토리에 있으므로 ./을 써줌!

//react application은 하나의 component(ex.App, Potato 등)만을  rendering 함.
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
