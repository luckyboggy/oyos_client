import React, { useState } from "react";
import cls from "./Image.module.scss";

const Image = ({ img, alt }) => {
  const [loading, setLoading] = useState(true);

  return (
    <img
      src={img}
      alt={alt}
      loading="lazy"
      className={`${cls.img} ${loading ? cls.loading : ""}`}
      onLoad={() => setLoading(false)}
    ></img>
  );
};

export default Image;
