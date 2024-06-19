import { useEffect, useState } from "react";
import classes from "./Users.module.scss";
import MetricsCard from "@/components/ui/MetricsCard";
import userIcon from "@/assets/icons/usersCardIcon.svg";
import activeUsersIcon from "@/assets/icons/activeUsersIcon.svg";
import loanUsersIcon from "@/assets/icons/loanUsersIcon.svg";
import savingsUsersIcon from "@/assets/icons/savingsUsersIcon.svg";
import Table from "@/components/ui/Table/Table";
import Pagination from "@/components/ui/Table/Pagination";
import { usePagination } from "@/store/usePagination";

const DATA = JSON.parse(localStorage.getItem("usersData") as string) || [];
const Dashboard = () => {
  const formattedData = DATA.map((d: any) => ({
    organization: d.profile.organization,
    username: d.profile.name,
    email: d.email,
    phoneNumber: d.phoneNumber,
    dateJoined: d.createdAt,
    status: d.status,
    id: d.id,
  }));
  const [usersData, setUsersData] = useState(formattedData);
  const [paginatedData, setPaginatedData] = useState([]);
  const [showPerPage, setShowPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  let indexOfLastUser = showPerPage * currentPage;
  let indexOfFirstUser = indexOfLastUser - showPerPage;

  useEffect(() => {
    setPaginatedData(usersData.slice(indexOfFirstUser, indexOfLastUser));
    window.scrollTo(0, 0);
  }, [showPerPage, currentPage, usersData]);

  const activeUsers = formattedData.filter(
    (user: any) => user.status === "active"
  );
  const loanUsers = DATA.filter(
    (user: any) => Number(user.education.loanRepayment) > 0
  );

  console.log(DATA);
  const dashboardMetrics = [
    { name: "USERS", icon: userIcon, value: formattedData.length },
    { name: "ACTIVE USERS", icon: activeUsersIcon, value: activeUsers.length },
    { name: "USERS WITH LOANS", icon: loanUsersIcon, value: loanUsers.length },
    { name: "USERS WITH SAVINGS", icon: savingsUsersIcon, value: 0 },
  ];

  const tableColumns = [
    { label: "ORGANIZATION", value: "organization", filter: true },
    { label: "USERNAME", value: "username", filter: true },
    { label: "EMAIL", value: "email", filter: true },
    { label: "PHONE NUMBER", value: "phoneNumber", filter: true },
    { label: "DATE JOINED", value: "dateJoined", filter: true },
    { label: "STATUS", value: "status", filter: true },
    { label: "", value: "action", filter: true },
  ];

  return (
    <div className={classes.container}>
      <h1>Users</h1>
      <div className={classes.metricsContainer}>
        {dashboardMetrics.map((cardDetails) => (
          <MetricsCard
            key={cardDetails.name}
            name={cardDetails.name}
            icon={cardDetails.icon}
            value={cardDetails.value}
            storedUsersData={formattedData}
          />
        ))}
      </div>
      <div className={classes.tableContainer}>
        <Table
          data={paginatedData}
          columns={tableColumns}
          setUsersData={setUsersData}
          allData={formattedData}
          setCurrentPage={setCurrentPage}
        />
        <Pagination
          data={usersData}
          showPerPage={showPerPage}
          setShowPerPage={setShowPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Dashboard;
