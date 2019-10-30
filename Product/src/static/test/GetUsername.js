import React, { Component } from 'react'

class GetUsername extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(this.state.username)
  }
  onChange(e) {
    this.setState({ username: e.target.value })
  }

  render() {
    return (
      <div>
        <div>
          
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              placeholder="Your full name"
              onChange={this.onChange}
            />
            <input type="submit" />
          </form>
        </div>
      </div>
    )
  }
}

export default GetUsername;
