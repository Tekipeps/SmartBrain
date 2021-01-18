import React from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Particles from "react-particles-js";
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "ca95d6f5a3cb480f85bf4d65fe5dc41e",
});

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
  const onButtonSubmit = () => {
    // console.log(`click ${input}`);
    app.models
      .predict(
        "d02b4508df58432fbb84e800597b8959",
        "https://samples.clarifai.com/face-det.jpg"
      )
      .then(function (response: any) {
        console.log(response);
      })
      .catch((error: any) => console.log(error));
  };
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
