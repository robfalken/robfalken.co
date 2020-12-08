import React from "react";

export const CoverImage = ({ image }) => {
  if (!image) return null;
  return (
    <div className="my-10">
      <img src={image.publicURL} />
    </div>
  );
};
