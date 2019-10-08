import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
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

it('renders linechart without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LineChart />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders barchart without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BarChart />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders barchart-2 without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BarChart2 />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders stackedchart without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<StackedChart />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders sparkline without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Sparkline />, div);
  ReactDOM.unmountComponentAtNode(div);
});
