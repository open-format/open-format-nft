import axios from "axios";
import { NFTStorage } from "nft.storage";

if (typeof process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN !== "string")
  throw new Error("Please set the NEXT_PUBLIC_CHAIN_ID environment variable.");

const client = new NFTStorage({
  token: process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN,
});

type Data = {
  image: File;
  name: string;
  description: string;
  blockchain: string;
  type: string;
};

export const uploadToIPFS = async (data: Blob | File) => {
  if (!data) throw Error("Data is invalid");
  return await client.storeBlob(data);
};

export const pinHashToIPFS = async (ipfsHash: string) => {
  let CID;
  var config = {
    method: "post",
    url: "https://api.pinata.cloud/pinning/pinByHash",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT_TOKEN}`,
      "Content-Type": "application/json",
    },
    data: {
      hashToPin: ipfsHash,
    },
  };

  if (ipfsHash) {
    CID = await axios(config)
      .then((res) => console.log({ res }))
      .catch((err) => console.log({ err }));
  }

  return CID;
};

/**
 * The function builds up a metadata object in a format accepted
 * by the uploadToIPFS function above.
 * Name, description and Image are REQUIRED
 * You can add any metadata you want here. Each file will be uploaded
 * with it's own IPFS CID linking back to the generated metadata.json.
 */

export const buildMetadata = async (data: Data) => {
  const { name, description, image, blockchain, type } = data;

  const imageCID = await uploadToIPFS(image);
  await pinHashToIPFS(imageCID);

  // generate a random factory ID
  const FACTORY_ID = process.env.NEXT_PUBLIC_FACTORY_ID;
  // throw error if factory ID is not set or invalid;
  if (!FACTORY_ID || typeof FACTORY_ID !== "string") {
    throw Error(
      "Invalid Factory ID: Check NEXT_PUBLIC_FACTORY_ID in your .env.local"
    );
  }
  // name, description and image are required by nft.storage.
  const metadata = {
    name,
    description,
    blockchain,
    image: `ipfs://${imageCID}`,
    release_type: type.toLowerCase(),
    factory_id: FACTORY_ID,
  };

  return metadata;
};
