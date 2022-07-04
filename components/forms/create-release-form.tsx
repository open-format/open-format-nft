import React from "react";
import { useForm } from "react-hook-form";

const CreateReleaseForm: React.FC = () => {
  type FormValues = {
    name: string;
    totalSupply: string;
    mintPrice: string;
    fileUpload: File;
    description: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2">
        <div className="col-span-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium text-gray-900"
            >
              <p>Image, Video, or Audio</p>
              <p className="text-xs text-gray-500">
                File types supported: JPEG, PNG MP3
              </p>
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
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
                    htmlFor="fileUpload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      {...register("fileUpload")}
                      id="fileUpload"
                      name="fileUpload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">JPEG, PNG, MP3 Max 20MB</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-6">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <div className="mt-1">
            <input
              {...register("name")}
              type="text"
              name="name"
              id="name"
              className=" focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="sm:col-span-6">
          <label
            htmlFor="about"
            className="block text-sm font-medium text-gray-700"
          >
            <p>Description</p>
            <p className="mt-2 text-xs text-gray-500">
              The description will be included on the item&apos;s detail page
              underneath its image.
            </p>
          </label>
          <div className="mt-1">
            <textarea
              {...register("description")}
              id="description"
              name="description"
              rows={3}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
              defaultValue={""}
              placeholder="Provide a detailed description of you item."
            />
          </div>
        </div>
        <div className="sm:col-span-6">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            <p>Mint Price</p>
            <p className="mt-2 text-xs text-gray-500">
              The price that you wish to sell each NFT!
            </p>
          </label>
          <div className="mt-1">
            <input
              type="text"
              {...register("mintPrice")}
              defaultValue="0.001"
              className=" focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="sm:col-span-6">
          <label
            htmlFor="region"
            className="block text-sm font-medium text-gray-700"
          >
            <p>Supply</p>
            <p className="mt-2 text-xs text-gray-500">
              The number of items that can be minted.
            </p>
          </label>
          <div className="mt-1">
            <input
              {...register("totalSupply")}
              defaultValue="1"
              type="text"
              name="totalSupply"
              id="totalSupply"
              autoComplete="address-level1"
              className=" focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="sm:col-span-6">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Blockchain
          </label>
          <div className="mt-1">
            <select
              id="country"
              name="country"
              autoComplete="country-name"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            >
              <option selected>Polygon</option>
            </select>
          </div>
        </div>
      </div>
      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 border rounded-md  text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateReleaseForm;