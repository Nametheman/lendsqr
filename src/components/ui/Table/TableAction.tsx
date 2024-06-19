import React, { useRef, useEffect } from "react";
import classes from "./Table.module.scss";
import viewIcon from "@/assets/icons/view-user.svg";
import blockIcon from "@/assets/icons/block-user.svg";
import checkIcon from "@/assets/icons/check-user.svg";
import { useNavigate } from "react-router-dom";
import { TABLEDATATYPE, USERTYPE } from "@/types/appTypes";

interface ITableActionProps {
  setActionIndex: (props: number | null) => void;
  actionIndex: number | null;
  showActionModal: boolean;
  setShowActionModal: (props: boolean) => void;
  setModalAction: (props: string) => void;
  row: TABLEDATATYPE | USERTYPE;
}

const TableAction: React.FC<ITableActionProps> = ({
  setActionIndex,
  actionIndex,
  setShowActionModal,
  setModalAction,
  row,
}) => {
  const actionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (actionRef) {
      const actionEl = actionRef.current;
      let mouseOver: boolean;
      if (actionEl) {
        actionEl.addEventListener("mouseenter", () => {
          mouseOver = true;
        });
        actionEl.addEventListener("mouseleave", () => {
          mouseOver = false;
        });
        document.addEventListener("click", () => {
          if (mouseOver == false && actionIndex !== null) {
            setActionIndex(null);
            mouseOver = true;
          }
        });
      }
    }
  }, []);

  const handleViewDetails = () => {
    setActionIndex(null);
    navigate(`/dashboard/view_user/${row.id}`);
  };

  const handleBlacklistUser = () => {
    setModalAction("blacklist");
    setShowActionModal(true);
  };

  const handleActivateUser = () => {
    setModalAction("activate");
    setShowActionModal(true);
  };

  const handleDeactivateUser = () => {
    setModalAction("deactivate");
    setShowActionModal(true);
  };
  return (
    <div className={classes.actionElement} ref={actionRef}>
      <button onClick={handleViewDetails}>
        <img src={viewIcon} alt="view_icon" /> View Details
      </button>
      {row.status === "blacklisted" || (
        <button onClick={handleBlacklistUser}>
          <img src={blockIcon} alt="block_icon" /> Blacklist User
        </button>
      )}
      {row.status === "active" || (
        <button onClick={handleActivateUser}>
          <img src={checkIcon} alt="check_icon" /> Activate User
        </button>
      )}
      {row.status === "inactive" || row.status === "blacklisted" || (
        <button onClick={handleDeactivateUser}>
          <img src={checkIcon} alt="check_icon" /> Deactivate User
        </button>
      )}
    </div>
  );
};

export default TableAction;
