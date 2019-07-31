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
          
            
           <div className="welcome"><h2>Real-Tme Interactive Dashboard</h2></div>
           <p style={{color : "white"}} >Please select hotel to view comments.</p>
          
  
            </div>
      );
    }
  }

  export default WelcomeBox;