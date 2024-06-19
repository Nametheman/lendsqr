import { createPortal } from "react-dom";
import classes from "./MobileNav.module.scss";
import logout from "@/assets/icons/sign-out 1.svg";
import briefcaseIcon from "@/assets/icons/briefcase 1.svg";
import caretArrow from "@/assets/icons/caretArrow.svg";
import homeIcon from "@/assets/icons/home 1.svg";
import userIcon from "@/assets/icons/users 1.svg";
import groupIcon from "@/assets/icons/user-friends 1.svg";
import loanIcon from "@/assets/icons/loan.svg";
import decisionIcon from "@/assets/icons/handshake-regular 1.svg";
import savingsIcon from "@/assets/icons/savings.svg";
import loanReqIcon from "@/assets/icons/loan.svg";
import userCheck from "@/assets/icons/user-check 1.svg";
import userTimes from "@/assets/icons/user-times 1.svg";
import savingsProductsIcon from "@/assets/icons/np_bank_148501_000000 1.svg";
import feesIcon from "@/assets/icons/coins-solid 1.svg";
import transactionsIcon from "@/assets/icons/icon.svg";
import galaxyIcon from "@/assets/icons/galaxy 1.svg";
import serviceIcon from "@/assets/icons/user-cog 1.svg";
import settlementIcon from "@/assets/icons/scroll 1.svg";
import reportIcon from "@/assets/icons/chart-bar 2.svg";
import settingsIcon from "@/assets/icons/sliders-h 1.svg";
import pricingIcon from "@/assets/icons/badge-percent 1.svg";
import auditIcon from "@/assets/icons/clipboard-list 1.svg";
import systemsIcon from "@/assets/icons/tire 1.svg";
import { Link, useNavigate } from "react-router-dom";
import { useShowMobileNav } from "@/store/useMobileNav";

const mobileDom = document.getElementById("mobileNav") as HTMLElement;
const MobileNav = () => {
  const { showMobileNav, setShowMobileNav } = useShowMobileNav();
  const sideBarLinks = [
    {
      section: "CUSTOMERS",
      links: [
        { link: "Users", icon: groupIcon, path: "/users" },
        { link: "Guarantors", icon: userIcon, path: "/guarantors" },
        { link: "Loans", icon: loanIcon, path: "/loans" },
        {
          link: "Decision Models",
          icon: decisionIcon,
          path: "/decision-model",
        },
        { link: "Savings", icon: savingsIcon, path: "/savings" },
        { link: "Loan Requests", icon: loanReqIcon, path: "/loan-requests" },
        { link: "Whitelist", icon: userCheck, path: "/whitelists" },
        { link: "Karma", icon: userTimes, path: "/karma" },
      ],
    },
    {
      section: "BUSINESSES",
      links: [
        { link: "Organization", icon: briefcaseIcon, path: "/users" },
        { link: "Loan Products", icon: loanIcon, path: "/guarantors" },
        {
          link: "Savings Products",
          icon: savingsProductsIcon,
          path: "/guarantors",
        },
        { link: "Fees and Charges", icon: feesIcon, path: "/guarantors" },
        { link: "Transactions", icon: transactionsIcon, path: "/guarantors" },
        { link: "Services", icon: galaxyIcon, path: "/guarantors" },
        { link: "Service Account", icon: serviceIcon, path: "/guarantors" },
        { link: "Settlements", icon: settlementIcon, path: "/guarantors" },
        { link: "Reports", icon: reportIcon, path: "/guarantors" },
      ],
    },
    {
      section: "SETTINGS",
      links: [
        { link: "Preferences", icon: settingsIcon, path: "/guarantors" },
        { link: "Fees and Pricing", icon: pricingIcon, path: "/guarantors" },
        { link: "Audit Logs", icon: auditIcon, path: "/guarantors" },
        { link: "Systems Messages", icon: systemsIcon, path: "/guarantors" },
      ],
    },
  ];

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/");
  };

  return createPortal(
    <div className={classes.container}>
      <div
        className={`${classes.mobileNav} ${showMobileNav && `${classes.open}`}`}
      >
        <div className={classes.sideBarMenuContainer}>
          <button className={classes.linkBtn}>
            <img src={briefcaseIcon} alt="briefcase_icon" />
            <p>Switch Organization</p>
            <img src={caretArrow} alt="caretArrow_icon" />
          </button>
          <button className={`${classes.linkBtn} ${classes.navBtn}`}>
            <img src={homeIcon} alt="homeIcon" />
            <p>Dashboard</p>
          </button>

          {sideBarLinks.map((section) => (
            <div className={classes.linksSection} key={section.section}>
              <p className={classes.sectionHeader}>{section.section}</p>
              {section.links.map((link) => (
                <Link
                  to={`/dashboard/${section.section.toLowerCase()}${link.path}`}
                  className={classes.navLink}
                  onClick={() => setShowMobileNav(false)}
                >
                  {" "}
                  <img src={link.icon} alt="linkIcon" />
                  <p>{link.link}</p>
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className={classes.logoutSection}>
          <button className={classes.logout} onClick={logoutHandler}>
            <img src={logout} alt="logout_icon" />
            <p>Logout</p>
          </button>
          <p className={classes.version}>v1.2.0</p>
        </div>
      </div>
    </div>,
    mobileDom
  );
};

export default MobileNav;
