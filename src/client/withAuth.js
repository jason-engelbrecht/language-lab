import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import * as api from './api';

export default function withAuth(ComponentToProtect) {

  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }

    componentDidMount() {
      //check for valid token
      api.checkToken().then(res => {
        if(res.status === 200) this.setState({ loading: false });
        else throw new Error(res.error);
      })
      .catch(err => {
        console.error(err);
        this.setState({ loading: false, redirect: true });
      });
    }

    render() {
      const { loading, redirect } = this.state;

      if(loading) return null;

      //good - redirect
      if(redirect) return <Redirect to="/login" />;

      return <ComponentToProtect {...this.props} />;
    }
  }
}
