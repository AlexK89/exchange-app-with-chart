import { Line } from "react-chartjs-2";
import { chartOptions } from "./config";

interface IProps {
  historyData: object[];
}

const Chart = ({ historyData }: IProps) => {
  return <Line data={historyData} options={chartOptions} />;
};

export default Chart;
