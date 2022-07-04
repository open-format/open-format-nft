const transformURL = (url?: string) => {
  if (!url) return;
  return url.replace("ipfs://", process.env.NEXT_PUBLIC_IPFS as string);
};

export default transformURL;
