import React, { useEffect, useState } from "react";
import classes from "./Table.module.scss";
import filter from "@/assets/icons/filter.svg";
import { format } from "date-fns";
import TableFilter from "./TableFilter";
import { HiOutlineDotsVertical } from "react-icons/hi";
import TableAction from "./TableAction";
import UserStatusModal from "../Modals/UserStatusModal";
import { TABLECOLUMNSTYPE, TABLEDATATYPE } from "@/types/appTypes";

interface ITableProps {
  columns: TABLECOLUMNSTYPE[];
  data: TABLEDATATYPE[];
  setUsersData: (props: TABLEDATATYPE[]) => void;
  allData: TABLEDATATYPE[];
  setCurrentPage: (number: number) => void;
}

const Table: React.FC<ITableProps> = ({
  columns,
  data,
  allData,
  setUsersData,
  setCurrentPage,
}) => {
  const [tableData, setTableData] = useState<TABLEDATATYPE[]>([]);
  const [filterShow, setFilterShow] = useState<boolean>(false);
  const [actionRowIndex, setActionRowIndex] = useState<number | null>(null);
  const [showActionModal, setShowActionModal] = useState<boolean>(false);
  const [modalAction, setModalAction] = useState<string>("");

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleFilterClick = () => {
    setFilterShow((prev) => !prev);
  };

  const handleActionClick = (index: number) => {
    setActionRowIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className={classes.tableContainer}>
      {filterShow && (
        <TableFilter
          filterShow={filterShow}
          setFilterShow={setFilterShow}
          setUsersData={setUsersData}
          usersData={allData}
          setCurrentPage={setCurrentPage}
        />
      )}
      {showActionModal && (
        <UserStatusModal
          setShowActionModal={setShowActionModal}
          showActionModal={showActionModal}
          modalAction={modalAction}
          row={tableData[actionRowIndex as number]}
        />
      )}
      <table className={classes.table}>
        <thead>
          <tr>
            {columns &&
              columns.map((head: TABLECOLUMNSTYPE, i: number) => (
                <th key={`${i}column`} className="">
                  <div onClick={handleFilterClick}>
                    <p>{head.label}</p>
                    {head.label && <img src={filter} alt="filter_icon" />}
                  </div>
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row: TABLEDATATYPE, i: number) => (
            <tr key={`data${i}`}>
              {columns?.map((col: TABLECOLUMNSTYPE, j: number) => (
                <td
                  key={`key${j}`}
                  className=""
                  style={
                    i === tableData.length - 1 ? { borderBottom: "0px" } : {}
                  }
                >
                  {col.value === "dateJoined" && row[col.value] ? (
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
                          showActionModal={showActionModal}
                          setShowActionModal={setShowActionModal}
                          setModalAction={setModalAction}
                          row={row}
                        />
                      )}

                      <HiOutlineDotsVertical
                        size={20}
                        onClick={() => handleActionClick(i)}
                      />
                    </div>
                  ) : (
                    row[col.value as keyof TABLEDATATYPE]
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
