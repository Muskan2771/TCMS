import React, { useState } from "react";
import { Button, Container } from "../../../components";
import ServiceTable from "./ServiceTable";
import { IoMdAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import CreateService from "./CreateService";
import { useService } from "../../../context/serviceContext/ServiceContextProvider";

const ServicesView = () => {
  const [showServiceForm, setshowServiceForm] = useState(false);
  const { clearFormData } = useService();
  const clickServiceShow = () => {
    setshowServiceForm(!showServiceForm);
    if (showServiceForm == true) {
      clearFormData();
    }
  };

  const showForEdit = () => {
    setshowServiceForm(true);
    window.scrollTo(0, 0);
  };
  return (
    <Container title="Service">
      <div className="flex lg:flex justify-end mx-5 lg:gap-5 gap-2 mt-3">
        <Button onClick={clickServiceShow}>
          <div>{!showServiceForm ? "Create Service" : "Close Service"}</div>
          <div>
            {!showServiceForm ? (
              <IoMdAdd />
            ) : (
              <RxCross2 className="hover:rotate-12" />
            )}
          </div>
        </Button>
      </div>
      <div
        className={`transition-all duration-500 ease-in-out transform ${
          showServiceForm ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {showServiceForm && (
          <CreateService clickServiceShow={clickServiceShow} />
        )}
      </div>
      <ServiceTable showForEdit={showForEdit} />
    </Container>
  );
};

export default ServicesView;
