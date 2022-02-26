import React from "react";

const Loader = () => (
  <div className="d-flex justify-content-center m-5">
    <button className="btn btn-primary" type="button" disabled>
      <span
        className="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
      Loading...
    </button>
  </div>
);

export default Loader;
