import React from 'react';
import './App.css';
import LoginBox from './Login';
import ViewBox from './View';



class HomeBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoginOpen: false, isViewOpen: true };
    }

    showLoginBox() {
        console.log('LoginBox is showing');
        this.setState({ isLoginOpen: true, isViewOpen: false });
    }

    showViewBox() {
        console.log('ViewBox is showing');
        this.setState({ isLoginOpen: false, isViewOpen: true });
    }

    render() {
        
          
        return (

            <div className="root-container" >

                <button type="button"
                    className={
                        "controller " + (this.state.isLoginOpen ?
                            "selected-controller" :
                            "")
                    }
                    onClick={this.showLoginBox.bind(this)} >
                    Login </button>




                {
                    /* <div className="box-controller">
                              
                                
                      
                              </div> */
                }

                       


                {this.state.isLoginOpen && < LoginBox />}
                {this.state.isViewOpen && < ViewBox />}
               
                {this.state.isLoginOpen && <button type="button"
                    className="cancel-btn"
                            onClick={this.showViewBox.bind(this)}>
                    Cancel </button>}
                

            </div>
        );
    }
}

export default HomeBox;