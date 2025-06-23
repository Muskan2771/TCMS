export const calculateMainProductGpRequired = (
  avgCost,
  mainProductJaybelPrice
) => {
  return 100 - (avgCost * 100) / mainProductJaybelPrice;
};

export const calculateMainProductJaybelPrice = (
  avgCost,
  mainProductGpRequired
) => {
  return (avgCost * 100) / (100 - mainProductGpRequired);
};

export const calculateMainProductCurrentSupplierPrice = (
  avgCost,
  mainProductCurrentSupplierGp
) => {
  return avgCost / (1 - mainProductCurrentSupplierGp / 100);
};

export const calculateMainProductCurrentSupplierGp = (
  mainProductCurrentSupplierPrice,
  avgCost
) => {
  return (
    ((mainProductCurrentSupplierPrice - avgCost) /
      mainProductCurrentSupplierPrice) *
    100
  );
};

const recalculateValues = () => {
  if (avgCost === null) return;

  // Recalculate the values based on the new inputs
  const gpRequired = calculateMainProductGpRequired(
    avgCost,
    mainProductJaybelPrice
  );
  const currentSupplierPrice = calculateMainProductCurrentSupplierPrice(
    avgCost,
    mainProductCurrentSupplierGp
  );
  const calculatedMainProductJaybelPrice = calculateMainProductJaybelPrice(
    avgCost,
    gpRequired
  );
  const calculatedMainProductCurrentSupplierGp =
    calculateMainProductCurrentSupplierGp(currentSupplierPrice, avgCost);

  // Update the state with new calculated values
  setMainProductGpRequired(gpRequired);
  setMainProductCurrentSupplierPrice(currentSupplierPrice);

  // Also update productForEdit context for consistency
  setProductForEdit((prev) => ({
    ...prev,
    mainProductGpRequired: gpRequired,
    mainProductJaybelPrice: calculatedMainProductJaybelPrice,
    mainProductCurrentSupplierPrice: currentSupplierPrice,
    mainProductCurrentSupplierGp: calculatedMainProductCurrentSupplierGp,
  }));
};

// Example usage: Call recalculateValues whenever any input value changes
recalculateValues();

// Simulate value changes
