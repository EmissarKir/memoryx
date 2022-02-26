import React from "react";

const CardContainer = ({ children }) => {
  return (
    <div className="row d-flex justify-content-center">
      <div className="col-md-6">
        <div className="card shadow p-4 mt-5 text-center pb-5">{children}</div>
      </div>
    </div>
  );
};

export default CardContainer;
