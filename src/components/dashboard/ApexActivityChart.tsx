import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const data = [
  120, 150, 170, 140, 180, 200, 220, 210, 190, 230, 250, 240
];

const options: ApexOptions = {
  chart: {
    id: "activity-area",
    toolbar: { show: false },
    zoom: { enabled: false },
    fontFamily: 'inherit',
  },
  xaxis: {
    categories: months,
    labels: { style: { fontSize: '13px' } },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    labels: { style: { fontSize: '13px' } },
    min: 0,
  },
  dataLabels: { enabled: false },
  stroke: {
    curve: "smooth",
    width: 3,
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.3,
      opacityTo: 0,
      stops: [0, 90, 100]
    }
  },
  colors: [
    '#6366f1' // Indigo-500
  ],
  grid: {
    borderColor: 'rgba(0,0,0,0.07)',
    strokeDashArray: 4,
    yaxis: { lines: { show: true } },
    xaxis: { lines: { show: false } },
  },
  tooltip: {
    theme: 'light',
    y: { formatter: (val: number) => `${val} commandes` }
  },
  responsive: [
    {
      breakpoint: 640,
      options: {
        chart: { height: 220 },
      },
    },
  ],
  theme: {
    mode: 'light', // Peut être dynamique si tu veux
  },
};

const series = [
  {
    name: "Commandes",
    data,
  },
];

export default function ApexActivityChart() {
  return (
    <div className="w-full h-full">
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={340}
      />
    </div>
  );
} 