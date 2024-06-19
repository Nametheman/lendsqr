import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";
import classes from "./Dashboard.module.scss";

const DashboardLayout = () => {
  return (
    <main className={classes.dashboardContainer}>
      <Sidebar />
      <div className={classes.pageContainer}>
        <Navbar />
        <div className={classes.pageContent}>
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
