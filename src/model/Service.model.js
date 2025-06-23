import { useState } from "react";

const serviceModel = () => {
  const initialState = {
    id: 0,
    service: "",
  };

  const [service, setService] = useState(initialState);

  return { service, setService, initialState };
};

export default serviceModel;
