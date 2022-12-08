import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDeploy, useWallet } from "@simpleweb/open-format-react";

import classNames from "classnames";
import ActivityIndicator from "components/activity-indicator";
import Button from "components/button";
import { buildMetadata, pinHashToIPFS, uploadToIPFS } from "helpers/ipfs";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { Blob } from "nft.storage";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import { CATEGORIES } from "../../constants";

import DropzoneField from "./dropzone-field";

type FormValues = {
  name: string;
  totalSupply: string;
  mintPrice: string;
  image: File;
  description: string;
  blockchain: string;
  type: string;
};

export default function CreateReleaseForm() {
  const router = useRouter();
  const { deploy, isLoading } = useDeploy();
  const { isConnected } = useWallet();
  const { t } = useTranslation("common");
  const [loadingToIPFS, setLoadingToIPFS] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required(t("forms.deploy.errors.name")),
        description: yup
          .string()
          .required(t("forms.deploy.errors.description")),
        totalSupply: yup
          .number()
          .required()
          .min(1, t("forms.deploy.errors.supplyMin"))
          .typeError(t("forms.deploy.errors.totalSupply")),
        mintPrice: yup
          .number()
          .required()
          .min(0, t("forms.deploy.errors.priceMin"))
          .typeError(t("forms.deploy.errors.mintPrice")),
        image: yup
          .mixed()
          .required(t("forms.deploy.errors.image"))
          .test(
            "fileSize",
            t("forms.deploy.errors.imageSize"),
            (file: File) => {
              if (file === undefined) {
                return false;
              }
              return file && file.size <= 10000000;
            }
          ),
        blockchain: yup.string().required(),
      })
    ),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = form;

  const onSubmit = async (data: FormValues) => {
    try {
      setLoadingToIPFS(true);
      const ipfsData = await toast.promise(handleIPFSUpload(data), {
        loading: t("toastMessages.ipfs.loading"),
        success: t("toastMessages.ipfs.success"),
        error: t("toastMessages.ipfs.error"),
      });
      setLoadingToIPFS(false);

      if (ipfsData) {
        await pinHashToIPFS(ipfsData.CID);

        const response = await toast.promise(
          deploy({
            maxSupply: parseInt(data.totalSupply),
            mintingPrice: parseFloat(data.mintPrice),
            name: ipfsData.meta.name,
            symbol: "TEST",
            url: `ipfs://${ipfsData.CID}`,
          }),
          {
            loading: t("toastMessages.contract.loading"),
            success: t("toastMessages.contract.success"),
            error: t("toastMessages.contract.error"),
          }
        );
        router.push(`/explore/${response.contractAddress}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleIPFSUpload = async (data: FormValues) => {
    try {
      const metaUpload = {
        name: data.name,
        description: data.description,
        image: data.image,
        blockchain: data.blockchain,
        type: data.type,
      };

      const meta = await buildMetadata(metaUpload);
      const CID = await uploadToIPFS(new Blob([JSON.stringify(meta)]));
      await fetch(`https://gateway.pinata.cloud/ipfs/${CID}`).catch(
        (err) => err
      );
      await fetch(`https://ipfs.io/ipfs/${CID}`).catch((err) => err);

      return { meta, CID };
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
                <p>{t("forms.deploy.labels.name.heading")}</p>
                <p className="mt-2 text-xs text-gray-500">
                  {t("forms.deploy.labels.name.subHeading")}
                </p>
              </label>
              <div className="mt-1">
                <input
                  {...register("name")}
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={t("forms.deploy.defaultValues.name")}
                  placeholder={t("forms.deploy.placeholders.name")}
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
                <p>{t("forms.deploy.labels.description.heading")}</p>
                <p className="mt-2 text-xs text-gray-500">
                  {t("forms.deploy.labels.description.subHeading")}
                </p>
              </label>
              <div className="mt-1">
                <textarea
                  {...register("description")}
                  id="description"
                  name="description"
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  defaultValue={t("forms.deploy.defaultValues.description")}
                  placeholder={t("forms.deploy.placeholders.description")}
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
                <p>{t("forms.deploy.labels.mintPrice.heading")}</p>
                <p className="mt-2 text-xs text-gray-500">
                  {t("forms.deploy.labels.mintPrice.subHeading")}
                </p>
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  {...register("mintPrice")}
                  defaultValue={t("forms.deploy.defaultValues.mintPrice")}
                  placeholder={t("forms.deploy.placeholders.mintPrice")}
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
                <p>{t("forms.deploy.labels.totalSupply.heading")}</p>
                <p className="mt-2 text-xs text-gray-500">
                  {t("forms.deploy.labels.totalSupply.subHeading")}
                </p>
              </label>
              <div className="mt-1">
                <input
                  {...register("totalSupply")}
                  defaultValue={t("forms.deploy.defaultValues.totalSupply")}
                  type="text"
                  name="totalSupply"
                  id="totalSupply"
                  placeholder={t("forms.deploy.placeholders.totalSupply")}
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
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                <p>{t("forms.deploy.labels.type.heading")}</p>
                <p className="mt-2 text-xs text-gray-500">
                  {t("forms.deploy.labels.type.subHeading")}
                </p>
              </label>
              <div className="mt-1">
                <select
                  {...register("type")}
                  onChange={(e) =>
                    setValue("type", e.target.value, {
                      shouldValidate: true,
                    })
                  }
                  id="type"
                  name="type"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  {CATEGORIES.map((type, i) => (
                    <option key={i} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="sm:col-span-6">
              <label
                htmlFor="blockchain"
                className="block text-sm font-medium text-gray-700"
              >
                <p>{t("forms.deploy.labels.blockchain.heading")}</p>
                <p className="mt-2 text-xs text-gray-500">
                  {t("forms.deploy.labels.blockchain.subHeading")}
                </p>
              </label>
              <div className="mt-1">
                <select
                  {...register("blockchain")}
                  onChange={(e) =>
                    setValue("blockchain", e.target.value, {
                      shouldValidate: true,
                    })
                  }
                  id="bolckchain"
                  name="blockchain"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  defaultValue={t("forms.deploy.defaultValues.blockchain")}
                >
                  <option
                    value={t(
                      "forms.deploy.labels.blockchain.options.valueOne"
                    ).toLowerCase()}
                  >
                    {t("forms.deploy.labels.blockchain.options.valueOne")}
                  </option>
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
                  className={classNames(
                    {
                      "cursor-not-allowed opacity-70":
                        loadingToIPFS || isLoading,
                    },
                    "bg-blue-500 text-white py-2 px-4 border rounded-md  text-sm font-medium hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  )}
                >
                  {isLoading || loadingToIPFS ? (
                    <>
                      <ActivityIndicator className="h-5 w-5 inline mr-2 animate-spin text-white" />
                      <span className="text-white">
                        {t("forms.deploy.buttonState.loading")}
                      </span>
                    </>
                  ) : (
                    t("forms.deploy.buttonState.initial")
                  )}
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={true}
                  className="bg-gray-500 text-white py-2 px-4 border rounded-md  text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 pointer-events-none"
                >
                  {t("forms.deploy.buttonState.disconnected")}
                </Button>
              )}
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
