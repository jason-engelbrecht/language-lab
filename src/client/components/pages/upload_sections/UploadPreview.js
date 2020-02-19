import React, { Component } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBTable,
  MDBTableBody,
  MDBTableHead
} from 'mdbreact';
import * as api from '../../../api';

class UploadPreview extends Component {
  state = {};

  constructor() {
    super();
    this.getRecentData();
  }

  getRecentData = () => {
    api.fetchRecentData().then(recentData => {
      this.setState({recentData});
    });
  };

  render() {
    return (
      <MDBCard>
        <MDBCardBody>
          <MDBTable hover>
            <MDBTableHead color="green lighten-1">
                <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Gender</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {
                this.state.recentData ?
                    this.state.recentData.map(info =>
                        <tr key={info._id}>
                          <td>{info.data[0].id}</td>
                          <td>{info.data[0].first_name}</td>
                          <td>{info.data[0].last_name}</td>
                          <td>{info.data[0].email}</td>
                          <td>{info.data[0].gender}</td>
                        </tr>
                    ) : console.log('wait')
              }
            </MDBTableBody>
          </MDBTable>
        </MDBCardBody>
      </MDBCard>

    );
  }
}

export default UploadPreview;
