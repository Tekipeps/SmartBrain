import Tilt from "react-tilt";
import "./Logo.css";
import brain from "./brain.png";

const Logo: React.FC = ({ children }) => {
  return (
    <div
      className="ma4 mt0"
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexFlow: "row wrap",
      }}
    >
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 25 }}
        style={{ height: 100, width: 100 }}
      >
        <div className="Tilt-inner pa3">
          <img style={{ paddingTop: "5px" }} alt="logo" src={brain} />{" "}
        </div>
      </Tilt>
      {children}
    </div>
  );
};

export default Logo;
