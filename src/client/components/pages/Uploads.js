import React from 'react'
import {
  MDBRow,
  MDBCol,
  MDBView,
  MDBCard,
  MDBCardBody,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer
} from 'mdbreact';
import FileUploadSection from "./sections/FileUploadSection";

const Uploads =  () => {
  return (
      <MDBRow>
        <MDBContainer>
          <h3>Student Class & Proficiency Data</h3>
          <MDBRow>
            <MDBCol size="6"><FileUploadSection /></MDBCol>
            <MDBCol size="4">
              <select className="browser-default custom-select">
                <option>Choose Language</option>
                <option value="1">German</option>
                <option value="2">Japanese</option>
                <option value="3">Spanish</option>
                <option value="3">Chinese</option>
                <option value="3">French</option>
              </select>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <MDBContainer className="mt-4">
          <h3>Student Language Lab Hours</h3>
          <MDBRow>
            <MDBCol size="6"><FileUploadSection /></MDBCol>
            <MDBCol size="4">
              <select className="browser-default custom-select">
                <option>Choose Level of Support</option>
                <option value="1">No Staffing</option>
                <option value="2">Student Staffing</option>
                <option value="3">Teacher Staffing</option>
                <option value="3">Teacher & Student Staffing</option>
              </select>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <MDBCol md="12">
          {/*<h3 className="mt-5">Upload History</h3>*/}

          <MDBCard className="mt-5">
            <MDBView className="gradient-card-header green">
              <h4 className="h4-responsive text-white">Upload History</h4>
            </MDBView>
            <MDBTable striped>
              <MDBTableHead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Data</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                <tr>
                  <td>1</td>
                  <td>1/15/2020</td>
                  <td>Proficiency Data</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>2/22/2020</td>
                  <td>Lab Hours</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>2/23/2020</td>
                  <td>Lab Hours</td>
                </tr>
              </MDBTableBody>
            </MDBTable>
          </MDBCard>
        </MDBCol>

      <MDBCol md="12">
        <MDBCard className="mt-5">
          <MDBView className="gradient-card-header green">
            <h4 className="h4-responsive text-white">Basic tables</h4>
          </MDBView>
          <MDBCardBody>
            <h3 className="mt-5 text-left"><strong>Basic examples</strong></h3>
            <p>Using the most basic table markup, here’s how .table-based tables look in Bootstrap. All table styles are inherited in Bootstrap 4, meaning any nested tables will be styled in the same manner as the parent.</p>
            <MDBTable>
              <MDBTableHead>
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
            <h3 className="mt-5 text-left"><strong>MDBTable head options</strong></h3>
            <p>To change a background-color of thead (or any other element) use our color classes. If you are going to use a dark background you should also consider white text (to provide a proper contrast) by adding .text-white class.</p>
            <MDBTable>
              <MDBTableHead color="primary-color" textWhite>
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
            <MDBTable>
              <MDBTableHead color="pink">
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
            <h3 className="mt-5 text-left"><strong>Striped rows.</strong></h3>
            <p>Use prop striped to add zebra-striping to any table row within the table body</p>
            <MDBTable striped>
              <MDBTableHead>
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
      </MDBCol>
    </MDBRow>
  )
};

export default Uploads;
