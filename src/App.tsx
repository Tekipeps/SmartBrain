import React from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
function App() {
  return (
    <div className="App">
      <Navigation />
      <Logo>
        <Rank />
      </Logo>

      <ImageLinkForm />
      {/* <FaceRecogniton /> */}
    </div>
  );
}

export default App;
