import React from 'react';
import './App.css';
import SliderBox from './Slider';

class Word_Cloud extends React.Component {
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

export default Word_Cloud;