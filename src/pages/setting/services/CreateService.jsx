import React from "react";
import { RxCross2 } from "react-icons/rx";
import { Button, Input } from "../../../components";
import { useService } from "../../../context/serviceContext/ServiceContextProvider";

const CreateService = ({ clickServiceShow }) => {
  const { service, setService, createNewService, error, updateService } =
    useService();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (service.id === 0) {
      await createNewService(service, clickServiceShow);
    } else {
      await updateService(service, service.id, clickServiceShow);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      className="m-10 bg-slate-50 rounded-2xl p-5"
      onSubmit={handleSubmit} // Use onSubmit instead of onClick
    >
      <div className="font-600 text-2xl flex justify-between">
        <div>{service.id ? "Update Service" : "Create Service"}</div>
        <div onClick={clickServiceShow} className="hover:cursor-pointer">
          <RxCross2 className="hover:rotate-12" />
        </div>
      </div>
      <div className="flex flex-col items-center grid-cols-1">
        <div className="w-96">
          <Input
            label="Service"
            name="service"
            type="text"
            value={service.service}
            onChange={handleChange}
            error={error?.service}
            required
            placeholder="Service"
          />
        </div>
        <div className="flex gap-5 mt-5">
          <Button className="secondary" onClick={clickServiceShow}>
            Cancel
          </Button>
          <Button
            type="submit" // This button submits the form
            className="px-4 py-2 bg-yellow-500 text-white rounded-3xl"
          >
            {service.id === 0 ? "Submit" : "Update"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreateService;
