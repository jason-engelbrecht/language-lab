import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';
import { MDBBtn } from "mdbreact";


export default class App extends Component {
  state = { username: null };

  componentDidMount() {
    /*fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));*/
  }

  render() {

    return (
      <div>
        <img src={ReactImage} alt="react" />
        <MDBBtn color="primary">Primary</MDBBtn>
      </div>
    );
  }

  /*
  const { username } = this.state;
  {username ? <h1>{`Hello ${username}`}</h1> : <h1>Loading.. please wait!</h1>}
  * */
}
