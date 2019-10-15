import React from 'react';
import '../../static/App.css';



class Card extends React.Component {

    constructor(props) {
        super(props);
        this.state = { length: 200, isMore: false };
    }

    viewMore(e) {
        e.preventDefault();
        if(!this.state.isMore){
            this.setState({
                length: 2000,
                isMore: !this.state.isMore
            });
        }else if(this.state.isMore){
            this.setState({
                length: 200,
                isMore: !this.state.isMore
            });
        }
    }

   
    render() {

        
        const getStar = () =>{
            const starts = []
            for(let i=0;i<this.props.comment.rating;i+=10){
                starts.push(<span key={i} className="fa fa-star checked"></span>);
            }
            return starts;
        }
       
        return (
            <div>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <strong> ID: {this.props.index + 1}  Date:  {this.props.comment.date} </strong>
                {getStar()}
                <p>{this.props.comment.content.length > this.state.length ? this.props.comment.content.slice(0, this.state.length) + '...' : this.props.comment.content}</p>
                <p className="underline" onClick={this.viewMore.bind(this)}>{this.state.isMore? 'View Less':'View More'}</p>
            </div>
        );
    }
}

export default Card;