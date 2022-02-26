import React from "react";

const CategoryList = ({ categories }) => {
  return (
    <div className="d-flex justify-content-center">
      {categories.map((category) => (
        <span className={"badge m-1 bg-" + category.color} key={category._id}>
          {category.name}
        </span>
      ))}
    </div>
  );
};

export default CategoryList;
