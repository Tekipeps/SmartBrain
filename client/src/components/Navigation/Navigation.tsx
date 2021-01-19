import React from "react";
import { Route } from "../../types";

interface Props {
  updateRoute: (path: Route) => void;
  route: Route;
}

const Navigation: React.FC<Props> = ({ updateRoute, route }) => {
  return (
    <nav style={{ display: "flex", justifyContent: "flex-end" }}>
      {route === Route.HOME ? (
        <p
          onClick={() => {
            localStorage.clear();
            updateRoute(Route.SIGN_IN);
          }}
          className="f3 link dim black underline pa3 pointer"
        >
          Sign out
        </p>
      ) : (
        <>
          <p
            onClick={() => updateRoute(Route.SIGN_IN)}
            className="f3 link dim black underline pa3 pointer"
          >
            Sign in
          </p>
          <p
            onClick={() => updateRoute(Route.SIGN_UP)}
            className="f3 link dim black underline pa3 pointer"
          >
            Register
          </p>
        </>
      )}
    </nav>
  );
};

export default Navigation;
