import React from "react";
import classes from "./MetricsCard.module.scss";

interface IMetricsCardProps {
  name: string;
  value: number;
  icon: string;
}
const MetricsCard: React.FC<IMetricsCardProps> = ({ name, value, icon }) => {
  return (
    <div className={classes.cardContainer}>
      <img src={icon} alt="icon" className={classes.cardIcon} />
      <h2 className={classes.label}>{name}</h2>
      <h2 className={classes.metric}>{value.toLocaleString()}</h2>
    </div>
  );
};

export default MetricsCard;
