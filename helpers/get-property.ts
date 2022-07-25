export const getProperty = (val: string, properties?: Property[]) =>
  properties?.find((property) => property.key === val)?.value;
