import React from 'react';
import '../../../static/App.css';

import ReactWordcloud from 'react-wordcloud';
import { getWords } from '../../services/DataServices'

const options = {
    colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
    enableTooltip: true,
    deterministic: false,
    fontFamily: 'impact',
    fontSizes: [20, 100],
    fontStyle: 'normal',
    fontWeight: 'normal',
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 90],
    scale: 'sqrt',
    spiral: 'archimedean',
    transitionDuration: 500,
  };


class WordCloud extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            words:[]
        }
    }

    componentDidMount(){
        this.getWords();
    }

    getWords() {
        getWords().then(data => {
          this.setState({
              words: data
          });

        }).catch(err => {
            alert('Cannot connect to database, please try again!');
        })
    }

    render() {

        return (
            <div style={{height: 600, width: 900, margin: 'auto'}}>
                <ReactWordcloud options={options} words={this.state.words} />
            </div>
        );
    }
}

export default WordCloud;

