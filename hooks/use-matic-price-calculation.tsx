import { useEffect, useState } from "react";

const useMaticPriceCalculation = (
  salePriceValue: number,
  currency: string,
  currencySymbol: string
) => {
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=${currency}`
    )
      .then((res) => res.json())
      .then((res) => setPrice(res["matic-network"][`${currency}`]));
  }, []);

  const currencyConversion = Boolean(salePriceValue && price)
    ? `(${currencySymbol}${(salePriceValue * price).toFixed(5)})`
    : `(${currencySymbol}0.00)`;

  return currencyConversion;
};

export default useMaticPriceCalculation;
