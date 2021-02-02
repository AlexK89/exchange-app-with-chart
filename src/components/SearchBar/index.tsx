import { useState } from "react";
import Select from "react-select";
import styles from "./SearchBar.module.scss";
import { getCurrentExchangeRate, getExchangeHistoryData } from "helpers/API";
import { chartDataFormatter } from "helpers/chartFormatter";
import { allCurrencies } from "helpers/currencyList";

interface IProps {
  saveExchangeRates: any;
}

interface ICurrency {
  type: { value?: string | undefined };
  from: { value?: string | undefined };
  to: { value?: string | undefined };
}

const currencyTypes = [
  { value: "physical", label: "Physical" },
  { value: "digital", label: "Digital" },
];

const content = {
  currencyType: "Currency Type",
  from: "From",
  to: "To",
  buttonText: "Convert",
  value: "Value",
};

const SearchBar = ({ saveExchangeRates }: IProps) => {
  const [currency, setCurrency] = useState<ICurrency>({
    type: currencyTypes[0],
    from: {},
    to: {},
  });
  const [inputValue, setInputValue] = useState<number>(0);

  const clickHandler = async () => {
    const current = await getCurrentExchangeRate(
      currency.from.value,
      currency.to.value
    );
    const history = await getExchangeHistoryData(
      currency.from.value,
      currency.to.value
    );

    const historyFormatted = chartDataFormatter(history);

    saveExchangeRates({
      current: {
        data: current,
        error: !current,
      },
      history: {
        data: historyFormatted,
        error: !historyFormatted,
      },
      value: inputValue || 0,
    });
  };

  const currencyTypeHandler = (input: { value?: string | undefined } | null) =>
    setCurrency({ type: input || {}, from: {}, to: {} });
  const currencyFromHandler = (input: { value?: string | undefined } | null) =>
    setCurrency({ ...currency, from: input || {} });
  const currencyToHandler = (input: { value?: string | undefined } | null) =>
    setCurrency({ ...currency, to: input || {} });
  const inputValueHandler = (event: { target: { value: string } }) =>
    setInputValue(parseFloat(event.target.value));

  const currenciesToRender = currency.type.value
    ? allCurrencies[currency.type.value]
    : [];
  const isBtnDisabled = !(currency.from.value && currency.to.value);

  return (
    <div className={styles.searchBar}>
      <label className={styles.typeSelectWrapper}>
        <span className={styles.labelText}>{content.currencyType}</span>
        <Select
          options={currencyTypes}
          onChange={currencyTypeHandler}
          value={currency.type}
        />
      </label>
      <div className={styles.fromValueWrapper}>
        <label className={styles.fromSelectWrapper}>
          <span className={styles.labelText}>{content.value}</span>
          <input
            type="number"
            value={inputValue}
            step=".1"
            min="0"
            onChange={inputValueHandler}
          />
        </label>
      </div>
      <label className={styles.fromSelectWrapper}>
        <span className={styles.labelText}>{content.from}</span>
        <Select
          options={currenciesToRender}
          onChange={currencyFromHandler}
          value={currency.from}
        />
      </label>

      <label className={styles.toSelectWrapper}>
        <span className={styles.labelText}>{content.to}</span>
        <Select
          options={currenciesToRender}
          onChange={currencyToHandler}
          value={currency.to}
        />
      </label>

      <div className={styles.buttonWrapper}>
        <button onClick={clickHandler} disabled={isBtnDisabled}>
          {content.buttonText}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
