import { useState } from "react";
import productMasterModel from "../product/ProductMaster.model";

const alternateProductModel = () => {
  const initialState = {
    mainProduct: productMasterModel().initialState,
    alternateProducts: [],
  };

  const [alternateProduct, setAlternateProduct] = useState(initialState);

  return { alternateProduct, setAlternateProduct, initialState };
};

export default alternateProductModel;
