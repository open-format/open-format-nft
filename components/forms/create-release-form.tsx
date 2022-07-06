import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { buildMetadata, uploadToIPFS } from "../../helpers/ipfs";
import * as yup from "yup";
import { ErrorMessage } from "@hookform/error-message";
import toast from "react-hot-toast";
import Button from "../buttons/button";
import { useDeploy, useWallet } from "@simpleweb/open-format-react";
import { useRouter } from "next/router";
const ReleaseSchema = yup.object().shape({
  name: yup.string().required("You must provide a name"),
  description: yup.string().required("You must provide a description"),
  totalSupply: yup
    .number()
    .required()
    .min(1, "Must be at least 1")
    .typeError("You must provide a supply e.g 100"),
  mintPrice: yup
    .number()
    .required()
    .min(0, "Cannot be less than 0")
    .typeError("You must provide a mint price"),
  image: yup
    .mixed()
    .test("required", "You need to provide a file", (file: [File]) => {
      if (file[0]) return true;
      return false;
    })
    .test("fileSize", "The image file is too large", (file: [File]) => {
      return file[0] && file[0].size <= 10000000;
    }),
});

const CreateReleaseForm: React.FC = () => {
  const { isConnected } = useWallet();
  const [loadingToIPFS, setLoadingToIPFS] = useState<boolean>(false);
  type FormValues = {
    name: string;
    totalSupply: string;
    mintPrice: string;
    image: File[];
    description: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(ReleaseSchema),
  });
  const router = useRouter();
  const { deploy, isLoading, data: contractData } = useDeploy();
  console.log({ contractData });
  console.log({ isConnected });

  const onSubmit = async (data: FormValues) => {
    const metaUpload = {
      name: data.name,
      description: data.description,
      image: data.image,
    };
    const meta = await buildMetadata(metaUpload);
    console.log(meta);

    try {
      setLoadingToIPFS(true);
      const ipfsSuccess = await toast.promise(uploadToIPFS(meta), {
        loading: "Uploading your creation to IPFS",
        success: "Upload complete",
        error: "Upload error",
      });
      setLoadingToIPFS(false);

      console.log({ ipfsSuccess });

      const response = await toast.promise(
        deploy({
          maxSupply: parseInt(data.totalSupply),
          mintingPrice: parseFloat(data.mintPrice),
          name: meta.name,
          symbol: "TEST",
          url: ipfsSuccess.url,
        }),
        {
          loading:
            "Uploading your creation to the blockhain, please check your wallet for further instructions",
          success: "Contract deployed",
          error: "Upload error",
        }
      );
      router.push(`/explore/${response.contractAddress}`);
    } catch (error) {
      console.log(error);
    }
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
                    htmlFor="image"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      {...register("image")}
                      id="image"
                      name="image"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">JPEG, PNG, MP3 Max 20MB</p>
              </div>
            </div>
            <ErrorMessage
              errors={errors}
              name="image"
              render={({ message }) => (
                <p className="text-sm mt-1 text-pink-700">{message}</p>
              )}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-6">
          <label
            htmlFor="name"
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
          <ErrorMessage
            errors={errors}
            name="name"
            render={({ message }) => (
              <p className="text-sm mt-1 text-pink-700">{message}</p>
            )}
          />
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
          <ErrorMessage
            errors={errors}
            name="description"
            render={({ message }) => (
              <p className="text-sm mt-1 text-pink-700">{message}</p>
            )}
          />
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
          <ErrorMessage
            errors={errors}
            name="mintPrice"
            render={({ message }) => (
              <p className="text-sm mt-1 text-pink-700">{message}</p>
            )}
          />
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
          <ErrorMessage
            errors={errors}
            name="totalSupply"
            render={({ message }) => (
              <p className="text-sm mt-1 text-pink-700">{message}</p>
            )}
          />
        </div>
        <div className="sm:col-span-6">
          <label
            htmlFor="blockchain"
            className="block text-sm font-medium text-gray-700"
          >
            Blockchain
          </label>
          <div className="mt-1">
            <select
              id="bolckchain"
              name="blockchain"
              autoComplete="blockchain"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            >
              <option selected>Polygon</option>
            </select>
          </div>
        </div>
      </div>
      <div className="pt-5">
        <div className="flex justify-end">
          {isConnected && (
            <Button
              isLoading={loadingToIPFS || isLoading}
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 border rounded-md  text-sm font-medium hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default CreateReleaseForm;
