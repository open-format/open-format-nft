import React from "react";

export default function UploadPreview({ image }: { image: File }) {
  return (
    <>
      {image && (
        <img
          className="rounded-md w-full h-auto"
          src={URL.createObjectURL(image)}
        />
      )}
    </>
  );
}
