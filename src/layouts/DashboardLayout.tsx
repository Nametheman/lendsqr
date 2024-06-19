import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";
import classes from "./Dashboard.module.scss";
import MobileNav from "@/components/MobileNav";
import { useShowMobileNav } from "@/store/useMobileNav";
import { Navigate } from "react-router-dom";

const DashboardLayout = () => {
  const DATA = JSON.parse(localStorage.getItem("usersData") as string) || [];

  const { showMobileNav } = useShowMobileNav();

  if (DATA.length === 0) {
    return <Navigate to="/" />;
  }
  return (
    <main className={classes.dashboardContainer}>
      <Sidebar />
      <div className={classes.pageContainer}>
        <Navbar />
        <div className={classes.pageContent}>
          <Outlet />
        </div>
      </div>
      {showMobileNav && <MobileNav />}
    </main>
  );
};

export default DashboardLayout;
