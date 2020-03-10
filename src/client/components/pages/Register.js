import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../../api';

class Register extends Component {

  handleSubmit = (event) => {
    event.preventDefault();

    const email = this.refs.email.value;
    const password = this.refs.password.value;
    console.log(email + " " + password);

    //send to db
    if(email && password) {
      api.registerUser(email, password);

    }
  };

  render() {
    return (
      <div className="container">
        <h2 className="text-center text-white"><i className="fas fa-language"></i> The Language Lab</h2>
        <div className="card mx-auto" style={{width: "22rem"}}>
          <form className="p-5" onSubmit={this.handleSubmit}>

            <h4 className="mb-4 text-center">Register</h4>

            <div className="md-form mb-3">
              <input type="email"
                     id="email"
                     className="form-control"
                     ref="email"/>
              <label htmlFor="email">Email</label>
            </div>

            <div className="md-form">
              <input type="password"
                     id="password"
                     className="form-control"
                     ref="password"/>
              <label htmlFor="password">Password</label>
              <small id="password-helper" className="form-text text-muted">
                Must be at least 8 characters long
              </small>
            </div>

            <button className="btn btn-outline-success btn-block my-5" type="submit">Submit</button>

            <h6 className="text-center">
              <Link to={'/login'} className="text-dark"><i className="fas fa-arrow-left fa-sm"></i> Login</Link>
            </h6>

          </form>
        </div>
      </div>
    )
  }
}

export default Register;
