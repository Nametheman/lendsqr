import classes from "./Navbar.module.scss";
import SearchInput from "./ui/SearchInput";
import avatar from "@/assets/images/avatar.svg";
import caret from "@/assets/icons/caret.svg";
import bell from "@/assets/icons/bell.png";
import logo from "@/assets/images/logo.svg";
import { HiMenuAlt3 } from "react-icons/hi";
import { useShowMobileNav } from "@/store/useMobileNav";

const Navbar = () => {
  const { showMobileNav, setShowMobileNav } = useShowMobileNav();
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
      <div className={classes.mobLogo}>
        <img src={logo} alt="logo" />
      </div>

      <div className={classes.mobSecond}>
        <img src={avatar} alt="avatar" className={classes.avatar} />
        <HiMenuAlt3
          size={30}
          className={classes.menuIcon}
          onClick={() => setShowMobileNav(!showMobileNav)}
        />
      </div>
    </nav>
  );
};

export default Navbar;
