import React from "react";
import { Box } from "../../types";
import "./FaceRecognition.css";

interface Props {
  imageUrl: string;
  boxes: Box[];
}

const FaceRecogniton: React.FC<Props> = ({ imageUrl, boxes }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputImage"
          src={imageUrl}
          alt=""
          width="500px"
          height="auto"
        />
        {boxes.map((box: Box, i: number) => (
          <div
            key={i}
            className="bounding-box"
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default FaceRecogniton;
