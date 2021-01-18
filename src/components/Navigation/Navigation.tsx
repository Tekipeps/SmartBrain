import React from "react";
import { Route } from "../../types";

interface Props {
  updateRoute: (path: Route) => void;
}

const Navigation: React.FC<Props> = ({ updateRoute }) => {
  return (
    <nav style={{ display: "flex", justifyContent: "flex-end" }}>
      <p
        onClick={() => updateRoute(Route.SIGN_IN)}
        className="f3 link dim black underline pa3 pointer"
      >
        sign out
      </p>
    </nav>
  );
};

export default Navigation;
