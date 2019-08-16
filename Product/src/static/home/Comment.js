import React from 'react';
import './App.css';


class CommentBox extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hotelName: "", review: "", errors: [] };
  
    }
  
    showValidationErr(elm, msg) {
      this.setState((prevState) => ({ errors: [...prevState.errors, { elm, msg }] }));
    }
  
    clearValiadtionErr(elm) {
      this.setState((prevState) => {
        let newArr = [];
        for (let err of prevState.errors) {
          if (elm != err.elm) {
            newArr.push(err);
          }
        }
        return { errors: newArr };
      });
    }
  
    onHotelNameChanged(e) {
      this.setState({ hotelName: e.target.value })
      this.clearValiadtionErr("hotelName");
    }
  
    onReviewChanged(e) {
      this.setState({ review: e.target.value })
      this.clearValiadtionErr("review");
    }
  
    submitComment(e) {
      if (this.state.hotelName == "") {
        this.showValidationErr("hotelName", "Hotel name cannot be empty!")
      }
      if (this.state.review == "") {
        this.showValidationErr("review", "Review cannot be empty!")
      }
    }
  
    render() {
  
      let hotelNameErr = null;
      let reviewErr = null;
  
      for (let err of this.state.errors) {
        if (err.elm == "hotelName") {
          hotelNameErr = err.msg;
        }
        if (err.elm == "review") {
          reviewErr = err.msg;
        }
      }
  
      return (
        <div className="inner-container">
  
          <div className="header">
            Comment
            </div>
  
          <div className="box">
  
            <div className="input-group">
              <label htmlFor="hotelname">Hotel Name:</label><br />
              <input type="text" name="hotelname" className="comment-input"
                onChange={this.onHotelNameChanged.bind(this)} placeholder="Hotel Name" />
            </div>
  
            <small className="danger-error">{hotelNameErr ? hotelNameErr : ""}</small>
  
            <div className="input-group">
              <label htmlFor="review">Review:</label><br />
              <input type="text" name="review" className="comment-input" onChange={this.onReviewChanged.bind(this)} placeholder="Review" />
            </div>
  
            <small className="danger-error">{reviewErr ? reviewErr : ""}</small>
  
            <button type="button" className="comment-btn" onClick={this.submitComment.bind(this)} >Comment</button>
  
          </div>
  
        </div>
      );
    }
  
  }

  export default CommentBox;