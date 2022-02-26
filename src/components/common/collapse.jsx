import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Collapse as BsCollapse } from "bootstrap";
import PropTypes from "prop-types";
import CategoryList from "../ui/categoryList";
const CollapseWrapper = ({
  children,
  title,
  name,
  categories,
  currentIndex,
  maxCount,
}) => {
  const [display, setDisaplay] = useState(false);
  const collapseRef = useRef();
  const toggleDisplay = () => {
    setDisaplay((prevState) => !prevState);
  };
  useEffect(() => {
    const newCollapse = new BsCollapse(collapseRef.current, {
      toggle: false,
    });
    display ? newCollapse.show() : newCollapse.hide();
  }, [display]);

  const titleTextPosition = title.length > 30 ? "" : "text-center";

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div>
            {currentIndex} / {maxCount}
          </div>

          <div>
            <i
              className={"bi bi-chevron-" + (!display ? "down" : "up")}
              onClick={toggleDisplay}
            ></i>
          </div>
        </div>
        <div>
          <h4 className={`py-3 ps-5 ${titleTextPosition}`}>
            <ReactMarkdown>{title}</ReactMarkdown>
          </h4>
        </div>
        {<CategoryList categories={categories} />}

        <div className="collapse mt-3" ref={collapseRef} id={name + title}>
          {children}
        </div>
      </div>
    </div>
  );
};
CollapseWrapper.defaultProps = {
  title: "Информация",
};
CollapseWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  title: PropTypes.string,
  name: PropTypes.string,
};

export default CollapseWrapper;
