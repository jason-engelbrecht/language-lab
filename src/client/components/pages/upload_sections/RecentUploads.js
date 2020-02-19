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
  interval;

  //useful for setting initial state
  constructor() {
    super();
    this.getRecentUploads();
  }

  //use api endpoint to get recent uploads, setting state
  getRecentUploads = () => {
    api.fetchRecentUploads().then(recentUploads => {
      recentUploads.map(function(file) {
        let date = new Date(file.date);
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let year = date.getFullYear();
        file.date = month + "/" + day + "/" + year;
      });
      this.setState({recentUploads});
    });
  };

  componentDidMount() {
    this.interval = setInterval(this.getRecentUploads.bind(this), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

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
                      <td>
                        {recentUpload.date}
                          </td>
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
