import React from "react";

import Home from "./layout/Home";
import Navbar from "./layout/Navbar";

import "../index.css";

const App = () => {
  return (
    <React.Fragment>
      <Home />
      <Navbar />
    </React.Fragment>
  );
};

export default App;
