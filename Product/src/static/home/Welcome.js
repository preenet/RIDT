import React from 'react';
import '../../static/App.css';

class WelcomeBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  render() {
    return (
      <div >
        <div className="welcome"></div>

      </div>
    );
  }
}

export default WelcomeBox;