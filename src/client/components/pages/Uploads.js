import React, {Fragment} from 'react'
import {
  MDBRow,
  MDBCol,
  MDBView,
  MDBCard,
  MDBCardBody,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer, MDBCardHeader, MDBIcon
} from 'mdbreact';
import FileUploadSection from "./sections/FileUploadSection";

const Uploads =  () => {
  return (
    <Fragment>
      <MDBRow>
        <MDBCol size="7" className="d-flex">
          <MDBCard className="flex-fill">
            <MDBCardHeader color="green">
              <h5 className="mb-1 font-weight-normal"><MDBIcon icon="cloud-upload-alt" className="mr-2" />New Upload</h5>
            </MDBCardHeader>

            <MDBCardBody className="p-4">
              <div className="mb-4">
                <p className="lead mb-2 ml-1">Student Class & Proficiency Data</p>
                <FileUploadSection />
              </div>

              <p className="lead mb-2 ml-1">Student Language Lab Hours</p>
              <MDBRow className="mb-4">
                <MDBCol>
                  <select className="browser-default custom-select">
                    <option>Choose Language</option>
                    <option value="1">German</option>
                    <option value="2">Japanese</option>
                    <option value="3">Spanish</option>
                    <option value="3">Chinese</option>
                    <option value="3">French</option>
                  </select>
                </MDBCol>
                <MDBCol>
                  <select className="browser-default custom-select">
                    <option>Choose Level of Support</option>
                    <option value="1">No Staffing</option>
                    <option value="2">Student Staffing</option>
                    <option value="3">Teacher Staffing</option>
                    <option value="3">Teacher & Student Staffing</option>
                  </select>
                </MDBCol>
              </MDBRow>
              <div className="mb-4">
                <FileUploadSection />
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol size="5" className="d-flex">
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
        </MDBCol>
      </MDBRow>
      <div className="empty"></div>
    </Fragment>
  )
};

export default Uploads;
