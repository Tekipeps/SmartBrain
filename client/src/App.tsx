import React from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecogniton from "./components/FaceRecogniton/FaceRecogniton";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Rank from "./components/Rank/Rank";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import { Box, Route } from "./types";

const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_CLARIFAI_KEY,
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
  const [route, setRoute] = React.useState<Route>(Route.SIGN_IN);
  const [faces, setFaces] = React.useState<Box[] | []>([]);
  const [input, setInput] = React.useState<string>("");
  const [imageUrl, setImageUrl] = React.useState<string>("");

  const updateInput = (value: string) => {
    setInput(value);
    setImageUrl("");
  };

  const updateRoute = (path: Route) => {
    setRoute(path);
  };

  const calculateFaceLocation = (data: {
    left_col: number;
    top_row: number;
    right_col: number;
    bottom_row: number;
  }): Box => {
    const clarifaiFace = data;
    const image = document.getElementById("inputImage");
    const width = Number(image!.offsetWidth);
    const height = Number(image!.offsetHeight);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const onButtonSubmit = () => {
    setImageUrl(input);
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, input)
      .then((response: any) => {
        setFaces(
          response.outputs[0].data.regions.map(
            ({ region_info }: { region_info: any }) =>
              calculateFaceLocation(region_info.bounding_box)
          )
        );
      })
      .catch((error: any) => console.log(error));
  };

  return (
    <div className="App">
      <Particles className="particles" params={particlesOptions} />
      <Navigation updateRoute={updateRoute} route={route} />

      {route === Route.SIGN_IN && (
        <>
          <SignIn updateRoute={updateRoute} />
        </>
      )}
      {route === Route.SIGN_UP && (
        <>
          <SignUp updateRoute={updateRoute} />
        </>
      )}
      {route === Route.HOME && (
        <>
          <Logo>
            <Rank />
          </Logo>
          <ImageLinkForm
            onButtonSubmit={onButtonSubmit}
            input={input}
            updateInput={updateInput}
          />
          <FaceRecogniton boxes={faces} imageUrl={imageUrl} />
        </>
      )}
    </div>
  );
}

export default App;