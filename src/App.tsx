import React from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Particles from "react-particles-js";

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};
function App() {
  const [input, setInput] = React.useState<string>("");
  const onButtonSubmit = () => {};
  return (
    <div className="App">
      <Navigation />
      <Particles className="particles" params={particlesOptions} />
      <Logo>
        <Rank />
      </Logo>

      <ImageLinkForm
        onButtonSubmit={onButtonSubmit}
        input={input}
        setInput={setInput}
      />
      {/* <FaceRecogniton /> */}
    </div>
  );
}

export default App;
