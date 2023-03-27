import React, { useState } from "react";
import { parseImage } from "../util/parseImage";

export const FileInput = ({ imageText }) => {
  const [file, setFile] = useState();
  const [percent, setPercent] = useState(0);
  const readText = async (event) => {
    const file = event.target.files.item(0);
    setFile(URL.createObjectURL(file));
    console.log(URL.createObjectURL(file));
    onImageFileChange(file);
  };
  const onImageFileChange = async (file) => {
    const text = await parseImage(file, (logger) => {
      console.log("logger", logger);
      setPercent(Math.round(logger.progress * 100));
    });
    console.log("parsed text", text);
    return imageText(text);
  };
  return (
    <>
      <input
        type="file"
        accept="image/png, image/gif, image/jpeg"
        onChange={(event) => {
          readText(event);
        }}
      />
      {percent}%
      <img
        src={file}
        alt="uploaded"
        style={{ width: "100%", height: "100%" }}
      ></img>
    </>
  );
};
