import React from "react";
import CardMedia from "@material-ui/core/CardMedia";

function Image({ image, alt, className, onClick }) {
  return (
    <CardMedia
      image={image}
      alt={alt}
      className={className}
      onClick={onClick}
      component="img"
    />
  );
}

export default Image;
