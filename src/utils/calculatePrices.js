export const calculateMainProductGpRequired = (
  avgCost,
  mainProductJaybelPrice
) => {
  if (mainProductJaybelPrice === 0) return 0;
  const result = 100 - (avgCost * 100) / mainProductJaybelPrice;
  return parseFloat(result.toFixed(2));
};

export const calculateMainProductJaybelPrice = (
  avgCost,
  mainProductGpRequired
) => {
  if (mainProductGpRequired === 100) return 0;
  const result = (avgCost * 100) / (100 - mainProductGpRequired);
  return parseFloat(result.toFixed(2));
};

export const calculateMainProductCurrentSupplierGp = (
  mainProductCurrentSupplierPrice,
  avgCost
) => {
  if (mainProductCurrentSupplierPrice === 0) return 0;
  const result =
    ((mainProductCurrentSupplierPrice - avgCost) /
      mainProductCurrentSupplierPrice) *
    100;
  return parseFloat(result.toFixed(2));
};

export const calculateMainProductSaving = (
  mainProductCurrentSupplierPrice,
  mainProductJaybelPriceTotal
) => {
  if (mainProductCurrentSupplierPrice === 0) return 0;
  const result =
    ((mainProductCurrentSupplierPrice - mainProductJaybelPriceTotal) /
      mainProductCurrentSupplierPrice) *
    100;
  return parseFloat(result.toFixed(2));
};

export const calculateTotals = (
  mainProductQuantity,
  mainProductJaybelPrice,
  mainProductCurrentSupplierPrice
) => {
  const mainProductJaybelPriceTotal =
    mainProductJaybelPrice * mainProductQuantity;
  const mainProductCurrentSupplierTotal =
    mainProductCurrentSupplierPrice * mainProductQuantity;
  const mainProductTotal =
    mainProductCurrentSupplierPrice * mainProductQuantity;
  return {
    mainProductJaybelPriceTotal: parseFloat(
      mainProductJaybelPriceTotal.toFixed(2)
    ),
    mainProductCurrentSupplierTotal: parseFloat(
      mainProductCurrentSupplierTotal.toFixed(2)
    ),
    mainProductTotal: parseFloat(mainProductTotal.toFixed(2)),
  };
};

export const calculateAlternateProductCurrentSupplierGp = (
  currentSupplierPrice,
  avgCost
) => {
  if (!currentSupplierPrice || !avgCost) return 0;
  const result =
    ((currentSupplierPrice - avgCost) / currentSupplierPrice) * 100;
  return parseFloat(result.toFixed(2));
};

export const calculateAlternateProductSaving = (
  currentSupplierPrice,
  jaybelPrice
) => {
  if (!currentSupplierPrice || !jaybelPrice) return 0;
  const result =
    ((currentSupplierPrice - jaybelPrice) / currentSupplierPrice) * 100;
  return parseFloat(result.toFixed(2));
};

export const calculateAlternateProductTotals = (
  alternateProductQuantity,
  jaybelPrice,
  currentSupplierPrice
) => {
  const alternateProductJaybelPriceTotal =
    alternateProductQuantity * jaybelPrice;
  const alternateProductCurrentSupplierTotal =
    alternateProductQuantity * currentSupplierPrice;
  const alternateProductTotal = alternateProductQuantity * currentSupplierPrice;
  return {
    alternateProductJaybelPriceTotal: parseFloat(
      alternateProductJaybelPriceTotal.toFixed(2)
    ),
    alternateProductCurrentSupplierTotal: parseFloat(
      alternateProductCurrentSupplierTotal.toFixed(2)
    ),
    alternateProductTotal: parseFloat(alternateProductTotal.toFixed(2)),
  };
};
