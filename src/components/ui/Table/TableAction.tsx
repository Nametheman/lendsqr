import React, { useRef, useEffect } from "react";
import classes from "./Table.module.scss";
import viewIcon from "@/assets/icons/view-user.svg";
import blockIcon from "@/assets/icons/block-user.svg";
import checkIcon from "@/assets/icons/check-user.svg";

interface ITableActionProps {
  setActionIndex: (props: any) => void;
  actionIndex: number | null;
}

const TableAction: React.FC<ITableActionProps> = ({
  setActionIndex,
  actionIndex,
}) => {
  const actionRef = useRef<HTMLDivElement>(null);
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
  };

  const handleBlacklistUser = () => {
    setActionIndex(null);
  };

  const handleActivateUser = () => {
    setActionIndex(null);
  };

  return (
    <div className={classes.actionElement} ref={actionRef}>
      <button onClick={handleViewDetails}>
        <img src={viewIcon} alt="view_icon" /> View Details
      </button>
      <button onClick={handleBlacklistUser}>
        <img src={blockIcon} alt="block_icon" /> Blacklist User
      </button>
      <button onClick={handleActivateUser}>
        <img src={checkIcon} alt="check_icon" /> Activate User
      </button>
    </div>
  );
};

export default TableAction;
