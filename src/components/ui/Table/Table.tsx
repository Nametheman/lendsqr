import React, { useEffect, useState } from "react";
import classes from "./Table.module.scss";
import filter from "@/assets/icons/filter.svg";
import { format } from "date-fns";
import TableFilter from "./TableFilter";
import { HiOutlineDotsVertical } from "react-icons/hi";
import TableAction from "./TableAction";
import { useNavigate } from "react-router-dom";

interface ITableProps {
  columns: any;
  data: any;
}

const Table: React.FC<ITableProps> = ({ columns, data }) => {
  const navigate = useNavigate();
  //   console.log(data);

  const [tableData, setTableData] = useState<any[]>([]);
  const [filterShow, setFilterShow] = useState<boolean>(false);
  const [actionRowIndex, setActionRowIndex] = useState<number | null>(null);

  useEffect(() => {
    setTableData(
      data?.map((d: any) => {
        return {
          organization: d.profile.organization,
          username: d.profile.name,
          email: d.email,
          phoneNumber: d.phoneNumber,
          dateJoined: d.createdAt,
          status: d.status,
          id: d.id,
        };
      })
    );
  }, [data]);

  const handleFilterClick = () => {
    setFilterShow((prev) => !prev);
  };

  const handleActionClick = (index: number) => {
    setActionRowIndex((prev) => (prev === index ? null : index));
  };

  const handleUserClick = (row: any) => {
    console.log(row);
    navigate(`/dashboard/view_user/${row.id}`);
  };

  return (
    <div className={classes.tableContainer}>
      {filterShow && (
        <TableFilter filterShow={filterShow} setFilterShow={setFilterShow} />
      )}
      <table className={classes.table}>
        <thead>
          <tr className="">
            {columns &&
              columns.map((head: any, i: number) => (
                <th key={`${i}column`} className="">
                  <div onClick={handleFilterClick}>
                    <p>{head.label}</p>
                    {head.label && <img src={filter} alt="filter_icon" />}
                  </div>
                </th>
              ))}
          </tr>
        </thead>
        <tbody className="w-full">
          {tableData.map((row: any, i: number) => (
            <tr
              key={`data${i}`}
              onClick={() => {
                handleUserClick(row);
              }}
            >
              {columns?.map((col: any, j: number) => (
                <td
                  key={`key${j}`}
                  className=""
                  style={
                    i === tableData.length - 1 ? { borderBottom: "0px" } : {}
                  }
                >
                  {col.value === "dateJoined" ? (
                    format(new Date(row[col.value]), "MMM dd, yyyy hh:mm a")
                  ) : col.value === "status" ? (
                    <div className={classes.status}>
                      {row[col.value] === "active" ? (
                        <p className={classes.active}>Active</p>
                      ) : row[col.value] === "blacklisted" ? (
                        <p className={classes.blacklisted}>Blacklisted</p>
                      ) : row[col.value] === "pending" ? (
                        <p className={classes.pending}>Pending</p>
                      ) : (
                        <p className={classes.inactive}>Inactive</p>
                      )}
                    </div>
                  ) : col.value === "action" ? (
                    <div className={classes.actionContainer}>
                      {actionRowIndex === i && (
                        <TableAction
                          setActionIndex={setActionRowIndex}
                          actionIndex={actionRowIndex}
                        />
                      )}

                      <HiOutlineDotsVertical
                        size={20}
                        onClick={() => handleActionClick(i)}
                      />
                    </div>
                  ) : (
                    row[col.value]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>{" "}
      </table>
    </div>
  );
};

export default Table;
