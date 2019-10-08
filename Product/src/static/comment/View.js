import React from 'react';
import '../../static/App.css';
import WelcomeBox from '../home/Welcome';
import { Link } from 'react-router-dom';
import { getHotelList } from '../services/DataServices'

class ViewBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = { hotels: [] };
    }

    componentDidMount() {
        this.getAllHotel();
    }

    getAllHotel = () => {
        getHotelList().then(data => {

            this.setState(
                {
                    hotels: [...data.results]
                },
            )
        }).catch(err => {
            console.log(err);
            alert('Cannot connect to database, please try again!');
        })
    }

    render() {

        const listItems = this.state.hotels.map((d) =>

            <div className="grid-item" key={d.hotel}>
                <div className="hotel-card">
                    <div className="text-des">
                        <strong> {d.hotel} ({d.count})</strong>
                    </div>

                    <div>
                        <Link to={'/hotel/' + d.hotel} >
                            <img className="hotel-img" src='../image/hotelA.jpg' alt={d.hotel} /></Link>
                        <div className="middle" >
                            <div className="text" > Go to <strong>{d.hotel}</strong></div>
                        </div >
                    </div></div>

            </div>

        );

        return (
            <div>
                <WelcomeBox />

                <div className="grid-container">
                    {listItems}
                </div>
            </div>
        );

    }

}

export default ViewBox;