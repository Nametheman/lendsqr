import React, { useEffect } from "react";
import classes from "./Pagination.module.scss";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { usePagination } from "@/store/usePagination";
import { paginationRange } from "@/utils/appUtils";
import { TABLEDATATYPE } from "@/types/appTypes";

interface IPaginationProps {
  data: TABLEDATATYPE[];
  showPerPage: number;
  setShowPerPage: (number: number) => void;
  currentPage: number;
  setCurrentPage: (number: number) => void;
}
interface IPagesProps {
  data: TABLEDATATYPE[];
  showPerPage: number;
  currentPage: number;
  setCurrentPage: (number: number) => void;
}

const Pages: React.FC<IPagesProps> = ({
  data,
  showPerPage,
  currentPage,
  setCurrentPage,
}) => {
  let totalPage = Math.ceil(data.length / showPerPage);

  let pagesNumber = paginationRange(totalPage, currentPage, showPerPage, 1);

  return (
    <ul className={`${classes.pages}`}>
      {pagesNumber.map((number: string | number, idx: number) => {
        return (
          <li
            key={`number${idx}`}
            onClick={() => {
              if (number === "...") {
                return;
              }
              setCurrentPage(number as unknown as number);
            }}
            className={`${currentPage === number && classes.active}`}
          >
            {number}
          </li>
        );
      })}
    </ul>
  );
};

const Pagination: React.FC<IPaginationProps> = ({
  data,
  showPerPage,
  setShowPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const { setData } = usePagination();

  useEffect(() => {
    setData(data);
  }, [data]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(data.length / showPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className={classes.paginationContainer}>
      <div className={classes.paginationShow}>
        Showing{" "}
        <span>
          <select
            value={showPerPage}
            onChange={(e) => {
              const number = parseInt(e.target.value);
              setCurrentPage(1);
              setShowPerPage(number);
            }}
          >
            {["10", "25", "50", "100"].map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </span>{" "}
        out of <span>{data.length}</span>
      </div>
      <div className={classes.paginationShowMobile}>
        <span>
          <select
            value={showPerPage}
            onChange={(e) => {
              const number = parseInt(e.target.value);
              setCurrentPage(1);
              setShowPerPage(number);
            }}
          >
            {["10", "25", "50", "100"].map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </span>{" "}
        out of <span> {data.length}</span>
      </div>
      <div className={classes.paginationControls}>
        <button
          className={`${classes.controlBtn}`}
          onClick={handlePreviousPage}
        >
          <RxCaretLeft size={25} />
        </button>
        <Pages
          data={data}
          showPerPage={showPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />{" "}
        <button className={`${classes.controlBtn}`} onClick={handleNextPage}>
          <RxCaretRight size={25} />
        </button>
      </div>
      <div className={classes.paginationControlMobile}>
        <button
          className={`${classes.controlBtn}`}
          onClick={handlePreviousPage}
        >
          <RxCaretLeft size={25} />
        </button>

        <button className={`${classes.controlBtn}`} onClick={handleNextPage}>
          <RxCaretRight size={25} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
