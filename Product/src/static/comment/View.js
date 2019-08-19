import React from 'react';
import '../../static/App.css';
import WelcomeBox from '../home/Welcome';


class ViewBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};


    }

    render() {

        const hotelInfo = {
            Hotel_A: ["Description of hotel A", "/image/hotelA.jpg"],
            Hotel_B: ["Description of hotel B", "/image/hotelB.jpg"],
            Hotel_C: ["Description of hotel C", "/image/hotelC.jpg"],
            Hotel_D: ["Description of hotel D", "/image/hotelD.jpg"],
            Hotel_E: ["Description of hotel E", "/image/hotelE.jpg"],
            Hotel_F: ["Description of hotel F", "/image/hotelF.jpg"],
            Hotel_G: ["Description of hotel G", "/image/hotelG.jpg"],
            Hotel_H: ["Description of hotel H", "/image/hotelH.jpg"],
        }

        const Image = () =>
            <div>
                {
                    Object.entries(hotelInfo)
                        .map(([hotel, description]) =>

                            <div className="container" key={hotel}>

                                <div className="text-des">
                                    <strong> {description[0]}</strong>
                                </div>
                                <div>
                                    <a href="/">
                                        <img className="hotel-img" src={description[1]} alt={hotel} />
                                    </a>

                                </div>

                                <div className="middle" >
                                    <div className="text" > {hotel} </div>
                                </div >
                            </div>)
                }
            </div>




        return (

            <div className="view">
                <WelcomeBox />
                <Image />


            </div>



        );
    }

}

export default ViewBox;