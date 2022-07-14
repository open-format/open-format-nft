import React from "react";

export default function UploadPreview({ image }: { image: File }) {
  return (
    <>
      {image && (
        <img
          className="rounded-md  hover:opacity-50"
          src={URL.createObjectURL(image)}
        />
      )}
    </>
  );
}
