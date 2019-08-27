import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { create } from "react-test-renderer";
import LineChart from './static/charts/summary/LineChart';
import BarChart from './static/charts/summary/Barchart';
import BarChart2 from './static/charts/summary/Barchart_2';
import StackedChart from './static/charts/summary/StackedChart';
import Sparkline from './static/charts/summary/Sparkline';
import Summary from './static/charts/summary/Summary';
import WordCloud from './static/charts/word_cloud/WordCloud';
import Heatmap from './static/charts/heatmap/Heatmap';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders summary without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Summary />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders word_cloud without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<WordCloud />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders heatmap without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Heatmap />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('linechart is working with expected data', () => {
  const component = create(< LineChart />);
  const instance = component.getInstance();
  const expected = instance.generateDayWiseTimeSeries(new Date('1 Jan 2017').getTime(), 48, {
    min: 0,
    max: 100
  });
  // console.log(expected);
  const received = instance.state.series[0].data;
  for (let i = 0; i < expected.length; i++) {
    expect(received[i][0]).toEqual(expected[i][0]);
    expect(received[i][1]).toBeCloseTo(expected[0][1], -3);
  }
});

it('barchart is working with expected data', () => {
  const component = create(< BarChart />);
  const instance = component.getInstance();
  const expected = [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380];
  const received = instance.state.series[0].data;
  expect(received).toEqual(expected);
});


it('barchart_2 is working with expected data', () => {
  const component = create(< BarChart2 />);
  const instance = component.getInstance();
  const expected = [{
    name: 'Neutral',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
  }, {
    name: 'Positive',
    data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
  }, {
    name: 'Negative',
    data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
  }];

  for (let i = 0; i < expected.length; i++) {
    const receivedName = instance.state.series[i].name;
    const receivedData = instance.state.series[i].data;
    expect(receivedName).toEqual(expected[i].name);
    expect(receivedData).toEqual(expected[i].data);
  }
});

it('stackedchart is working with expected data', () => {
  const component = create(< StackedChart />);
  const instance = component.getInstance();
  const expected = [{
    name: 'Neutral',
    data: [44, 55, 41, 67, 22, 43, 21, 49, 39]
  }, {
    name: 'Positive',
    data: [13, 23, 20, 8, 13, 27, 33, 12, 14]
  }, {
    name: 'Negative',
    data: [11, 17, 15, 15, 21, 14, 15, 13, 9]
  }];

  for (let i = 0; i < expected.length; i++) {
    const receivedName = instance.state.series[i].name;
    const receivedData = instance.state.series[i].data;
    expect(receivedName).toEqual(expected[i].name);
    expect(receivedData).toEqual(expected[i].data);
  }
});


it('sparklinechart is working with expected data', () => {
  const component = create(< Sparkline />);
  const instance = component.getInstance();
  
  const sparklineData = [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46];
  const expectedData1 = instance.randomizeArray(sparklineData);

  const expectedData2 = {
    seriesSpark1: [{
      data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
    }],
    seriesSpark2: [{
      data: [47, 45, 74, 14, 56, 74, 14, 11, 7, 39, 82]
    }],
    seriesSpark3: [{
      data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14]
    }],
    seriesSpark4: [{
      data: [15, 75, 47, 65, 14, 2, 41, 54, 4, 27, 15]
    }],
  }

  const expectedData3 = {
    total_comments: '135,965',
    positive_comments: '99,821',
    negative_comments: '10,212',
    neutral_comments: '25,932',
    percent_total: '100%',
    percent_positive: '73.4%',
    percent_negative: '7.5%',
    percent_neutral: '19.1%',
  }

  expect(expectedData2.seriesSpark1[0].data).toEqual(instance.state.seriesSpark1[0].data);
  expect(expectedData2.seriesSpark2[0].data).toEqual(instance.state.seriesSpark2[0].data);
  expect(expectedData2.seriesSpark3[0].data).toEqual(instance.state.seriesSpark3[0].data);
  expect(expectedData2.seriesSpark4[0].data).toEqual(instance.state.seriesSpark4[0].data);
  expect(expectedData3.total_comments).toEqual(instance.state.total_comments);
  expect(expectedData3.positive_comments).toEqual(instance.state.positive_comments);
  expect(expectedData3.negative_comments).toEqual(instance.state.negative_comments);
  expect(expectedData3.neutral_comments).toEqual(instance.state.neutral_comments);
  expect(expectedData3.percent_total).toEqual(instance.state.percent_total);
  expect(expectedData3.percent_positive).toEqual(instance.state.percent_positive);
  expect(expectedData3.percent_negative).toEqual(instance.state.percent_negative);
  expect(expectedData3.percent_neutral).toEqual(instance.state.percent_neutral);

  for (let i = 0; i < expectedData1.length; i++) {
    expect(expectedData1[0]).toBeCloseTo(instance.state.seriesTopSpark1[0].data[0], -3);
    expect(expectedData1[0]).toBeCloseTo(instance.state.seriesTopSpark2[0].data[0], -3);
    expect(expectedData1[0]).toBeCloseTo(instance.state.seriesTopSpark3[0].data[0], -3);
  }
});