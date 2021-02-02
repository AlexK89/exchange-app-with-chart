import { useState } from "react";

import styles from "./App.module.scss";
import SearchBar from "./components/SearchBar";
import Chart from "./components/Chart";

export interface IExchangeRates {
  current: any;
  history: any;
  value?: number;
}

const App = () => {
  const [exchangeRates, setExchangeRates] = useState<IExchangeRates>({
    current: null,
    history: null,
  });

  const convertValue = (value: number) => {
    // I know key is ridiculous, we need to crate key formatter as a helper function.
    const product =
      parseFloat(exchangeRates.current?.data["5. Exchange Rate"]) * value;
    const formattedProduct = Math.round(product * 100) / 100;

    return formattedProduct;
  };

  return (
    <div className={styles.app}>
      <SearchBar saveExchangeRates={setExchangeRates} />
      {exchangeRates.value && (
        <h1 className={styles.convertedValue}>
          {convertValue(exchangeRates.value)}{" "}
          <span>{exchangeRates.current?.data["3. To_Currency Code"]}</span>
        </h1>
      )}
      {exchangeRates.history?.data && !exchangeRates.history?.error && (
        <Chart historyData={exchangeRates.history.data} />
      )}
      {exchangeRates.history?.error && (
        <p>Something went wrong with historic data</p>
      )}
    </div>
  );
};

export default App;
