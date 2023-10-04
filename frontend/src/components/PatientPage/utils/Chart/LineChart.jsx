import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
import { bloodpressure, bmi, oxygenSaturation, diabetesData, cholesterolData, temp } from './data';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


function LineChart() {
  const options1 = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", // "light1", "dark1", "dark2"
    title: {
      text: "Blood Pressure"
    },
    axisY: {
      title: "Systolic",
      suffix: ""
    },
    axisX: {
      title: "Year",
      interval: 1
    },
    data: [{
      type: "line",
      toolTipContent: "Week {x}: {y}",
      dataPoints: [
        { x: 2013, y: 125 },
        { x: 2014, y: 130 },
        { x: 2015, y: 135 },
        { x: 2016, y: 140 },
        { x: 2017, y: 142 },
        { x: 2018, y: 138 },
        { x: 2019, y: 132 },
        { x: 2020, y: 137 },
        { x: 2021, y: 128 },
        { x: 2022, y: 145 },
      ]
    }]
  }
  const options2 = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", // "light1", "dark1", "dark2"
    title: {
      text: "Diabetes Data"
    },
    axisY: {
      title: "Blood Sugar",
      suffix: ""
    },
    axisX: {
      title: "Year",
      interval: 1
    },
    data: [{
      type: "line",
      toolTipContent: "Week {x}: {y}",
      dataPoints: [
        {"x": 2013, "y": 120},
        {"x": 2014, "y": 95},
        {"x": 2015, "y": 110},
        {"x": 2016, "y": 100},
        {"x": 2017, "y": 130},
        {"x": 2018, "y": 85},
        {"x": 2019, "y": 120},
        {"x": 2020, "y": 95},
        {"x": 2021, "y": 110},
        {"x": 2022, "y": 100}
      ]
    }]
  }
  const options3 = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", // "light1", "dark1", "dark2"
    title: {
      text: "Cholestrol Data"
    },
    axisY: {
      title: "Cholestrol",
      suffix: ""
    },
    axisX: {
      title: "Year",
      interval: 1
    },
    data: [{
      type: "line",
      toolTipContent: "Week {x}: {y}",
      dataPoints: [
        { x: 2013, y: 210 },
        { x: 2014, y: 200 },
        { x: 2015, y: 190 },
        { x: 2016, y: 180 },
        { x: 2017, y: 170 },
        { x: 2018, y: 160 },
        { x: 2019, y: 150 },
        { x: 2020, y: 140 },
        { x: 2021, y: 130 },
        { x: 2022, y: 120 },
      ]
    }]
  }
  return (
    <>
    <CanvasJSChart options={options1} />
    <CanvasJSChart options={options2} />
    <CanvasJSChart options={options3} />
    </>
  );
}

export default LineChart;