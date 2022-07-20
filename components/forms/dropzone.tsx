import classNames from "classnames";
import UploadPreview from "components/preview";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

export default function Dropzone({
  onChange,
  ...options
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const onDrop = useCallback((acceptedFiles: any) => {
    onChange(acceptedFiles);
  }, []);
  const { setValue, watch, resetField } = useFormContext();
  const [entered, setEntered] = useState<boolean>();
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (files) => setValue("image", files),
    onDragEnter: () => setEntered(true),
    onDragLeave: () => setEntered(false),
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
    },
    ...options,
  });

  function handleImageEnterAndExit() {
    resetField("image");
    setEntered(false);
  }

  const image = watch("image");

  return (
    <>
      {image ? (
        <div className="sm:col-span-6 cursor-pointer">
          <label
            htmlFor="cover-photo"
            className="block text-sm font-medium text-gray-900"
          >
            <p>Image</p>
            <p className="text-xs text-gray-500">
              File types supported: JPEG, PNG MP3
            </p>
          </label>

          <div className="mt-1 relative justify-center p-2 border-2 border-gray-300 border-dashed rounded-md">
            <div className="pb-2 absolute top-0 right-0 p-2 m-3 z-10 bg-white/30 rounded-sm hover:bg-white-80">
              <svg
                onClick={() => handleImageEnterAndExit()}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <UploadPreview {...{ image: image[0] }} />
          </div>
        </div>
      ) : (
        <div {...getRootProps()} className="sm:col-span-6 cursor-pointer">
          <label
            htmlFor="cover-photo"
            className="block text-sm font-medium text-gray-900"
          >
            <p>Image</p>
            <p className="text-xs text-gray-500">
              File types supported: JPEG, PNG MP3
            </p>
          </label>

          <div
            className={classNames(
              {
                "opacity-50": entered,
                "opacity-100": !entered,
              },
              "mt-1 flex hover:opacity-50 justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
            )}
          >
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-48 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="image"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Upload a file or drag and drop</span>
                  <input {...getInputProps({ onDrop })} />
                </label>
              </div>
              <p className="text-xs text-gray-500">JPEG, PNG, MP3 Max 20MB</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
