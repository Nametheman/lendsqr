import React from "react";
import logo from "@/assets/images/logo.svg";
import classes from "./Navbar.module.scss";
import SearchInput from "./ui/SearchInput";
import { FaRegBell } from "react-icons/fa";
import avatar from "@/assets/images/avatar.svg";
import caret from "@/assets/icons/caret.svg";
import bell from "@/assets/icons/bell.png";

const Navbar = () => {
  return (
    <nav className={classes.navContainer}>
      <div className={classes.firstChild}>
        <SearchInput />
      </div>
      <div className={classes.secondChild}>
        <p className={classes.docsLink}>Docs</p>
        <img src={bell} alt="bell_icon" className={classes.bellIcon} />
        <div className={classes.userPanelContainer}>
          <img src={avatar} alt="avatar" className={classes.avatar} />
          <div className={classes.userDetails}>
            <p>Emmanuel O</p>
            <img src={caret} alt="caret_icon" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
