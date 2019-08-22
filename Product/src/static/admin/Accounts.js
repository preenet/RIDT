import React from 'react';
import '../../static/App.css';
import jwt_decode from 'jwt-decode'

class Accounts extends React.Component {
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
               <p>Accounts</p>
            </div>
        );
    }
}

export default Accounts;