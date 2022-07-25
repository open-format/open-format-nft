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
import useTranslation from "next-translate/useTranslation";

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
          .test("required", t("forms.deploy.errors.image"), (file: [File]) => {
            if (file === undefined) {
              return false;
            }
            if (file[0]) return true;

            return false;
          })
          .test(
            "fileSize",
            t("forms.deploy.errors.imageSize"),
            (file: [File]) => {
              if (file === undefined) {
                return false;
              }
              return file[0] && file[0].size <= 10000000;
            }
          ),
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
        loading: t("toastMessages.ipfs.loading"),
        success: t("toastMessages.ipfs.success"),
        error: t("toastMessages.ipfs.error"),
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
          loading: t("toastMessages.contract.loading"),
          success: t("toastMessages.contract.success"),
          error: t("toastMessages.contract.error"),
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
                  id="bolckchain"
                  name="blockchain"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  defaultValue={t("forms.deploy.defaultValues.blockchain")}
                >
                  <option
                    value={t(
                      "forms.deploy.labels.blockchain.options.labelOne"
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
