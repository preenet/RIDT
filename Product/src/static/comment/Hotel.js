import React from 'react';
import '../../static/App.css';
import { getHotelByName } from '../services/DataServices'
import TextField from '@material-ui/core/TextField';
import { Link, withRouter } from 'react-router-dom';
class HotelBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = { comments: [], isLoggedin: false, comment: '' };
    }

    componentDidMount() {
        this.getHotel();
        if (localStorage.getItem('admintoken') || localStorage.getItem('usertoken')) {
            this.setState({
                isLoggedin: true
            });
        }
    }


    getHotel = () => {
        const hotel = { name: this.props.hotelname }
        getHotelByName(hotel).then(res => {
            console.log(res.data);
            this.setState(
                {
                    comments: res.data
                },
            )
        }).catch(err => {
            console.log(err);
            alert('Cannot connect to database, please try again!');
        })
    }

    onCommentChanged(e) {
        this.setState({ comment: e.target.value });

    }

    clear() {
        this.setState({
            comment: ''
        });
    }

    submit(e) {

    }

    onBack(e) {
        e.preventDefault();
        this.props.history.goBack();
    }

    logout(e) {
        e.preventDefault();
        this.props.history.push('/');
        if (localStorage.usertoken) {
            localStorage.removeItem('usertoken');
        }
        if (localStorage.admintoken) {
            localStorage.removeItem('admintoken');
        }
        console.log('Log out successfully');
    }

    render() {

        const listItems = this.state.comments.map((c, i) =>

            <div className="text-des" key={i}>
                <div>
                    <strong>Date:  {c.date}  Rating: {c.rating} ID: {c.c_id}</strong>
                    <p>{c.content}</p>
                </div>


            </div>);
        return (
            <div>
                <button type="button" className="left-controller" onClick={this.onBack.bind(this)}>Back</button>
                <button type="button" className="right-controller" onClick={this.logout.bind(this)}>Logout</button>
                <h1 className='welcome'>{this.props.hotelname}</h1>
                <TextField
                    className='input-text'
                    label="Write Comment"
                    value={this.state.comment}
                    disabled={!this.state.isLoggedin}
                    onChange={this.onCommentChanged.bind(this)}
                />

                <div>
                    <small className="danger-error" > {!this.state.isLoggedin ? 'You need to login before typing!' : ''} </small>
                    <small className="danger-error">
                        <Link
                            className='small-login'
                            to={{
                                pathname: "/",
                                value: {
                                    isLoginOpen: true
                                }
                            }}>
                            {!this.state.isLoggedin ? 'Login' : ''}
                        </Link>
                    </small>


                </div>

                <button type="button"
                    className={
                        "controller " + (this.state.isLoginOpen ?
                            "selected-controller" :
                            "")
                    }
                    onClick={this.clear.bind(this)} >
                    Clear </button>

                <button type="button"
                    className={
                        "controller " + (this.state.isLoginOpen ?
                            "selected-controller" :
                            "")
                    }
                    onClick={this.submit} >
                    Submit </button>



                {listItems}

            </div>
        );
    }

}

export default withRouter(HotelBox);