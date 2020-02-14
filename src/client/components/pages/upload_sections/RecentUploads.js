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

  //start state as null
  state = null;

  //use api endpoint to get recent uploads, setting state
  getRecentUploads = () => {
    api.fetchRecentUploads().then(recentUploads => {
      this.setState({recentUploads});
      console.log(recentUploads);
    });
  };

  //after mounting get recent uploads
  componentDidMount() {
    this.getRecentUploads();
    //do something w data
  };

  render() {
    return (
      <MDBCard className="flex-fill">
        <MDBCardHeader color="green">
          <h5 className="mb-1 font-weight-normal"><MDBIcon icon="list-ul" className="mr-2"/>Recent Uploads</h5>
        </MDBCardHeader>
        <MDBCardBody>
          <MDBTable hover borderless>
            <MDBTableBody>
              <tr>
                <td><MDBIcon icon="check" className="mr-3 text-success"/>mygoodfile.xlsx</td>
                <td>02/05/2020</td>
              </tr>
              <tr>
                <td><MDBIcon icon="check" className="mr-3 text-success"/>anevenbetterfile.xlsx</td>
                <td>02/05/2020</td>
              </tr>
              <tr>
                <td><MDBIcon icon="check" className="mr-3 text-success"/>missionreport.xlsx</td>
                <td>02/04/2020</td>
              </tr>
              <tr>
                <td><MDBIcon icon="check" className="mr-3 text-success"/>mynewfile.xlsx</td>
                <td>02/04/2020</td>
              </tr>
            </MDBTableBody>
          </MDBTable>
        </MDBCardBody>
      </MDBCard>
    );
  }
}

export default RecentUploads;
