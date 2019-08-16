import React from 'react';
import '../../../static/App.css';
// eslint-disable-next-line
import SliderBox from '../../Slider';

class WordCloud extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }
    render() {
        return (
            <div>
                <h1 style={{ color: 'white' }}>Hello Word-Cloud</h1>
                {/* < SliderBox /> */}
            </div>
        );
    }
}

export default WordCloud;