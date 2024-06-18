import React from "react";
import classes from "./ViewUser.module.scss";
import backArrow from "@/assets/icons/backArrow.svg";

const ViewUser = () => {
  return (
    <section className="">
      <div>
        <img src={backArrow} alt="back_arrow_icon" />
        Back to Users
      </div>
    </section>
  );
};

export default ViewUser;
