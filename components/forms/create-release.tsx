import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import {
  Control,
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import * as yup from "yup";
import Button from "components/button";
import { useDeploy, useWallet } from "@simpleweb/open-format-react";
import { useRouter } from "next/router";
import ActivityIndicator from "components/activity-indicator";
import { useDropzone } from "react-dropzone";
import { buildMetadata, uploadToIPFS } from "helpers/ipfs";
import UploadPreview from "components/preview";
import classNames from "classnames";
import DropzoneField from "./dropzone-field";

type FormValues = {
  name: string;
  totalSupply: string;
  mintPrice: string;
  image: File[];
  description: string;
};

export default function CreateReleaseForm() {
  const router = useRouter();
  const { deploy, isLoading } = useDeploy();
  const { isConnected } = useWallet();
  const [loadingToIPFS, setLoadingToIPFS] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: yupResolver(
      yup.object().shape({
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
            if (file === undefined) {
              return false;
            }
            if (file[0]) return true;

            return false;
          })
          .test("fileSize", "The image file is too large", (file: [File]) => {
            if (file === undefined) {
              return false;
            }
            return file[0] && file[0].size <= 10000000;
          }),
      })
    ),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const onSubmit = async (data: FormValues) => {
    const metaUpload = {
      name: data.name,
      description: data.description,
      image: data.image,
    };

    const meta = await buildMetadata(metaUpload);

    try {
      setLoadingToIPFS(true);

      const ipfsSuccess = await toast.promise(uploadToIPFS(meta), {
        loading: "Uploading your creation to IPFS",
        success: "Upload complete",
        error: "Upload error",
      });

      setLoadingToIPFS(false);

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
    <>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2">
            <div className="col-span-2 mt-6 gap-y-6 gap-x-4 md:col-span-2 lg:col-span-1">
              <DropzoneField name="image" control={control} />
            </div>
          </div>
          <ErrorMessage
            errors={errors}
            name="image"
            render={({ message }) => (
              <p className="text-sm mt-1 text-pink-700">{message}</p>
            )}
          />

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
                  The description will be included on the item&apos;s detail
                  page underneath its image.
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
                  defaultValue="polygon"
                >
                  <option value="polygon">Polygon</option>
                </select>
              </div>
            </div>
          </div>
          <div className="pt-5">
            <div className="flex justify-end">
              {isConnected ? (
                <Button
                  isLoading={loadingToIPFS || isLoading}
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 border rounded-md  text-sm font-medium hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isLoading || loadingToIPFS ? (
                    <>
                      <ActivityIndicator className="h-5 w-5 inline mr-2 animate-spin text-white" />
                      <span className="text-white">Loading</span>
                    </>
                  ) : (
                    "Create"
                  )}
                </Button>
              ) : (
                <Button
                  isLoading={loadingToIPFS || isLoading}
                  type="submit"
                  disabled={true}
                  className="bg-gray-500 text-white py-2 px-4 border rounded-md  text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 pointer-events-none"
                >
                  Connect your wallet
                </Button>
              )}
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
