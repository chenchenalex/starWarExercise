import React from "react";
import store from "./store";
import SWTable from "./scene/homePage";
import { Provider } from "react-redux";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <SWTable />
      </div>
    </Provider>
  );
}

export default App;
