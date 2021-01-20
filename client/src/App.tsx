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
import authService from "./services/auth";
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
  const [route, setRoute] = React.useState<Route>(
    localStorage.getItem("token") ? Route.HOME : Route.SIGN_IN
  );
  const [faces, setFaces] = React.useState<Box[] | []>([]);
  const [input, setInput] = React.useState<string>("");
  const [imageUrl, setImageUrl] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<any>();

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

  const onDetectSubmit = () => {
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

  const login = async (email: string, password: string) => {
    try {
      const res = await authService.signIn(email, password);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", res.user);
      setUser(res.user);
      updateRoute(Route.HOME);
    } catch (error) {
      setError(String(error.response.data.error));
      setTimeout(() => setError(null), 5000);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const res = await authService.signUp(email, password, name);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", res.user);
      setUser(res.user);
      updateRoute(Route.HOME);
    } catch (error) {
      setError(String(error.response.data.error));
      setTimeout(() => setError(null), 5000);
    }
  };

  return (
    <div className="App">
      <Particles className="particles" params={particlesOptions} />
      <Navigation updateRoute={updateRoute} route={route} />
      {error && (
        <div className="flex items-center justify-center pa2 bg-moon-gray navy o-80">
          <svg
            className="w1"
            data-icon="info"
            viewBox="0 0 32 32"
            style={{ fill: "currentcolor" }}
          >
            <title>info icon</title>
            <path d="M16 0 A16 16 0 0 1 16 32 A16 16 0 0 1 16 0 M19 15 L13 15 L13 26 L19 26 z M16 6 A3 3 0 0 0 16 12 A3 3 0 0 0 16 6"></path>
          </svg>
          <span className="lh-title ml3">{error}</span>
        </div>
      )}
      {route === Route.SIGN_IN && (
        <>
          <SignIn updateRoute={updateRoute} onLogin={login} />
        </>
      )}
      {route === Route.SIGN_UP && (
        <>
          <SignUp onRegister={register} />
        </>
      )}
      {route === Route.HOME && (
        <>
          <Logo>
            <Rank rank={4} name={String(user?.name)} />
          </Logo>
          <ImageLinkForm
            onButtonSubmit={onDetectSubmit}
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
