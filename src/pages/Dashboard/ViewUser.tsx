import React, { useState } from "react";
import classes from "./ViewUser.module.scss";
import backArrow from "@/assets/icons/backArrow.svg";
import { Link, useParams } from "react-router-dom";
import userAvatar from "@/assets/images/userAvatar.svg";
import { Rating } from "react-simple-star-rating";
import UserStatusModal from "@/components/ui/Modals/UserStatusModal";

const DATA = JSON.parse(localStorage.getItem("usersData") as string) || [];

const ViewUser = () => {
  const tabsBtn = [
    "General Details",
    "Documents",
    "Bank Details",
    "Loans",
    "Savings",
    "App and System",
  ];

  const [activeTab, setActiveTab] = useState<string>("General Details");
  const [showActionModal, setShowActionModal] = useState<boolean>(false);
  const [modalAction, setModalAction] = useState<string>("");

  const params = useParams();
  const userId = params.user_id;

  const user = DATA.find((user: any) => user.id === userId);

  const handleBlacklistUser = () => {
    setModalAction("blacklist");
    setShowActionModal(true);
  };

  const handleActivateUser = () => {
    setModalAction("activate");
    setShowActionModal(true);
  };

  const handleDeactivateUser = () => {
    setModalAction("deactivate");
    setShowActionModal(true);
  };

  const userActive = user && user.status === "active";
  const userInactiveOrPending =
    user &&
    (user.status === "inactive" ||
      user.status === "pending" ||
      user.status === "blacklisted");
  const userBlacklisted = user && user.status === "blacklisted";
  return (
    <section className={classes.viewUserContainer}>
      <Link to="/dashboard/customers/users" className={classes.goBack}>
        <img src={backArrow} alt="back_arrow_icon" />
        <p>Back to Users</p>
      </Link>
      <div className={classes.userActionsContainer}>
        <h2>User Details</h2>
        <div className={classes.userActionsBtns}>
          {(user && userBlacklisted) || (
            <button className={classes.blacklist} onClick={handleBlacklistUser}>
              BLACKLIST USER
            </button>
          )}
          {user && userInactiveOrPending && (
            <button className={classes.activate} onClick={handleActivateUser}>
              ACTIVATE USER
            </button>
          )}
          {user && user.status === "active" && (
            <button
              className={classes.deactivate}
              onClick={handleDeactivateUser}
            >
              DEACTIVATE USER
            </button>
          )}
        </div>
      </div>

      <div className={classes.userDetailsHead}>
        <div className={classes.firstUserDetails}>
          <div className={classes.userNameDetails}>
            <img src={userAvatar} alt="userAvatar" />
            <div className={classes.userName}>
              <h2>{user && user.profile.name}</h2>
              <p>LSQFf587g90</p>
            </div>
          </div>
          <div className={classes.userTier}>
            <p>User's Tier</p>
            <Rating readonly={true} iconsCount={3} size={20} initialValue={2} />
          </div>
          <div className={classes.userBalance}>
            <h2>₦200,000</h2>
            <p>9912345678/Providus Bank</p>
          </div>
        </div>
        <div className={classes.secondUserDetails}>
          {tabsBtn.map((tab) => (
            <button
              className={tab === activeTab ? classes.active : ""}
              onClick={() => setActiveTab(tab)}
              key={tab}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      {activeTab === "General Details" ? (
        <div className={classes.allUserInformation}>
          <div className={classes.infoSection}>
            <h4>Personal Information</h4>
            <div className={classes.infoGridSection}>
              <div className={classes.info}>
                <p>FULL NAME</p>
                <h3>{user && user.profile.name}</h3>
              </div>
              <div className={classes.info}>
                <p>PHONE NUMBER</p>
                <h3>{user && user.phoneNumber}</h3>
              </div>
              <div className={classes.info}>
                <p>EMAIL ADDRESS</p>
                <h3>{user && user.email}</h3>
              </div>
              <div className={classes.info}>
                <p>BVN</p>
                <h3>{user && user.phoneNumber}</h3>
              </div>
              <div className={classes.info}>
                <p>GENDER</p>
                <h3>{user && user.profile.gender}</h3>
              </div>
              <div className={classes.info}>
                <p>MARITAL STATUS</p>
                <h3>
                  {user &&
                    user.profile.marialStatus.slice(0, 1).toUpperCase() +
                      user.profile.marialStatus.slice(1)}
                </h3>
              </div>
              <div className={classes.info}>
                <p>CHILDREN</p>
                <h3>{user && user.profile.children}</h3>
              </div>
              <div className={classes.info}>
                <p>TYPE OF RESIDENCE</p>
                <h3>
                  {user &&
                    user.profile.residence.slice(0, 1).toUpperCase() +
                      user.profile.residence.slice(1) +
                      "'s Apartment"}
                </h3>
              </div>
            </div>
          </div>
          <div className={classes.infoSection}>
            <h4>Education and Employment</h4>
            <div className={classes.infoGridSection}>
              <div className={classes.info}>
                <p>LEVEL OF EDUCATION</p>
                <h3>{user && user.education.level}</h3>
              </div>
              <div className={classes.info}>
                <p>EMPLOYMENT STATUS</p>
                <h3>
                  {user && user.education.employment === true
                    ? "Employed"
                    : "Unemployed"}
                </h3>
              </div>
              <div className={classes.info}>
                <p>SECTOR OF EMPLOYMENT</p>
                <h3>{user && user.education.employmentSector}</h3>
              </div>
              <div className={classes.info}>
                <p>DURATION OF EMPLOYMENT</p>
                <h3>{user && user.education.duration} Year(s)</h3>
              </div>
              <div className={classes.info}>
                <p>OFFICE EMAIL</p>
                <h3>{user && user.email}</h3>
              </div>
              <div className={classes.info}>
                <p>MONTHLY INCOME</p>
                <h3>
                  {user &&
                    `₦${Number(user.education.minIncome)
                      .toFixed(2)
                      .toLocaleString()} - ₦${Number(user.education.maxIncome)
                      .toFixed(2)
                      .toLocaleString()}`}
                </h3>
              </div>
              <div className={classes.info}>
                <p>LOAN REPAYMENT</p>
                <h3>
                  {user &&
                    `₦${Number(user.education.loanRepayment).toFixed(2)}`}
                </h3>
              </div>
            </div>
          </div>
          <div className={classes.infoSection}>
            <h4>Socials</h4>
            <div className={classes.infoGridSection}>
              <div className={classes.info}>
                <p>TWITTER</p>
                <h3>{`@${user && user.username}`}</h3>
              </div>
              <div className={classes.info}>
                <p>FACEBOOK</p>
                <h3>{user && user.profile.name}</h3>
              </div>
              <div className={classes.info}>
                <p>INSTAGRAM</p>
                <h3>{`@${user && user.username}`}</h3>
              </div>
            </div>
          </div>
          <div className={classes.infoSection}>
            <h4>Guarantor</h4>
            <div className={classes.infoGridSection}>
              <div className={classes.info}>
                <p>FULL NAME</p>
                <h3>{user && user.guarantor.fullName}</h3>
              </div>
              <div className={classes.info}>
                <p>PHONE NUMBER</p>
                <h3>{user && user.guarantor.phoneNumber}</h3>
              </div>
              <div className={classes.info}>
                <p>EMAIL ADDRESS</p>
                <h3>{user && user.guarantor.email}</h3>
              </div>
              <div className={classes.info}>
                <p>RELATIONSHIP</p>
                <h3>{user && user.guarantor.relationship}</h3>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={classes.noInfo}>
          <p>Nothing to show here!</p>
        </div>
      )}
      {showActionModal && (
        <UserStatusModal
          setShowActionModal={setShowActionModal}
          showActionModal={showActionModal}
          modalAction={modalAction}
          row={user}
        />
      )}
    </section>
  );
};

export default ViewUser;
