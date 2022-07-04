const getMetaValue = (property: Property[], key: string) => {
  if (!key) return new Error("OpenFormat: key not set");
  if (!property) return null;

  return property.find((m: Property) => m.key === key)?.value;
};

export default getMetaValue;
