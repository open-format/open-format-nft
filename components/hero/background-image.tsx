import React from "react";

interface BackgroundImageProps {
  image: string;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ image }) => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-white z-0 after:absolute after:left-0 after:bottom-0 after:right-0 after:z-10 after:w-full after:h-full after:bg-gradient-to-t after:from-white after:to-white-20 ">
      <img
        className="object-cover blur-xl sm:scale-150 md:blur-lg"
        src={image}
        alt=""
      />
    </div>
  );
};

export default BackgroundImage;
