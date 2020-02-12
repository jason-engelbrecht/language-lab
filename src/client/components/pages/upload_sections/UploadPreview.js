import React, { Component } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBTable,
  MDBTableBody,
  MDBTableHead
} from 'mdbreact';

class UploadPreview extends Component {
  render() {
    return (
      <MDBCard>
        <MDBCardBody>
          <MDBTable hover>
            <MDBTableHead color="blue-grey lighten-4">
              <tr>
                <th>#</th>
                <th>First</th>
                <th>Last</th>
                <th>Handle</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </MDBTableBody>
          </MDBTable>
        </MDBCardBody>
      </MDBCard>
    );
  }
}

export default UploadPreview;
