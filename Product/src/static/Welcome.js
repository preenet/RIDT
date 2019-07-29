import React from 'react';
import './App.css';

class WelcomeBox extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
  
    }
  
    render() {
      return (
        <div >
          
            
           <div className="welcome">Real-Tme Interactive Dashboard</div>
           <p>Please select hotel to view comments.</p>
          
  
            </div>
      );
    }
  }

  export default WelcomeBox;