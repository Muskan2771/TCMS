# Quote Product Calculations

This document outlines the calculations for various fields in the `QuoteProduct` model.

## Fields and Inputs

- **avgCost**: Fixed value from Product Master.
- **mainProductGpRequired**: User input.
- **mainProductJaybelPrice**: User input.
- **mainProductCurrentSupplierPrice**: User input.
- **mainProductCurrentSupplierGp**: Calculated value.
- **Product Saving**: Calculated value.

## Calculations

### 1. **mainProductGpRequired**:

\[
\text{mainProductGpRequired} = 100 - \left( \frac{\text{avgCost} \times 100}{\text{mainProductJaybelPrice}} \right)
\]

### 2. **mainProductJaybelPrice**:

\[
\text{mainProductJaybelPrice} = \left( \frac{\text{avgCost} \times 100}{100 - \text{mainProductGpRequired}} \right)
\]

### 3. **mainProductCurrentSupplierPrice**:

\[
\text{mainProductCurrentSupplierPrice} = \frac{\text{avgCost}}{1 - \left( \frac{\text{mainProductCurrentSupplierGp}}{100} \right)}
\]

### 4. **mainProductCurrentSupplierGp**:

\[
\text{mainProductCurrentSupplierGp} = \left( \frac{\text{mainProductCurrentSupplierPrice} - \text{avgCost}}{\text{mainProductCurrentSupplierPrice}} \right) \times 100
\]

---

## Example Implementation in JavaScript

Here’s how you can implement these formulas in JavaScript:

```javascript
// Function to calculate mainProductGpRequired
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
  quantity,
  mainProductJaybelPrice,
  mainProductCurrentSupplierPrice
) => {
  const mainProductJaybelPriceTotal = mainProductJaybelPrice * quantity;
  const mainProductCurrentSupplierTotal =
    mainProductCurrentSupplierPrice * quantity;
  const mainProductTotal = mainProductCurrentSupplierPrice * quantity;
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
  quantity,
  jaybelPrice,
  currentSupplierPrice
) => {
  const alternateProductJaybelPriceTotal = quantity * jaybelPrice;
  const alternateProductCurrentSupplierTotal = quantity * currentSupplierPrice;
  const alternateProductTotal = quantity * currentSupplierPrice;
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
```

---

### Key Points:

- The `avgCost` is a fixed value, while the other fields depend on either user input or calculated values.
- The JavaScript functions demonstrate how each of the formulas can be applied programmatically.
