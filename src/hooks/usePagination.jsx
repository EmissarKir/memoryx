import { useState } from "react";
import _ from "lodash";

import { paginate } from "../utils/paginate";

export const usePagination = ({ contentPerPage, count }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const usersCrop = paginate(count, currentPage, contentPerPage);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const pageCount = Math.ceil(count.length / contentPerPage);

  const pages = _.range(1, pageCount + 1);

  return { usersCrop, currentPage, pages, handlePageChange, pageCount };
};
