import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as api from '../../api';
import './Login.css';

class Login extends Component {
  state = {
    redirect: false
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const email = this.refs.email.value;
    const password = this.refs.password.value;

    //check in db for match
    if(email && password) {
      api.findUser(email, password).then(res => {
        //successful response - redirect
        if(res.status === 200) this.setState({ redirect: true });
        else throw new Error(res.error);
      })
      .catch(err => {
        console.error(err);
        alert('Error logging in please try again');
      });
    }
  };

  render() {
    if(this.state.redirect) {
      return ( <Redirect to={{ pathname: "/dashboard" }} /> );
    }
    else {
      return (
        <div className="login-content">
          <div className="container">
            <h2 className="text-center text-white"><i className="fas fa-language"/> The Language Lab</h2>
            <div className="card mx-auto" style={{width: "22rem"}}>
              <form className="p-5" onSubmit={this.handleSubmit} autoComplete="on">

                <h4 className="mb-4 text-center">Sign in</h4>

                <div className="md-form mb-3">
                  <input type="email"
                         id="email"
                         className="form-control"
                         ref="email"
                         autoComplete="email"/>
                  <label htmlFor="email">Email</label>
                </div>

                <div className="md-form">
                  <input type="password"
                         id="password"
                         className="form-control"
                         ref="password"
                         autoComplete="current-password"/>
                  <label htmlFor="password">Password</label>
                </div>

                <button className="btn btn-outline-success btn-block my-5" type="submit">Sign in</button>

                <h6 className="text-center">
                  <Link to={'/register'} className="text-dark"><i className="fas fa-plus fa-sm"/> Register</Link>
                </h6>

              </form>
            </div>
          </div>
        </div>
      );
    }
  };
}

export default Login;
