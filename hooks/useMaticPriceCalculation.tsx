import { useEffect, useState } from "react";

const LOCALE = "gb-GB";
const CURRENCY = "GBP";

const useMaticPriceCalculation = (salePriceValue: number) => {
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=${CURRENCY}`
    )
      .then((res) => res.json())
      .then((res) =>
        setPrice(res["matic-network"][`${CURRENCY.toLowerCase()}`])
      );
  }, []);

  return new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency: CURRENCY,
    maximumFractionDigits: 5,
  }).format(Boolean(salePriceValue && price) ? salePriceValue * price : 0);
};

export default useMaticPriceCalculation;
