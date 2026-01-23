import React from "react";
import RegistrationForm from "./form/RegistrationForm";

const page = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="border p-6 max-w-4xl w-full rounded-lg flex justify-center">
        <RegistrationForm />
      </div>
    </div>
  );
};

export default page;
