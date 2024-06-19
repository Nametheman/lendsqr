import React, { useRef, useEffect } from "react";
import classes from "./TableFilter.module.scss";
import { useFormik } from "formik";
import { FILTERTYPE, TABLEDATATYPE } from "@/types/appTypes";

interface ITableFilterProps {
  filterShow: boolean;
  setFilterShow: (filterShow: boolean) => void;
  usersData: TABLEDATATYPE[];
  setUsersData: (usersData: TABLEDATATYPE[]) => void;
  setCurrentPage: (currentPage: number) => void;
}

const TableFilter: React.FC<ITableFilterProps> = ({
  filterShow,
  setFilterShow,
  usersData,
  setUsersData,
  setCurrentPage,
}) => {
  const initialData = {
    organization: "",
    username: "",
    email: "",
    phoneNumber: "",
    dateJoined: "",
    status: "",
  };

  const filterRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (filterRef) {
      const filterEl = filterRef.current;
      let mouseOver: boolean;
      if (filterEl) {
        filterEl.addEventListener("mouseenter", () => {
          mouseOver = true;
        });
        filterEl.addEventListener("mouseleave", () => {
          mouseOver = false;
        });
        document.addEventListener("click", () => {
          if (mouseOver == false && filterShow == true) {
            setFilterShow(false);
            mouseOver = true;
          }
        });
      }
    }
  }, []);

  const onSubmit = (values: FILTERTYPE) => {
    const filteredData = usersData.filter((user: TABLEDATATYPE) => {
      return Object.keys(values).every((key) => {
        return user[key as keyof FILTERTYPE]
          .toLowerCase()
          .includes(values[key as keyof FILTERTYPE].toLowerCase());
      });
    });

    setFilterShow(false);
    setCurrentPage(1);
    setUsersData(filteredData);
  };

  const { values, resetForm, handleChange, handleSubmit } = useFormik({
    initialValues: initialData,
    onSubmit,
  });

  const handleCancel = () => {
    setUsersData(usersData);
    resetForm();
  };

  return (
    <div className={classes.filterComponent} ref={filterRef}>
      <form action="" onSubmit={handleSubmit}>
        <div className={classes.filterItem}>
          <label htmlFor="organization">Organization</label>
          <input
            type="text"
            name="organization"
            id="organization"
            value={values.organization}
            onChange={handleChange}
          />
        </div>
        <div className={classes.filterItem}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={values.username}
            onChange={handleChange}
          />
        </div>
        <div className={classes.filterItem}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
          />
        </div>
        <div className={classes.filterItem}>
          <label htmlFor="dateJoined">Date</label>
          <input
            type="date"
            name="dateJoined"
            id="dateJoined"
            value={values.dateJoined}
            onChange={handleChange}
          />
        </div>
        <div className={classes.filterItem}>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className={classes.filterItem}>
          <label htmlFor="status">Status</label>
          <select
            name="status"
            id="status"
            value={values.status}
            onChange={handleChange}
          >
            <option value="all">All</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="blacklisted">Blacklisted</option>
          </select>{" "}
        </div>
        <div className={classes.filterBtns}>
          <button
            className={classes.reset}
            onClick={handleCancel}
            type="button"
          >
            Reset
          </button>
          <button className={classes.filter} type="submit">
            Filter
          </button>
        </div>
      </form>
    </div>
  );
};

export default TableFilter;
