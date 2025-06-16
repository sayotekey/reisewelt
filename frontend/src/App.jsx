// import { useState } from "react";

import "./App.css";
import HeaderComponent from "./components/HeaderComponent";
import MainComponent from "./components/MainComponent";
import FooterComponent from "./components/FooterComponent.jsx";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <HeaderComponent />
      <MainComponent />
      <FooterComponent />
    </>
  );
}

export default App;
