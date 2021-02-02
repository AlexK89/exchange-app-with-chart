export const chartOptions = {
  legend: {
    labels: {
      fontColor: "#fff",
    },
  },
  title: {
    display: true,
    fontColor: "#fff",
    text: "Last 30 days",
  },
  scales: {
    yAxes: [
      {
        type: "linear",
        display: true,
        position: "left",
        id: "y-axis-1",
        ticks: {
          fontColor: "rgba(255,255,255,0.6)",
        },
        gridLines: {
          color: "rgba(255,255,255,0.1)",
        },
      },
    ],
    xAxes: [
      {
        ticks: {
          fontColor: "rgba(255,255,255,0.6)",
        },
        gridLines: {
          color: "rgba(255,255,255,0.1)",
        },
      },
    ],
  },
};
