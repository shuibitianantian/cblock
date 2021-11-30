/** @jsxRuntime classic */
/**@jsx jsx */
import { css, jsx } from "@emotion/react";
import React, { useRef, useMemo } from "react";
import * as echarts from "echarts/core";
import useChart from "../../hooks/useChart";

const upColor = "#ec0000";
const upBorderColor = "#8A0000";
const downColor = "#00da3c";
const downBorderColor = "#008F28";

function getSign(data, dataIndex, openVal, closeVal, closeDimIdx) {
  var sign;
  if (openVal > closeVal) {
    sign = -1;
  } else if (openVal < closeVal) {
    sign = 1;
  } else {
    sign =
      dataIndex > 0
        ? // If close === open, compare with close of last record
          data[dataIndex - 1][closeDimIdx] <= closeVal
          ? 1
          : -1
        : // No record of previous, set to be positive
          1;
  }
  return sign;
}

function getOption(ticks) {
  const { open, high, low, close, volume } = ticks.indicators.quote[0];
  const timestamp = ticks.timestamp;
  const data = [];
  for (let i = 0; i < open.length; ++i) {
    try {
      data.push([
        echarts.format.formatTime(
          "yyyy-MM-dd\nhh:mm:ss",
          new Date(timestamp[i] * 1000)
        ),
        open[i].toFixed(2),
        high[i].toFixed(2),
        low[i].toFixed(2),
        close[i].toFixed(2),
        volume[i].toFixed(2),
        getSign(data, i, open[i], close[i], 4),
      ]);
    } catch (err) {
      console.log(err);
    }
  }

  const option = {
    dataset: {
      source: data,
    },
    title: {
      text: "Historical Stock Price",
      textStyle: {
        fontSize: "22px",
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
      },
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: false,
        },
      },
    },
    grid: [
      {
        top: "15%",
        left: "5%",
        right: "5%",
        bottom: 200,
      },
      {
        left: "10%",
        right: "10%",
        height: 80,
        bottom: 80,
      },
    ],
    xAxis: [
      {
        type: "category",
        scale: true,
        boundaryGap: false,
        // inverse: true,
        axisLine: { onZero: false },
        splitLine: { show: false },
        min: "dataMin",
        max: "dataMax",
      },
      {
        type: "category",
        gridIndex: 1,
        scale: true,
        boundaryGap: false,
        axisLine: { onZero: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        min: "dataMin",
        max: "dataMax",
      },
    ],
    yAxis: [
      {
        scale: true,
        splitArea: {
          show: true,
        },
      },
      {
        scale: true,
        gridIndex: 1,
        splitNumber: 2,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
      },
    ],
    dataZoom: [
      {
        type: "inside",
        xAxisIndex: [0, 1],
        start: 10,
        end: 100,
      },
      {
        show: true,
        xAxisIndex: [0, 1],
        type: "slider",
        bottom: 10,
        start: 10,
        end: 100,
      },
    ],
    visualMap: {
      show: false,
      seriesIndex: 1,
      dimension: 6,
      pieces: [
        {
          value: 1,
          color: upColor,
        },
        {
          value: -1,
          color: downColor,
        },
      ],
    },
    series: [
      {
        type: "candlestick",
        itemStyle: {
          color: upColor,
          color0: downColor,
          borderColor: upBorderColor,
          borderColor0: downBorderColor,
        },
        encode: {
          x: 0,
          y: [1, 4, 3, 2],
        },
      },
      {
        name: "Volumn",
        type: "bar",
        xAxisIndex: 1,
        yAxisIndex: 1,
        itemStyle: {
          color: "#7fbe9e",
        },
        large: true,
        encode: {
          x: 0,
          y: 5,
        },
      },
    ],
  };

  return option;
}

const styles = {
  chartContainer: css`
    width: 100%;
    height: 500px;
  `,
};
export const TickerChart = ({ data }) => {
  const chartRef = useRef(null);
  const option = useMemo(() => {
    return getOption(data);
  }, [data]);
  useChart(chartRef, option);

  return <div css={styles.chartContainer} ref={chartRef} />;
};
