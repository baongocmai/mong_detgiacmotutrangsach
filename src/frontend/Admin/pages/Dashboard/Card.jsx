import React, { useState, useEffect } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Cards.css";
import { BiChart } from "react-icons/bi";
import { UilTimes } from "@iconscout/react-unicons";

const Card = ({ title, color, barValue, value, filterType }) => {
  const [expanded, setExpanded] = useState(false);
  const [chartData, setChartData] = useState({
    categories: [],
    series: [],
  });

  const fetchChartData = async () => {
    const token = localStorage.getItem("token"); // Hoặc sessionStorage

    if (!token) {
      console.error("No token found. Please log in.");
      return; // Nếu không có token, không thực hiện yêu cầu
    }
    try {
      const response = await fetch(
        `http://3.26.145.187:8000/api/dashboard/chart-data?period=${filterType}`
      );
      if (!response.ok) throw new Error("Kết nối thất bại");
      const data = await response.json();
      setChartData(data);
    } catch (error) {
      console.error("Error fetching chart data:", error);
      setChartData({ categories: [], series: [] });
    }
  };

  useEffect(() => {
    if (expanded) {
      fetchChartData();
    }
  }, [expanded, filterType]);

  return (
    <LayoutGroup>
      {expanded ? (
        <ExpandedCard
          title={title}
          color={color}
          chartData={chartData}
          setExpanded={() => setExpanded(false)}
        />
      ) : (
        <CompactCard
          title={title}
          color={color}
          barValue={barValue}
          value={value}
          setExpanded={() => setExpanded(true)}
        />
      )}
    </LayoutGroup>
  );
};

const CompactCard = ({ title, color, barValue, value, setExpanded }) => (
  <motion.div
    className="CompactCard"
    style={{
      background: color.backGround,
      boxShadow: color.boxShadow,
    }}
    onClick={setExpanded}
  >
    <div className="radialBar">
      <CircularProgressbar value={barValue} text={`${barValue}%`} />
      <span>{title}</span>
    </div>
    <div className="detail">
      <span>{value}</span>
      <span>Last 24 Hours</span>
    </div>
  </motion.div>
);

const ExpandedCard = ({ title, color, chartData, setExpanded }) => (
  <motion.div
    className="ExpandedCard"
    style={{
      background: color.backGround,
      boxShadow: color.boxShadow,
    }}
    layoutId="expandableCard"
  >
    <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
      <UilTimes onClick={setExpanded} />
    </div>
    <span>{title}</span>
    <div className="chartContainer">
      <BiChart
        options={{
          chart: { id: "basic-bar" },
          xaxis: { categories: chartData.categories },
          tooltip: { enabled: true },
          dataLabels: { enabled: false },
        }}
        series={chartData.series}
        type="line"
        height="90%"
        width="100%"
      />
    </div>
    <span>Last 24 hours</span>
  </motion.div>
);

export default Card;
