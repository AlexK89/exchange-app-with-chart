const getFormattedDataSets = (records: [{ data: object }]) => {
  const colors:
    | {
        open: string;
        high: string;
        low: string;
        close: string;
      }
    | any = {
    open: "#959595",
    high: "#05eb37",
    low: "#f00",
    close: "#FFFFFF",
  };
  const dataTypes = Object.keys(records[0].data);

  return dataTypes.map((dataType: string, i) => {
    const formattedDataType: string | any = dataType.split(" ")[1];

    return {
      label: formattedDataType,
      data: records.map((record: { data: object } | any) =>
        parseFloat(record.data[dataType])
      ),
      backgroundColor: "transparent",
      borderColor: colors[formattedDataType],
      borderWidth: 1,
      pointRadius: 2,
      pointHoverRadius: 2,
      pointBackgroundColor: colors[formattedDataType],
      scaleFontColor: "#FFFFFF",
      yAxisID: `y-axis-1`,
    };
  });
};

export const chartDataFormatter = (records: object[]) => {
  if (!records) return null;
  const recordsToArray = Object.keys(records).map(
    (recordKey: string | any) => ({
      date: recordKey,
      data: records[recordKey],
    })
  );

  const recordsToProcess =
    recordsToArray.length > 30 ? recordsToArray.slice(0, 30) : recordsToArray;
  const reverseRecordsToProcess: object[] | any = recordsToProcess.reverse();

  return {
    labels: reverseRecordsToProcess.map(
      (record: { date: string } | any) => record.date
    ),
    datasets: getFormattedDataSets(reverseRecordsToProcess),
  };
};
