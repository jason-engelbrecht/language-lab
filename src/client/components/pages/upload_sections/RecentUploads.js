import React, { Component } from 'react';
import * as api from '../../../api';
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBIcon,
  MDBTable,
  MDBTableBody,
} from 'mdbreact';

class RecentUploads extends Component {
  state = {};

  //useful for setting initial state
  constructor() {
    super();
    this.getRecentUploads();
  }

  //use api endpoint to get recent uploads, setting state
  getRecentUploads = () => {
    api.fetchRecentUploads().then(recentUploads => {
      this.setState({recentUploads});
    });
  };

  render() {
    return (
      <MDBCard className="flex-fill">
        <MDBCardHeader color="green">
          <h5 className="mb-1 font-weight-normal"><MDBIcon icon="list-ul" className="mr-2"/>Recent Uploads</h5>
        </MDBCardHeader>
        <MDBCardBody>
          <MDBTable hover borderless scrollY>
            <MDBTableBody>
              {
                this.state.recentUploads ?
                  this.state.recentUploads.map(recentUpload =>
                    <tr key={recentUpload._id}>
                      <td><MDBIcon icon="check" className="mr-3 text-success"/>{recentUpload.filename}</td>
                      <td>{recentUpload.date.slice(0, 10)}</td>
                    </tr>)
                  : console.log('wait')
              }
            </MDBTableBody>
          </MDBTable>
        </MDBCardBody>
      </MDBCard>
    );
  }
}

export default RecentUploads;
