import React, { useEffect } from "react";
import classes from "./UserStatusModal.module.scss";
import { createPortal } from "react-dom";
import { TABLEDATATYPE, USERTYPE } from "@/types/appTypes";

const modalRoot = document.getElementById("modal-root") as HTMLElement;
const DATA = JSON.parse(localStorage.getItem("usersData") as string) || [];

interface IUserStatusModalProps {
  setShowActionModal: (props: boolean) => void;
  showActionModal: boolean;
  modalAction: string;
  row: TABLEDATATYPE | USERTYPE;
}

const UserStatusModal: React.FC<IUserStatusModalProps> = ({
  setShowActionModal,
  showActionModal,
  modalAction,
  row,
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showActionModal]);

  const modalActionHandler = () => {
    const userId = row.id;
    if (modalAction === "blacklist") {
      DATA.forEach((user: USERTYPE) => {
        if (user.id === userId) {
          user.status = "blacklisted";
        }
      });
      localStorage.setItem("usersData", JSON.stringify(DATA));
      window.location.reload();
      setShowActionModal(false);
    } else if (modalAction === "activate") {
      DATA.forEach((user: USERTYPE) => {
        if (user.id === userId) {
          user.status = "active";
        }
      });
      localStorage.setItem("usersData", JSON.stringify(DATA));
      window.location.reload();
      setShowActionModal(false);
    } else if (modalAction === "deactivate") {
      DATA.forEach((user: USERTYPE) => {
        if (user.id === userId) {
          user.status = "inactive";
        }
      });
      localStorage.setItem("usersData", JSON.stringify(DATA));
      window.location.reload();
      setShowActionModal(false);
    }
  };

  return createPortal(
    <div className={classes.userStatusModal}>
      <div className={classes.modalContent}>
        <h3>Are you sure about this?</h3>
        <p>
          Are you sure that you want to <strong>{modalAction}</strong> this
          account? This action <br />
          can't be undone
        </p>
        <div className={classes.btnContainer}>
          <button
            className={classes.cancel}
            onClick={() => setShowActionModal(false)}
          >
            Cancel
          </button>
          <button className={classes.action} onClick={modalActionHandler}>
            Yes, {modalAction}
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default UserStatusModal;
