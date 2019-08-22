import React from 'react';
import '../../static/App.css';
import jwt_decode from 'jwt-decode'

class WaitingList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };

    }
  
    componentDidMount() {
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        console.log(decoded.identity);
    }

   

    render() {
        return (
            <div >
               <p>Waiting List</p>
            </div>
        );
    }
}

export default WaitingList;