import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Link, Outlet } from "react-router-dom";
import classes from "../../layouts/Dashboard.module.scss";
import notFoundImg from "@/assets/images/404.png";

const DashboardLayout = () => {
  return (
    <main className={classes.dashboardContainer}>
      <Sidebar />
      <div className={classes.pageContainer}>
        <Navbar />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            marginTop: "10rem",
            flexDirection: "column",
          }}
        >
          {" "}
          <img src={notFoundImg} alt="404Img" />
          <Link
            to={"/dashboard/customers/users"}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "#39cdcc",
              color: "white",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Back To HomePage
          </Link>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
